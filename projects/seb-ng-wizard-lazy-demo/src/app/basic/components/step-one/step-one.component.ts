import { Component } from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
})
export class StepOneComponent {
  constructor() {}

  // expose template
  template = `<!-- add wizard component and router outlet -->
<wiz-wizard title="SEB ng-wizard: Basic setup">
  <div class="wizard-main">
    <!-- this is where your steps will be rendered -->
    <router-outlet></router-outlet>
  </div>
</wiz-wizard>`;

  // expose route config
  routeConfig = `// setup routes and wizard steps in route module
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardSteps } from '@sebgroup/ng-wizard';
import { BasicComponent } from './basic.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';

const routes: WizardSteps = [
  {
    path: '',
    redirectTo: 'step-one'
  }, {
    path: 'step-one',
    component: StepOneComponent,
    data: {
      heading: 'Step one',
      controls: [{
        name: 'Step two',
        path: 'step-two',
        type: 'next'
      }]
    }
  }, {
    path: 'step-two',
    component: StepTwoComponent,
    data: {
      heading: 'Step two',
      controls: [{
        name: 'Step one',
        path: 'step-one',
        type: 'prev'
      }, {
        class: 'btn-outline-danger',
        name: 'Clear events',
        type: 'cancel'
      }, {
        class: 'btn-primary',
        name: 'Save',
        type: 'save'
      }]
    },
  }, {
    path: '**',
    redirectTo: 'step-one',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicRoutingModule {}`;
}
