// setup routes and wizard steps in route module
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardSteps } from '@sebgroup/ng-wizard';
import { ProtectedStepInfoComponent } from './components/secondary-content/protected-step-info/protected-step-info.component';
import { AccountDetailsComponent } from './components/steps/account-details/account-details.component';
import { KycComponent } from './components/steps/account-details/kyc/kyc.component';
import { ConfirmationComponent } from './components/steps/confirmation/confirmation.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { PersonalDetailsComponent } from './components/steps/personal-details/personal-details.component';
import { FormAndRouteGuardComponent } from './form-and-route-guard.component';
import { StepGuard } from './guards/step.guard';

const routes: WizardSteps = [
  {
    path: '',
    component: FormAndRouteGuardComponent,
    children: [
      { path: '', redirectTo: 'introduction' },
      {
        path: 'introduction',
        component: IntroductionComponent,
        data: {
          heading: 'Introduction',
          pageHeading: 'Wizard with protected steps',
          controls: [
            {
              name: 'Next',
              path: 'personal-details',
              type: 'next',
            },
          ],
          secondaryContent: {
            component: IntroductionComponent,
            class: 'col-12 col-lg-auto order-0 order-md-1 ml-lg-3',
          },
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
              name: 'Back',
              path: 'introduction',
              type: 'prev',
            },
            {
              name: 'Save form',
              type: 'save',
            },
            {
              name: 'Clear form',
              class: 'btn-outline-danger',
              type: 'cancel',
            },
            {
              name: 'Next',
              path: 'account-details',
              type: 'next',
            },
          ],
          secondaryContent: {
            component: ProtectedStepInfoComponent,
            class: 'col-12 col-lg-auto order-0 order-md-1 ml-lg-3',
          },
        },
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent,
        data: {
          heading: 'Account details',
          pageHeading: 'Just a few more details',
          controls: [
            {
              name: 'Back',
              path: 'personal-details',
              type: 'prev',
            },
            {
              name: 'Save form',
              type: 'save',
            },
            {
              name: 'Next',
              path: 'confirmation',
              type: 'next',
            },
          ],
          secondaryContent: {
            component: ProtectedStepInfoComponent,
            class: 'col-12 col-lg-auto order-0 order-md-1 ml-lg-3',
          },
        },
        children: [
          {
            path: 'kyc',
            component: KycComponent,
            data: {
              heading: 'KYC',
              pageHeading: 'Trade experience',
              state: 'info',
              controls: [
                {
                  name: 'Back',
                  path: 'personal-details',
                  type: 'prev',
                },
                {
                  name: 'Save form',
                  type: 'save',
                },
                {
                  name: 'Next',
                  path: 'confirmation',
                  type: 'next',
                },
              ],
            },
          },
        ],
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        data: {
          heading: 'Confirmation',
          pageHeading: 'Confirmation',
          controls: [
            {
              name: 'Go back',
              path: 'account-details',
              type: 'prev',
            },
          ],
        },
        canActivate: [StepGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAndRouteGuardRoutingModule {}
