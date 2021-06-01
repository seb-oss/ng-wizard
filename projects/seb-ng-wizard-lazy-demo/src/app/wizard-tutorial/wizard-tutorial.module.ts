import { CommonModule } from '@angular/common';
import { ClassProvider, Injectable, NgModule } from '@angular/core';
import { SebNgWizardModule, WizardSteps, WizardTexts, WizardTranslations } from '@sebgroup/ng-wizard';
import { Observable, of } from 'rxjs';
import { SharedModule } from '../shared/shared.module';

import { MoreExamplesComponent } from './components/secondary-content/more-examples/more-examples.component';
import { ExamplesWrapperComponent } from './components/steps/examples/examples.component';
import { ExamplesComponent } from './components/steps/examples/sub-steps/examples/examples.component';
import { LanguageComponent } from './components/steps/examples/sub-steps/language/language.component';
import { PreventNavigationComponent } from './components/steps/examples/sub-steps/prevent-navigation/prevent-navigation.component';
import { AdditionalContentComponent } from './components/steps/examples/sub-steps/secondary-content/additional-content/additional-content.component';
import { SecondaryContentComponent } from './components/steps/examples/sub-steps/secondary-content/secondary-content.component';
import { StepStatesComponent } from './components/steps/examples/sub-steps/step-states/step-states.component';
import { SubStepsComponent } from './components/steps/examples/sub-steps/sub-steps/sub-steps.component';
import { GettingStartedComponent } from './components/steps/getting-started/getting-started.component';
import { AddComponentComponent } from './components/steps/getting-started/sub-steps/add-component/add-component.component';
import { AddStepsComponent } from './components/steps/getting-started/sub-steps/add-steps/add-steps.component';
import { GettingStartedComponent as Index } from './components/steps/getting-started/sub-steps/getting-started/getting-started.component';
import { ImportModuleComponent } from './components/steps/getting-started/sub-steps/import-module/import-module.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { OptionsComponent } from './components/steps/options/options.component';
import { OptionsAndConfigurationComponent } from './components/steps/options/sub-steps/options-and-configuration/options-and-configuration.component';
import { StepConfigurationComponent } from './components/steps/options/sub-steps/step-configuration/step-configuration.component';
import { StepControlsComponent } from './components/steps/options/sub-steps/step-controls/step-controls.component';
import { WizardTutorialRoutingModule } from './wizard-tutorial-routing.module';
import { WizardTutorialComponent } from './wizard-tutorial.component';

// service for custom translations implementing wizard translations
@Injectable()
export class CustomTranslations implements WizardTranslations {
  constructor() {}
  // you need to provide translations$ observable with key value pairs for the keys you use in the wizard
  translations$: Observable<WizardTexts> = of({ wiz_header_title: 'SEB: ng-wizard: Tutorial' });
}

const TRANSLATIONS_PROVIDER: ClassProvider = {
  provide: WizardTranslations,
  useClass: CustomTranslations,
};

@NgModule({
  declarations: [
    WizardTutorialComponent,
    IntroductionComponent,
    GettingStartedComponent,
    Index,
    OptionsComponent,
    ExamplesWrapperComponent,
    ExamplesComponent,
    MoreExamplesComponent,
    LanguageComponent,
    PreventNavigationComponent,
    SubStepsComponent,
    SecondaryContentComponent,
    StepStatesComponent,
    ImportModuleComponent,
    AddComponentComponent,
    AddStepsComponent,
    StepControlsComponent,
    OptionsAndConfigurationComponent,
    StepConfigurationComponent,
    AdditionalContentComponent,
  ],
  imports: [
    CommonModule,
    WizardTutorialRoutingModule,
    SebNgWizardModule.forRoot({ hideClose: true }, TRANSLATIONS_PROVIDER),
    SharedModule,
  ],
  entryComponents: [MoreExamplesComponent, AdditionalContentComponent],
  providers: [WizardSteps],
})
export class WizardTutorialModule {}
