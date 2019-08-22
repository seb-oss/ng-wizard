import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
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
          <h1 [innerText]="(activeStep$ | async)?.text"></h1>
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
export class WizardComponent {
  readonly activeStep$: Observable<WizardStep>;
  readonly progress$: Observable<string>;

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

  @Output()
  navigate: EventEmitter<WizardStep> = new EventEmitter(true);

  @Output()
  close: EventEmitter<void> = new EventEmitter(true);
  constructor(private router: Router) {
    const navigationEnd = router.events.pipe(filter((e: RouterEvent) => e instanceof NavigationEnd));
    this.activeStep$ = navigationEnd.pipe(
      map((e: NavigationEnd) => {
        const url = typeof e.urlAfterRedirects === 'string' ? e.urlAfterRedirects : e.url;
        return this.steps.find(step => step.path === url) || this.steps[0];
      }),
    );
    this.progress$ = navigationEnd.pipe(
      map((e: NavigationEnd) => {
        const stepIdx = this.steps.findIndex(step => step.path === e.url);
        return stepIdx < 0 ? '0%' : `${(((stepIdx / this.steps.length) * 100) / 10) * 10}%`;
      }),
    );
  }
}
