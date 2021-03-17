import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { WizSecondaryContentDirective } from '../../directives/secondary-content.directive';
import { WizardStep, WizardStepData, WizardSteps } from '../../models/wizard-step';

@Component({
  selector: 'wiz-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
  private _activeStep$: Observable<WizardStep>;
  private _progress$: Observable<string>;

  public get progress$(): Observable<string> {
    return this._progress$;
  }
  public get activeStep$(): Observable<WizardStep> {
    return this._activeStep$;
  }

  @ViewChild(WizSecondaryContentDirective, { static: false }) wizSecondaryContentHost: WizSecondaryContentDirective;
  @Input()
  title: string;

  steps: WizardSteps = [];

  @Input()
  hideCloseButton = false;

  @Input()
  lang: 'sv' | 'en' = 'en';

  @Input()
  routerOutletName: string;

  @Output()
  navigate: EventEmitter<WizardStepData> = new EventEmitter(true);

  @Output()
  close: EventEmitter<MouseEvent> = new EventEmitter(true);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    // check if route has config, if not use root config
    const routeConfig = this.route.routeConfig ? this.route.routeConfig.children : this.router.config;
    this.steps = <WizardSteps>routeConfig.filter(childRoute => childRoute.path !== '' && childRoute.data);
  }
  public ngOnInit(): void {
    const navigationEnd = this.router.events.pipe(filter((e: RouterEvent) => e instanceof NavigationEnd));
    this._activeStep$ = merge(
      navigationEnd.pipe(
        map((e: NavigationEnd) => {
          const url = typeof e.urlAfterRedirects === 'string' ? e.urlAfterRedirects : e.url;
          return this.steps.find(step => this.matchesRoute(step, url));
        }),
      ),
      this.currentRoute(),
    ).pipe(
      tap(activeStep => {
        if (activeStep && activeStep.data.secondaryContent) {
          this.loadComponent(activeStep.data.secondaryContent);
        }
      }),
      shareReplay(1),
    );

    this._progress$ = navigationEnd.pipe(
      map((e: NavigationEnd) => {
        const stepIdx = this.steps.findIndex(step => step.path === e.url);
        return stepIdx < 0 ? '0%' : `${(((stepIdx / this.steps.length) * 100) / 10) * 10}%`;
      }),
    );
  }

  private currentRoute(): Observable<WizardStep> {
    return of(this.steps.find(step => this.matchesRoute(step, this.router.routerState.snapshot.url)));
  }

  private matchesRoute(step: WizardStep, url: string): boolean {
    const parentRoute = this.route.parent ? this.route.parent.routeConfig.path + '/' : '';
    const pathCheck = `${parentRoute}${step.path}`;

    if (this.routerOutletName) {
      return url.includes(`(${this.routerOutletName}:${pathCheck})`);
    }

    return url.includes(pathCheck);
  }

  loadComponent(secondaryContent: any) {
    setTimeout(() => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(secondaryContent.component);

      const viewContainerRef = this.wizSecondaryContentHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<any>(componentFactory);
      componentRef.instance.data = secondaryContent.data;
    }, 0);
  }
}
