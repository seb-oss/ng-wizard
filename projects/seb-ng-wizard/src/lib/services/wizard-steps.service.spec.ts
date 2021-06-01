import { TestBed } from '@angular/core/testing';

import { WizardSteps } from './wizard-steps.service';

describe('WizardStepsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardSteps = TestBed.get(WizardSteps);
    expect(service).toBeTruthy();
  });
});
