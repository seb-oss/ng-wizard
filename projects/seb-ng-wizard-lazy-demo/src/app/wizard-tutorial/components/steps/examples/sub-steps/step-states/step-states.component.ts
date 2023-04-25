import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StepState, WizardSteps } from '@sebgroup/ng-wizard';

@Component({
  selector: 'app-step-states',
  templateUrl: './step-states.component.html',
})
export class StepStatesComponent {
  setStateMethod = `import { Component } from '@angular/core';
import { WizardSteps, StepState } from '@sebgroup/ng-wizard';

@Component({
  selector: 'app-step-states',
  templateUrl: './step-states.component.html',
})
export class StepStatesComponent {

  constructor(private wizardSteps: WizardSteps) {}

  setState(state: StepState) {
    this.wizardSteps.setState(state);
  }

  setStateForPath(state: StepState, path: string) {
    this.wizardSteps.setState(state, path);
  }

  clearAllStates() {
    this.wizardSteps.clearState();
  }
}
`;
  constructor(private wizardSteps: WizardSteps, private fb: UntypedFormBuilder) {
    this.stepForm = fb.group({
      stepRoute: fb.control('examples', [Validators.required]),
    });
  }

  stepForm: UntypedFormGroup;

  states: StepState[] = ['info', 'success', 'warning', 'danger', null];
  setState(state: StepState) {
    this.wizardSteps.setState(state);
  }

  setStateForPath(state: StepState) {
    this.wizardSteps.setState(state, '/wizard/' + this.stepForm.value.stepRoute);
  }

  clearAllStates() {
    this.wizardSteps.clearState();
  }
}
