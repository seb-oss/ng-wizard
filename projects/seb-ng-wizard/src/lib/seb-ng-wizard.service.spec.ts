import { TestBed } from '@angular/core/testing';

import { SebNgWizardService } from './seb-ng-wizard.service';

describe('SebNgWizardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SebNgWizardService = TestBed.get(SebNgWizardService);
    expect(service).toBeTruthy();
  });
});
