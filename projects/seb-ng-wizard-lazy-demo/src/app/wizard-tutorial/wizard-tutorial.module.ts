import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SebNgWizardModule, WizardSteps } from '@sebgroup/ng-wizard';
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
  imports: [CommonModule, WizardTutorialRoutingModule, SebNgWizardModule.forRoot({ hideClose: true }), SharedModule],
  entryComponents: [MoreExamplesComponent],
  providers: [WizardSteps],
})
export class WizardTutorialModule {}
