import { CommonModule } from '@angular/common';
import { Injectable, InjectionToken, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons/faArrowRight';
import { faPrint } from '@fortawesome/pro-regular-svg-icons/faPrint';
import { faSave } from '@fortawesome/pro-regular-svg-icons/faSave';
import { Observable, of } from 'rxjs';
import { ControlsComponent } from './components/controls/controls.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { WizSecondaryContentDirective } from './directives/secondary-content.directive';
import { WizardControlService } from './services/wizard-control.service';

export abstract class WizardTranslations {
  abstract translations$: Observable<any>;
}

@Injectable()
export class DefaultWizardTranslations implements WizardTranslations {
  constructor() {}
  translations$: Observable<any> = of({
    next: 'Next',
    prev: 'Back',
    save: 'Save',
    close: 'Close',
  });
}

interface SebNgWizardConfig {
  translations: any;
  markPassedAsSuccess: boolean;
}

const defaultConfig = {
  markPassedAsSuccess: true,
  translations: {
    en: {
      next: 'Next',
      prev: 'Back',
      save: 'Save',
      close: 'Close',
    },
    sv: {
      next: 'Nästa',
      prev: 'Tillbaka',
      save: 'Spara',
      close: 'Stäng',
    },
  },
};

export const SebNgWizardConfigService = new InjectionToken<SebNgWizardConfig>('SebNgWizardConfig');
export const SebNgWizardTranslateService = new InjectionToken<Provider>('AbstractLibTranslations');

@NgModule({
  declarations: [
    WizardComponent,
    ControlsComponent,
    WizSecondaryContentDirective,
    LeftNavigationComponent,
    TopBarComponent,
  ],
  imports: [CommonModule, RouterModule.forChild([]), FontAwesomeModule],
  providers: [WizardControlService],
  exports: [WizardComponent],
})
export class SebNgWizardModule {
  constructor(library: FaIconLibrary) {
    // add icons that should be available in the app/module
    library.addIcons(faArrowRight, faArrowLeft, faSave, faPrint);
  }
  static forRoot(config?: SebNgWizardConfig, translations?: Provider): ModuleWithProviders<SebNgWizardModule> {
    return {
      ngModule: SebNgWizardModule,
      providers: [
        WizardControlService,
        {
          provide: SebNgWizardConfigService,
          useValue: config || defaultConfig,
        },
        translations || { provide: WizardTranslations, useClass: DefaultWizardTranslations },
      ],
    };
  }
}
