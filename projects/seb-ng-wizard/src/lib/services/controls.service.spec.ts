import { TestBed } from '@angular/core/testing';

import { WizardControlService } from './wizard-control.service';

describe('ControlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardControlService = TestBed.get(WizardControlService);
    expect(service).toBeTruthy();
  });
});
