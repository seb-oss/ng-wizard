import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SebNgWizardModule, WizardStepsService } from '@sebgroup/ng-wizard';
import { SharedModule } from '../shared/shared.module';
import { ProtectedStepInfoComponent } from './components/secondary-content/protected-step-info/protected-step-info.component';
import { AccountDetailsComponent } from './components/steps/account-details/account-details.component';
import { KycComponent } from './components/steps/account-details/kyc/kyc.component';
import { ConfirmationComponent } from './components/steps/confirmation/confirmation.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { PersonalDetailsComponent } from './components/steps/personal-details/personal-details.component';
import { ProtectedStepComponent } from './components/steps/protected-step/protected-step.component';
import { ReactiveFormComponent } from './components/steps/reactive-form/reactive-form.component';
import { FormAndRouteGuardRoutingModule } from './form-and-route-guard-routing.module';
import { FormAndRouteGuardComponent } from './form-and-route-guard.component';
import { StepGuard } from './guards/step.guard';
import { StepService } from './services/step.service';

@NgModule({
  declarations: [
    FormAndRouteGuardComponent,
    AccountDetailsComponent,
    ProtectedStepComponent,
    ProtectedStepInfoComponent,
    PersonalDetailsComponent,
    ConfirmationComponent,
    IntroductionComponent,
    KycComponent,
    ReactiveFormComponent,
  ],
  imports: [CommonModule, SharedModule, SebNgWizardModule.forRoot(), FormAndRouteGuardRoutingModule],
  entryComponents: [ProtectedStepInfoComponent],
  providers: [WizardStepsService, StepService, StepGuard],
})
export class FormAndRouteGuardModule {}
