import { Component, OnInit } from '@angular/core';
import { WizardStepsService } from '@sebgroup/ng-wizard';

@Component({
  selector: 'app-step-states',
  templateUrl: './step-states.component.html',
})
export class StepStatesComponent implements OnInit {
  constructor(private wizardStepService: WizardStepsService) {}

  states = ['info', 'success', 'warning', 'danger', null];
  setState(state: string) {
    this.wizardStepService.setState(state);
  }

  setIntroState(state: string) {
    this.wizardStepService.setState(state, '/wizard/introduction');
  }

  ngOnInit() {}
}
