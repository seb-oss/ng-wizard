import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SebNgWizardModule, WizardSteps } from '@sebgroup/ng-wizard';
import { SharedModule } from '../shared/shared.module';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { StepService } from './services/step.service';

import { IndexComponent } from './components/steps/second-step/index/index.component';
import { SecondStepComponent } from './components/steps/second-step/second-step.component';
import { BarComponent } from './components/steps/second-step/sub-steps/bar/bar.component';
import { FooComponent } from './components/steps/second-step/sub-steps/foo/foo.component';
import { IpsumComponent } from './components/steps/third-step/sub-steps/ipsum/ipsum.component';
import { LoremComponent } from './components/steps/third-step/sub-steps/lorem/lorem.component';
import { ThirdStepComponent } from './components/steps/third-step/third-step.component';
import { SubStepsRoutingModule } from './sub-steps-routing.module';
import { SubStepsComponent } from './sub-steps.component';

@NgModule({
  declarations: [
    SubStepsComponent,
    IntroductionComponent,
    SecondStepComponent,
    ThirdStepComponent,
    FooComponent,
    BarComponent,
    IndexComponent,
    LoremComponent,
    IpsumComponent,
  ],
  imports: [CommonModule, SubStepsRoutingModule, ReactiveFormsModule, SebNgWizardModule.forRoot(), SharedModule],
  providers: [WizardSteps, StepService],
})
export class SubStepsModule {}
