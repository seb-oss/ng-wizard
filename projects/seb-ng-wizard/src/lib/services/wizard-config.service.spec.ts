import { TestBed } from '@angular/core/testing';

import { WizardConfigService } from './wizard-config.service';

describe('WizardConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardConfigService = TestBed.get(WizardConfigService);
    expect(service).toBeTruthy();
  });
});
