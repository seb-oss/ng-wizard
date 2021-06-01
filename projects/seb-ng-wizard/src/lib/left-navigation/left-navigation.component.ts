import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { WizardStep, WizardSteps } from '../models/wizard-step';

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
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss'],
})
export class LeftNavigationComponent implements OnInit {
  get isDesktop(): boolean {
    return this._isDesktop;
  }

  set isDesktop(value: boolean) {
    this._isDesktop = value;
  }

  @Input()
  steps: WizardSteps;

  @Input()
  activeStep: WizardStep;

  @Input()
  lang = 'sv';

  @Output()
  navigate: EventEmitter<WizardStep> = new EventEmitter();

  private _isDesktop: boolean;
  private _toggleNavigationTrigger$: Subject<boolean> = new Subject();
  private _showStepNavigation$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public showStepNavigation$: Observable<boolean> = merge(
    this.router.events.pipe(
      filter((e: RouterEvent) => e instanceof NavigationEnd),
      map(_ => false),
    ),
    this._toggleNavigationTrigger$,
  ).pipe(
    tap((state: any) => this._showStepNavigation$.next(state)),
    startWith(true),
    switchMap(_ => this._showStepNavigation$),
    shareReplay(1),
  );

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
  constructor(private router: Router) {}

  isPreviousStep(stepNumber: number) {
    return stepNumber < this.activeStepNumber;
  }

  toggleStepNavigation() {
    this._toggleNavigationTrigger$.next(!this._showStepNavigation$.getValue());
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
