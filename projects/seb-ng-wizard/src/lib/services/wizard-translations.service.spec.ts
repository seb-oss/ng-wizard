import { TestBed } from '@angular/core/testing';

import { WizardTranslationsService } from './wizard-translations.service';

describe('WizardTranslationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardTranslationsService = TestBed.get(WizardTranslationsService);
    expect(service).toBeTruthy();
  });
});
