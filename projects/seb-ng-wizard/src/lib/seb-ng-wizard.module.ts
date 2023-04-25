import { CommonModule } from '@angular/common';
import { Injectable, InjectionToken, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ControlsComponent } from './components/controls/controls.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { WizSecondaryContentDirective } from './directives/secondary-content.directive';
import { SebNgWizardConfig } from './models/wizard-config';
import { WizardTexts } from './models/wizard-texts';
import { WizardConfigService } from './services/wizard-config.service';
import { WizardControlService } from './services/wizard-control.service';
import { WizardTranslationsService } from './services/wizard-translations.service';

export abstract class WizardTranslations {
  abstract translations$: Observable<WizardTexts>;
}

@Injectable()
export class DefaultWizardTranslations implements WizardTranslations {
  constructor() {}
  translations$: Observable<WizardTexts> = of({});
}

const defaultConfig: SebNgWizardConfig = {
  markPassedAsSuccess: true,
};

export const WIZARD_CONFIG = new InjectionToken<SebNgWizardConfig>('WIZARD_CONFIG');
export const SebNgWizardTranslateService = new InjectionToken<Provider>('AbstractLibTranslations');

export const WIZARD_ROUTER_MODULE: ModuleWithProviders<RouterModule> = RouterModule.forChild([]);

@NgModule({
  imports: [WizardComponent, WIZARD_ROUTER_MODULE],
  providers: [WizardControlService],
  exports: [WizardComponent],
})
export class SebNgWizardModule {
  static forRoot(config?: SebNgWizardConfig, translations?: Provider): ModuleWithProviders<SebNgWizardModule> {
    return {
      ngModule: SebNgWizardModule,
      providers: [
        WizardConfigService,
        WizardControlService,
        WizardTranslationsService,
        {
          provide: WIZARD_CONFIG,
          useValue: config,
        },
        translations || { provide: WizardTranslations, useClass: DefaultWizardTranslations },
      ],
    };
  }
}
