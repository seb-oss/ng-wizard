import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { StepState, WizardControls, WizardStepConfig, WizardStepConfigs } from '../models/wizard-step';
/** Wizard Steps
 * Multiton service (one instance per wizard component) to keep track of step state and do runtime updates do step configuration
 * */
@Injectable()
export class WizardSteps {
  /** get current configuration for wizard
   * return steps as observable
   */
  get steps$(): Observable<WizardStepConfigs> {
    return this._steps$.asObservable();
  }
  /** get current configuration for wizard
   * return steps
   */
  get steps(): WizardStepConfigs {
    return this._steps$.getValue();
  }

  constructor(private router: Router) {
    // get current route from snapshot
    let initialStepPath = this.router.routerState.snapshot.url.split('?')[0];
    const routeTree: Array<string> = initialStepPath.split('/').slice(1, 3); // default level

    // re-declare current route based on default level
    initialStepPath = '/' + routeTree.join('/');

    // get config for wizard by looking at passed data object to route configuration for active route
    let config = routeTree.reduce(
      routeConfig => routeConfig.children[0], // return first child of each route
      this.router.routerState.snapshot['_root'],
    ).value.routeConfig; // set root config of active route as initial value

    config = (config.children || config._loadedConfig.routes) // return route config for children
      .filter(childRoute => childRoute.path !== '' && childRoute.data); // make sure route contains config (data)

    // emit step config for wizard instance
    this._steps$.next(
      config.reduce((previousValue, currentValue, index) => {
        // create config object for route children
        const routeChildren = currentValue.children
          ? currentValue.children.reduce((previousRouteConfig, currentRouteConfig, i) => {
              let childData = { ...currentRouteConfig.data };
              // add default controls for prev and next if no controls are defined
              if (!childData.controls) {
                const controls: WizardControls = [{ type: 'prev' }, { type: 'next' }];
                childData = { ...childData, controls };
              }
              return {
                ...previousRouteConfig,
                [currentRouteConfig.path]: {
                  data: { ...childData, number: index + 1 + i / 10 },
                  path: currentRouteConfig.path,
                  fullPath: `${currentValue.path}/${currentRouteConfig.path}`,
                },
              };
            }, {})
          : false;

        // create unique id for config based on route path, ie. id will be the same unless route path changes
        const id = this._stepGuid(
          initialStepPath.substring(0, initialStepPath.lastIndexOf('/') + 1) + currentValue.path,
        );

        // create step config
        let step: WizardStepConfig = {
          data: {
            ...currentValue.data,
            number: index + 1,
          },
          path: currentValue.path,
        };

        // add default controls for prev and next if no controls are defined
        if (!step.data.controls) {
          const controls: WizardControls = [{ type: 'prev' }, { type: 'next' }];
          step = {
            ...step,
            data: {
              ...step.data,
              controls,
            },
          };
        }
        // if step contains children (sub steps)...
        if (routeChildren) {
          // ...add them
          step = {
            ...step,
            children: routeChildren,
          };
        }

        return { ...previousValue, [id]: step };
      }, {}),
    );
  }
  private _steps$: BehaviorSubject<WizardStepConfigs | {}> = new BehaviorSubject({});

  activeStep$: Observable<WizardStepConfig> = merge(
    this.router.events.pipe(
      filter((e: RouterEvent) => e instanceof NavigationEnd),
      map((e: NavigationEnd) =>
        this.getStepByUrl(typeof e.urlAfterRedirects === 'string' ? e.urlAfterRedirects : e.url),
      ),
    ),
    this.steps$.pipe(map(_ => this.getStepByUrl(this.router.routerState.snapshot.url))),
  ).pipe(shareReplay(1));

  private _stepsInOrder$ = this.steps$.pipe(
    map(configs =>
      Object.values(configs)
        .reduce((previousValue, currentValue) => {
          let order = [
            {
              order: currentValue.data.number,
              path: currentValue.path,
            },
          ];
          if (currentValue.children) {
            order = [
              ...order,
              ...Object.values(currentValue.children)
                .filter(child => child.path !== '')
                .reduce((p, c) => [...p, { order: c.data.number, path: `${currentValue.path}/${c.path}` }], []),
            ];
          }
          return [...previousValue, ...order];
        }, [])
        .sort((a, b) => a.order - b.order),
    ),
    shareReplay(1),
  );

  getStepByUrl(url: string): WizardStepConfig {
    const p = this._getStepReferenceByUrl(url);
    const stepId = p.stepPath.id;
    const subStepId = p.subPath.path;
    if (subStepId) {
      return this.steps[stepId].children[subStepId];
    } else {
      return this.steps[stepId];
    }
  }

  getPathTo(direction: 'next' | 'prev'): Observable<string> {
    return this._stepsInOrder$.pipe(
      withLatestFrom(this.activeStep$),
      map(
        ([res, active]) =>
          res[res.findIndex(step => step.path === (active.fullPath || active.path)) + (direction === 'next' ? 1 : -1)],
      ),
      map(step => (step ? step.path : null)),
    );
  }

  setState(value: StepState, path?: string) {
    this._updateStep(value, path);
  }

  private _updateStep(value: any, path?: string, prop: string = 'state') {
    const p = this._getStepReferenceByUrl(path);
    const stepId = p.stepPath.id;
    const subStepId = p.subPath.path;
    let updatedStep;

    if (subStepId) {
      // clone sub steps
      const subSteps = { ...this.steps[stepId].children };
      // update step with new children
      updatedStep = {
        ...this.steps[stepId],
        children:
          // create new reference for step children by re-assigning sub steps
          {
            ...subSteps,
            [subStepId]: { ...subSteps[subStepId], data: { ...subSteps[subStepId].data, [prop]: value } },
          },
      };
    } else {
      updatedStep = { ...this.steps[stepId], data: { ...this.steps[stepId].data, [prop]: value } };
    }
    this._steps$.next({
      ...this.steps,
      [stepId]: updatedStep,
    });
  }

  private _getStepReferenceByUrl(url: string = this.router.routerState.snapshot.url) {
    // create url tree based on url without query parameters
    const urlTree = url.split('?')[0].split('/');
    // get path of step
    const stepPath = '/' + urlTree.slice(1, 3).join('/');
    // get path of sub step
    const subPath = urlTree.slice(3, 4).join('/');
    return {
      stepPath: {
        path: stepPath,
        id: this._stepGuid(stepPath),
      },
      subPath: {
        path: subPath || null,
        id: subPath ? this._stepGuid(subPath) : null,
      },
    };
  }

  private _stepGuid(path: string): string {
    return btoa(path);
  }
}
