import { Component, OnDestroy, OnInit } from '@angular/core';
import { WizardControlService } from '@sebgroup/ng-wizard';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepService } from '../../../services/step.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
})
export class IntroductionComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  constructor(public controls: WizardControlService, public stepService: StepService) {}

  ngOnInit() {
    // subscribe to control events
    this.controls.controlEvent$.pipe(takeUntil(this.unsubscribe$)).subscribe(control => {
      switch (control.type) {
        case 'next':
          this.stepService.saveState('/form-and-route-guard/introduction', 'success', null);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
