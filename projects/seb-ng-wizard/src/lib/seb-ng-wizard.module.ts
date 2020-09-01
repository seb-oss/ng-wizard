import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons/faArrowRight';
import { faPrint } from '@fortawesome/pro-regular-svg-icons/faPrint';
import { faSave } from '@fortawesome/pro-regular-svg-icons/faSave';
import { ControlsComponent } from './components/controls/controls.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { WizardComponent, WizSecondaryContentDirective } from './components/wizard/wizard.component';
import { WizardControlService } from './services/wizard-control.service';

interface SebNgWizardConfig {
  translations: any;
}

const defaultConfig = {
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
  static forRoot(config?: SebNgWizardConfig): ModuleWithProviders<SebNgWizardModule> {
    return {
      ngModule: SebNgWizardModule,
      providers: [
        WizardControlService,
        {
          provide: SebNgWizardConfigService,
          useValue: config || defaultConfig,
        },
      ],
    };
  }
}
