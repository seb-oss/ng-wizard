import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SebNgWizardModule, WizardSteps } from '@sebgroup/ng-wizard';
import { SharedModule } from '../shared/shared.module';
import { AccountDetailsIndexComponent } from './components/steps/account-details/account-details-index/account-details-index.component';
import { AccountDetailsComponent } from './components/steps/account-details/account-details.component';
import { KycComponent } from './components/steps/account-details/kyc/kyc.component';
import { ConfirmationComponent } from './components/steps/confirmation/confirmation.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { PersonalDetailsComponent } from './components/steps/personal-details/personal-details.component';
import { FormAndRouteGuardRoutingModule } from './form-and-route-guard-routing.module';
import { FormAndRouteGuardComponent } from './form-and-route-guard.component';
import { StepGuard } from './guards/step.guard';
import { StepService } from './services/step.service';

@NgModule({
  declarations: [
    FormAndRouteGuardComponent,
    AccountDetailsComponent,
    PersonalDetailsComponent,
    ConfirmationComponent,
    IntroductionComponent,
    KycComponent,
    AccountDetailsIndexComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SebNgWizardModule.forRoot({ markPassedAsSuccess: false }),
    FormAndRouteGuardRoutingModule,
  ],
  providers: [WizardSteps, StepService, StepGuard],
})
export class FormAndRouteGuardModule {}
