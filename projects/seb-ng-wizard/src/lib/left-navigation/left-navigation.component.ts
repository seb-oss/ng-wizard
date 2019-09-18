import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WizardStep } from '../wizard/wizard-step';

@Component({
  selector: 'wiz-left-navigation',
  template: `
    <nav>
      <h3>
        <input (change)="(toggleMenu)" #toggleMenu id="toggleMenu" type="checkbox" />
        <label class="toggle-menu custom-control-label" for="toggleMenu">
          <span class="step-title" [innerText]="activeStep?.text"></span><br />
          <span *ngIf="lang == 'sv'" class="step-counter">Steg {{ activeStepNumber }} av {{ steps.length }}</span>
          <span *ngIf="lang == 'en'" class="step-counter">Step {{ activeStepNumber }} of {{ steps.length }}</span>
        </label>
      </h3>
      <ol class="left-navigation-list" [class.hidden]="!toggleMenu.checked">
        <li *ngFor="let step of steps; index as i" [class.active]="isActiveStep(step)">
          <a [routerLink]="step.path"></a>
          <a (click)="handleClick(step); toggleMenu.checked = false" [href]="step.path" [innerText]="step.text"></a>
        </li>
      </ol>
    </nav>
  `,
  styleUrls: ['./left-navigation.component.scss'],
})
export class LeftNavigationComponent {
  @Input()
  steps: WizardStep[];

  @Input()
  activeStep: WizardStep;

  @Input()
  lang = 'sv';

  @Output()
  navigate: EventEmitter<WizardStep> = new EventEmitter();

  get activeStepNumber(): number {
    try {
      return 1 + this.steps.findIndex(step => step.path === this.activeStep.path);
    } catch (e) {
      return 0;
    }
  }
  constructor() {}

  handleClick(step: WizardStep) {
    this.navigate.next(step);
    return false;
  }

  isActiveStep(step: WizardStep) {
    if (!step || !this.activeStep) {
      return false;
    }
    return step.path === this.activeStep.path;
  }
}
