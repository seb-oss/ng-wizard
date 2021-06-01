import { Inject, Injectable } from '@angular/core';
import { SebNgWizardConfig } from '../models/wizard-config';
import { WIZARD_CONFIG } from '../seb-ng-wizard.module';

@Injectable()
export class WizardConfigService {
  defaultConfig: SebNgWizardConfig = {
    markPassedAsSuccess: true,
  };

  loadConfig(): SebNgWizardConfig {
    return { ...this.defaultConfig, ...this.config };
  }
  constructor(@Inject(WIZARD_CONFIG) private config) {}
}
