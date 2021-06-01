// setup routes and wizard steps in route module
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardStep } from '@sebgroup/ng-wizard';
import { BasicComponent } from './basic.component';
import { StepFinalComponent } from './components/step-final/step-final.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';

const routes: WizardStep[] = [
  {
    path: '',
    component: BasicComponent,
    children: [
      { path: '', redirectTo: 'step-one' },
      {
        path: 'step-one',
        component: StepOneComponent,
        data: {
          heading: 'Step one',
        },
      },
      {
        path: 'step-two',
        component: StepTwoComponent,
        data: {
          heading: 'Step two',
          controls: [
            {
              type: 'prev',
            },
            {
              class: 'btn-outline-danger',
              text: 'Clear events',
              type: 'cancel',
            },
            {
              class: 'btn-primary',
              text: 'Save',
              type: 'save',
            },
            {
              class: 'btn-primary',
              type: 'next',
            },
          ],
        },
      },
      {
        path: 'step-final',
        component: StepFinalComponent,
        data: {
          heading: 'Final step',
          hideNavigation: true,
          controls: [
            {
              path: 'step-two',
              type: 'prev',
            },
            {
              class: 'btn-primary',
              type: 'close',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicRoutingModule {}
