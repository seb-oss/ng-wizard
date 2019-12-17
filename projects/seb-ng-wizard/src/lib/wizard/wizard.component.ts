import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WizardStep } from './wizard-step';

@Component({
  selector: 'wiz-wizard',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" *ngIf="useNavbar">
      <span class="navbar-brand mb-0 h1" [innerText]="wizardTitle"></span>
    </nav>
    <wiz-top-bar
      [title]="wizardTitle"
      [class.hide-close]="hideCloseButton"
      [class.hide-navigation]="hideNavigation"
      [class.partial-navigation]="steps.length == 1"
      [progress]="progress$ | async"
      [lang]="lang"
      (close)="close.next()"
    >
    </wiz-top-bar>
    <div class="navigation-wrapper">
      <wiz-left-navigation
        [class.hide-navigation]="hideNavigation"
        [class.partial-navigation]="steps.length == 1"
        [activeStep]="activeStep$ | async"
        [steps]="steps"
        [lang]="lang"
        (navigate)="navigate.next($event)"
      ></wiz-left-navigation>
      <div class="content-wrapper">
        <div class="wizard-heading">
          <h1 [innerText]="(activeStep$ | async)?.text || ''"></h1>
        </div>
        <div class="wizard--main">
          <ng-content select=".wizard-main"></ng-content>
        </div>
        <div class="wizard--right-content">
          <ng-content select=".wizard-right-content"></ng-content>
        </div>
      </div>
    </div>
  `,
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
  @Input()
  wizardTitle: string;

  @Input()
  steps: WizardStep[] = [];

  @HostBinding('class.hide-navigation')
  @Input()
  hideNavigation = false;

  @HostBinding('class.hide-close-button')
  @Input()
  hideCloseButton = false;

  @HostBinding('class.use-navbar')
  @Input()
  useNavbar = false;

  @Input()
  lang: 'sv' | 'en';

  @Input()
  routerOutletName: string;

  @Output()
  navigate: EventEmitter<WizardStep> = new EventEmitter(true);

  @Output()
  close: EventEmitter<void> = new EventEmitter(true);
  constructor(private router: Router) {}
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
      map(routerStep => (routerStep ? routerStep : this.steps.length > 0 ? this.steps[0] : { path: '', text: '' })),
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
    if (this.routerOutletName) {
      return url.includes(`(${this.routerOutletName}:${step.path})`);
    }
    return step.path === url;
  }
}
