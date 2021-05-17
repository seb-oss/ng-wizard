import { TestBed } from '@angular/core/testing';

import { WizardStepsService } from './wizard-steps.service';

describe('WizardStepsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardStepsService = TestBed.get(WizardStepsService);
    expect(service).toBeTruthy();
  });
});
