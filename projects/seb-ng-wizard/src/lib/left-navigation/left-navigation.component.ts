import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { WizardStep } from '../wizard/wizard-step';

@Component({
  selector: 'wiz-left-navigation',
  animations: [
    trigger('expand', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('400ms ease-in-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [animate('400ms ease-in-out', style({ height: 0, opacity: 0 }))]),
    ]),
  ],
  template: `
    <nav class="bg-light border-right py-3 pl-3">
      <div
        class="d-md-none toggle-step d-flex align-items-center"
        [class.active]="showStepNavigation"
        (click)="toggleStepNavigation()"
      >
        <div class="toggle-content">
          <h2 class="mb-1" [innerText]="activeStep?.text"></h2>
          <span class="small">{{ getStepInfo() }}</span>
        </div>
      </div>
      <div class="step-wrapper" @expand *ngIf="showStepNavigation || isDesktop">
        <ol class="list-group list-group-ordered mt-3">
          <li
            class="list-group-item-action"
            *ngFor="let step of steps; index as i"
            [class.list-group-item-success]="isPreviousStep(i)"
            [class.active]="isActiveStep(step)"
          >
            <a [routerLink]="step.path"></a>
            <a (click)="goTo(step)" [href]="step.path" [innerText]="step.text || ''"></a>
          </li>
        </ol>
      </div>
    </nav>
  `,
  styleUrls: ['./left-navigation.component.scss'],
})
export class LeftNavigationComponent implements OnInit {
  get isDesktop(): boolean {
    return this._isDesktop;
  }

  set isDesktop(value: boolean) {
    this._isDesktop = value;
  }
  get showStepNavigation(): boolean {
    return this._showStepNavigation;
  }

  set showStepNavigation(value: boolean) {
    this._showStepNavigation = value;
  }
  @Input()
  steps: WizardStep[];

  @Input()
  activeStep: WizardStep;

  @Input()
  lang = 'sv';

  @Output()
  navigate: EventEmitter<WizardStep> = new EventEmitter();

  private _showStepNavigation = true;
  private _isDesktop: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._isDesktop = event.target.innerWidth >= 768;
  }

  get activeStepNumber(): number {
    try {
      return 1 + this.steps.findIndex(step => step.path === this.activeStep.path);
    } catch (e) {
      return 0;
    }
  }
  constructor() {}

  goTo(step: WizardStep) {
    this.navigate.next(step);
    this.showStepNavigation = false;
    return false;
  }

  isPreviousStep(stepNumber: number) {
    return stepNumber < this.activeStepNumber;
  }

  isActiveStep(step: WizardStep) {
    if (!step || !this.activeStep) {
      return false;
    }
    return step.path === this.activeStep.path;
  }

  toggleStepNavigation() {
    this.showStepNavigation = !this.showStepNavigation;
  }

  getStepInfo() {
    return `${this.lang === 'sv' ? 'Steg' : 'Step'} ${this.activeStepNumber} ${this.lang === 'sv' ? 'av' : 'of'} ${
      this.steps.length
    }`;
  }

  ngOnInit(): void {
    this.isDesktop = window.innerWidth >= 768;
  }
}
