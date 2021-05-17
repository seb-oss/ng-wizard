import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SebNgWizardModule, WizardStepsService } from '@sebgroup/ng-wizard';
import { SharedModule } from '../shared/shared.module';

import { MoreExamplesComponent } from './components/secondary-content/more-examples/more-examples.component';
import { ExamplesWrapperComponent } from './components/steps/examples/examples.component';
import { ExamplesComponent } from './components/steps/examples/sub-steps/examples/examples.component';
import { LanguageComponent } from './components/steps/examples/sub-steps/language/language.component';
import { PreventNavigationComponent } from './components/steps/examples/sub-steps/prevent-navigation/prevent-navigation.component';
import { SecondaryContentComponent } from './components/steps/examples/sub-steps/secondary-content/secondary-content.component';
import { StepStatesComponent } from './components/steps/examples/sub-steps/step-states/step-states.component';
import { SubStepsComponent } from './components/steps/examples/sub-steps/sub-steps/sub-steps.component';
import { GettingStartedComponent } from './components/steps/getting-started/getting-started.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { OptionsComponent } from './components/steps/options/options.component';
import { WizardTutorialRoutingModule } from './wizard-tutorial-routing.module';
import { WizardTutorialComponent } from './wizard-tutorial.component';

@NgModule({
  declarations: [
    WizardTutorialComponent,
    IntroductionComponent,
    GettingStartedComponent,
    OptionsComponent,
    ExamplesWrapperComponent,
    ExamplesComponent,
    MoreExamplesComponent,
    LanguageComponent,
    PreventNavigationComponent,
    SubStepsComponent,
    SecondaryContentComponent,
    StepStatesComponent,
  ],
  imports: [CommonModule, WizardTutorialRoutingModule, SebNgWizardModule.forRoot(), SharedModule],
  entryComponents: [MoreExamplesComponent],
  providers: [WizardStepsService],
})
export class WizardTutorialModule {}
