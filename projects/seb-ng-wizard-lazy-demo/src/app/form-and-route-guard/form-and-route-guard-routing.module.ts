// setup routes and wizard steps in route module
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardSteps } from '../../../../seb-ng-wizard/src/lib/models/wizard-step';
import { ProtectedStepInfoComponent } from './components/secondary-content/protected-step-info/protected-step-info.component';
import { ProtectedStepComponent } from './components/steps/protected-step/protected-step.component';
import { ReactiveFormComponent } from './components/steps/reactive-form/reactive-form.component';
import { FormAndRouteGuardComponent } from './form-and-route-guard.component';
import { StepGuard } from './guards/step.guard';

const routes: WizardSteps = [
  {
    path: '',
    component: FormAndRouteGuardComponent,
    children: [
      { path: '', redirectTo: 'form-step' },
      {
        path: 'form-step',
        component: ReactiveFormComponent,
        data: {
          heading: 'Protecting steps',
          controls: [
            {
              name: 'Save form',
              type: 'save',
            },
            {
              name: 'Reset form',
              class: 'btn-outline-danger',
              type: 'cancel',
            },
            {
              name: 'Next',
              path: 'protected-step',
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
        path: 'protected-step',
        component: ProtectedStepComponent,
        data: {
          heading: 'Protected step',
          controls: [
            {
              name: 'Go back',
              path: 'form-step',
              type: 'prev',
            },
          ],
        },
        canActivate: [StepGuard],
      },
      { path: '**', redirectTo: 'form-step', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAndRouteGuardRoutingModule {}
