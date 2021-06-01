import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { WizardControlService } from '@sebgroup/ng-wizard';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { StepService } from '../../../services/step.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
})
export class IntroductionComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  constructor(public controls: WizardControlService, public stepService: StepService, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((e: RouterEvent) => e instanceof NavigationStart),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(_ => this.stepService.saveState('success'));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
