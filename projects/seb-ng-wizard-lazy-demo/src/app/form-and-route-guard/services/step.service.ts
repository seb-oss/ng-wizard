import { Injectable } from '@angular/core';
import { WizardStepsService } from '@sebgroup/ng-wizard';
// import { WizardStepsService } from "@sebgroup/ng-wizard";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StepService {
  private _steps: StepStates;
  $steps: BehaviorSubject<StepStates> = new BehaviorSubject<any>({});
  // $state: Observable<Array<WizardStepData>> = this.$steps.pipe(map(d => d ));
  constructor(private tem: WizardStepsService) {}

  saveState(step: string, state: any, data: any) {
    /*console.log(this.tem.currentStepConfig);
    // this.tem.updateProp(step, 'heading', 'New heading');
    console.log(step, state, data);
    this._steps = { ...this._steps, [btoa(step)]: { state: state, data } };
    this.$steps.next(this._steps);
    this.tem.updateProp(step, 'state', state);
    if (data && data.accountType === 'Investeringssparkkonto (ISK)') {
      this.tem.updateProp(step, 'subSteps', ['kyc']);
      this.tem.updateProp(step, 'controls', [
        {
          name: 'Back',
          path: 'personal-details',
          type: 'prev',
        }, {
          name: 'Save form',
          type: 'save',
        }, {
          name: 'Next',
          path: 'kyc',
          type: 'next',
        },
      ]);
    } else {
      this.tem.updateProp(step, 'subSteps', []);
      this.tem.updateProp(step, 'controls', [
        {
          name: 'Back',
          path: 'personal-details',
          type: 'prev',
        }, {
          name: 'Save form',
          type: 'save',
        }, {
          name: 'Next',
          path: 'confirmation',
          type: 'next',
        },
      ]);
    }*/
  }

  getState(step: string): Observable<any> {
    // console.log(step, this.$steps.getValue(), this.tem.currentStepConfig[btoa(step)]);
    // return of(this.tem.currentStepConfig[btoa(step)].data.state);
    // return this.$steps.asObservable()
    //  .pipe(map(steps => steps[btoa(step)]));
    return of();
  }
}

interface StepStates {
  [key: string]: StepState;
}

export interface StepState {
  state: any;
  data: any;
  // wizardStep: WizardStepData;
}
