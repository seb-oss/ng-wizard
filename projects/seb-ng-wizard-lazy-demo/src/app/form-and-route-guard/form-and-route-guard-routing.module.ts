// setup routes and wizard steps in route module
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardStep } from '@sebgroup/ng-wizard';
import { AccountDetailsIndexComponent } from './components/steps/account-details/account-details-index/account-details-index.component';
import { AccountDetailsComponent } from './components/steps/account-details/account-details.component';
import { KycComponent } from './components/steps/account-details/kyc/kyc.component';
import { ConfirmationComponent } from './components/steps/confirmation/confirmation.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { PersonalDetailsComponent } from './components/steps/personal-details/personal-details.component';
import { FormAndRouteGuardComponent } from './form-and-route-guard.component';
import { StepGuard } from './guards/step.guard';

const routes: WizardStep[] = [
  {
    path: '',
    component: FormAndRouteGuardComponent,
    children: [
      { path: '', redirectTo: 'introduction', pathMatch: 'full' },
      {
        path: 'introduction',
        component: IntroductionComponent,
        data: {
          heading: 'Introduction',
          pageHeading: 'Wizard with protected steps',
        },
      },
      {
        path: 'personal-details',
        component: PersonalDetailsComponent,
        data: {
          heading: 'Personal details',
          pageHeading: 'Tell us a bit about yourself',
          controls: [
            {
              type: 'prev',
            },
            {
              text: 'Clear form',
              class: 'btn-outline-danger',
              type: 'cancel',
            },
            {
              type: 'next',
            },
          ],
        },
        canActivate: [StepGuard],
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent,
        data: {
          heading: 'Account details',
          pageHeading: 'Just a few more details',
        },
        canActivate: [StepGuard],
        children: [
          {
            path: '',
            component: AccountDetailsIndexComponent,
          },
          {
            path: 'kyc',
            component: KycComponent,
            data: {
              heading: 'KYC',
              pageHeading: 'Trade experience',
              state: 'info',
            },
          },
        ],
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        data: {
          heading: 'Confirmation',
        },
        canActivate: [StepGuard],
      },
      { path: '**', pathMatch: 'full', redirectTo: 'introduction' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAndRouteGuardRoutingModule {}
