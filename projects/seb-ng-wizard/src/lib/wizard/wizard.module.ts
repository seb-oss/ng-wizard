import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons/faArrowRight';
import { faPrint } from '@fortawesome/pro-regular-svg-icons/faPrint';
import { faSave } from '@fortawesome/pro-regular-svg-icons/faSave';
import { ControlsComponent } from '../controls/controls.component';
import { WizardControlService } from '../controls/wizard-control.service';
import { LeftNavigationModule } from '../left-navigation/left-navigation.module';
import { TopBarModule } from '../top-bar/top-bar.module';
import { WizardComponent, WizSecondaryContentDirective } from './wizard.component';

@NgModule({
  declarations: [WizardComponent, ControlsComponent, WizSecondaryContentDirective],
  exports: [WizardComponent],
  imports: [CommonModule, RouterModule.forChild([]), TopBarModule, LeftNavigationModule, FontAwesomeModule],
})
export class WizardModule {
  constructor(library: FaIconLibrary) {
    // add icons that should be available in the app/module
    library.addIcons(faArrowRight, faArrowLeft, faSave, faPrint);
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WizardModule,
      providers: [WizardControlService],
    };
  }
}
