import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, take, withLatestFrom } from 'rxjs/operators';
import { StepState, WizardControls, WizardStepConfig, WizardStepConfigs } from '../models/wizard-step';
/** Wizard Steps
 * Multiton service (one instance per wizard component) to keep track of step state and do runtime updates do step configuration
 * */
@Injectable()
export class WizardSteps {
  private _config;
  /** get current configuration for wizard
   * return steps as observable
   */
  get steps$(): Observable<WizardStepConfigs> {
    return this._steps$.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
  }
  /** get current configuration for wizard
   * return steps
   */
  get steps(): WizardStepConfigs {
    return this._steps$.getValue();
  }

  constructor(private router: Router, private _location: Location) {
    // get current route from snapshot
    let initialStepPath = this._location.path().split('?')[0]; // this.router.routerState.snapshot.url.split('?')[0];
    const routeTree: Array<string> = initialStepPath.split('/').slice(1, 3); // default level

    // re-declare current route based on default level
    initialStepPath = '/' + routeTree.join('/');

    let config;
    this._config =
      this.router.config.filter(route => route.data && route.data.heading).length > 0
        ? { level: 0, config: this.router.config }
        : { level: 1, config: this.router.config.find(route => route.path === routeTree[0]) };

    try {
      config = (this._config.level === 0
        ? this._config.config
        : this._config.config.children || this._config.config['_loadedConfig'].routes[0].children
      ) // return route config for children
        .filter(route => route.path !== '' && route.data); // make sure route contains config (data)
    } catch (e) {
      console.warn(`No valid route config found for current route: "${this.router.routerState.snapshot.url}".
      Make sure route guards provide a fallback if a access to a step is restricted
      and that inactive sub steps are handled too, using a wildcard route.`);
      return;
    }
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
          this._config.level === 0
            ? '/' + currentValue.path
            : initialStepPath.substring(0, initialStepPath.lastIndexOf('/') + 1) + currentValue.path,
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
          let controls: WizardControls = index > 0 ? [{ type: 'prev' }] : [];
          controls =
            index < config.length - 1 || currentValue.children ? [...controls, { type: 'next' }] : [...controls];
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
  ).pipe(distinctUntilChanged(), shareReplay(1));

  get activeStep(): WizardStepConfig {
    return this.getStepByUrl(this.router.routerState.snapshot.url);
  }

  private _stepsInOrder$: Observable<
    Array<{ order: number; path: string; index: number; fullPath: string }>
  > = this.steps$.pipe(
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
                .filter(
                  child =>
                    child.path !== '' &&
                    currentValue.data.subSteps &&
                    currentValue.data.subSteps.indexOf(child.path) !== -1,
                )
                .reduce((p, c) => [...p, { order: c.data.number, path: `${currentValue.path}/${c.path}` }], []),
            ];
          }
          return [...previousValue, ...order];
        }, [])
        .sort((a, b) => a.order - b.order)
        .map((res, index) => ({
          ...res,
          index,
          fullPath:
            this._config.level === 0
              ? '/' + res.path
              : `/${this._location
                  .path()
                  .split('?')[0]
                  .split('/')
                  .slice(1, 2)
                  .join('/')}/${res.path}`,
        })),
    ),
    distinctUntilChanged(),
    shareReplay(1),
  );

  getStepByUrl(url: string): WizardStepConfig {
    const p = this._getStepReferenceByUrl(url);
    const stepId = p.stepPath.id;
    const subStepId = p.subPath.path;
    if (subStepId) {
      return { ...this.steps[stepId].children[subStepId], id: subStepId };
    } else {
      return { ...this.steps[stepId], id: stepId };
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

  getPreviousStep(path: string): Observable<WizardStepConfig> {
    return this._stepsInOrder$.pipe(
      take(1),
      map(res => {
        const index = res.find(step => step.fullPath === path).index;
        return this.getStepByUrl(res[index > 0 ? index - 1 : 0].fullPath);
      }),
    );
  }

  setState(state: StepState, path?: string) {
    this._updateStep({ state }, path);
  }

  updateSubSteps(activeSubSteps: Array<string>, path?: string) {
    this._updateStep({ subSteps: activeSubSteps }, path);
  }

  private _updateStep(object: any, path?: string) {
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
            [subStepId]: { ...subSteps[subStepId], data: { ...subSteps[subStepId].data, ...object } },
          },
      };
    } else {
      updatedStep = { ...this.steps[stepId], data: { ...this.steps[stepId].data, ...object } };
    }
    this._steps$.next({
      ...this.steps,
      [stepId]: updatedStep,
    });
  }

  private _getStepReferenceByUrl(url: string = this.router.routerState.snapshot.url) {
    // create url tree based on url without query parameters
    const urlTree = url.split('?')[0].split('/');
    const sliceDelta = this._config.level + 2;
    // get path of step
    const stepPath = '/' + urlTree.slice(1, sliceDelta).join('/');
    // get path of sub step
    const subPath = urlTree.slice(sliceDelta, sliceDelta + 1).join('/');
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
