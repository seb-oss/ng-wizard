import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { SebNgWizardConfigService, WizardTranslations } from '../../seb-ng-wizard.module';
import { WizardSteps } from '../../services/wizard-steps.service';
import { WizardTranslationsService } from '../../services/wizard-translations.service';

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
  activeStep$ = this.wizardStepService.activeStep$;

  steps$ = this.wizardStepService.steps$.pipe(map(obj => Object.values(obj)));

  get isDesktop(): boolean {
    return this._isDesktop;
  }

  set isDesktop(value: boolean) {
    this._isDesktop = value;
  }

  @Input()
  lang = 'sv';

  public stepDescription$ = combineLatest([this.steps$, this.activeStep$]).pipe(
    map(([steps, activeStep]) => `Step ${Math.floor(activeStep.data.number)} of ${steps.length}`),
  );
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

  constructor(
    @Inject(SebNgWizardConfigService) public config,
    public translations: WizardTranslationsService,
    private router: Router,
    public wizardStepService: WizardSteps,
  ) {}

  toggleStepNavigation() {
    this._toggleNavigationTrigger$.next(!this._showStepNavigation$.getValue());
  }

  ngOnInit(): void {
    this.isDesktop = window.innerWidth >= 768;
  }
}
