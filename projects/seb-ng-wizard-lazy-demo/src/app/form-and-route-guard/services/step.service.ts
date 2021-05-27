import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { StepState, WizardSteps } from '@sebgroup/ng-wizard';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, switchMapTo } from 'rxjs/operators';

@Injectable()
export class StepService {
  steps$: BehaviorSubject<{ [id: string]: { state: StepState; data: any; id: string } }> = new BehaviorSubject<any>({});
  constructor(private wizardSteps: WizardSteps, private router: Router) {}

  saveState(state: StepState, data?: any) {
    this.steps$.next({
      ...this.steps$.getValue(),
      [this.wizardSteps.activeStep.id]: { data, state, id: this.wizardSteps.activeStep.id },
    });
    this.wizardSteps.setState(state);
  }

  getRoute(step: string, next: string): Observable<boolean | UrlTree> {
    return this.wizardSteps.steps$.pipe(
      filter(wizardSteps => Object.values(wizardSteps).length > 0),
      switchMap(
        steps => <Observable<boolean | UrlTree>>this.wizardSteps.getPreviousStep(next).pipe(
            map(
              res =>
                res.data.state === 'success' ||
                res.data.state === 'info' ||
                this.router.parseUrl(
                  `/form-and-route-guard/${
                    Object.values(steps).reduce(
                      (prev, current) =>
                        current.data.state && current.data.number > prev.data.number ? current : prev,
                      Object.values(steps).find(s => s.data.number === 1),
                    ).path
                  }`,
                ),
            ),
          ),
      ),
    );
  }

  getState(): Observable<{ data; state }> {
    return this.wizardSteps.steps$.pipe(
      filter(wizardSteps => Object.values(wizardSteps).length > 0),
      switchMapTo(of(this.steps$.getValue()[this.wizardSteps.activeStep.id])),
    );
  }
}
