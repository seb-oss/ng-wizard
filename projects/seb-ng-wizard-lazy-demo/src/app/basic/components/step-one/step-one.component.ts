import { Component } from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
})
export class StepOneComponent {
  constructor() {}

  module = `import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SebNgWizardModule, WizardSteps } from '@sebgroup/ng-wizard';
import { SharedModule } from '../shared/shared.module';
import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';
import { StepFinalComponent } from './components/step-final/step-final.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';

@NgModule({
  declarations: [StepOneComponent, StepTwoComponent, BasicComponent, StepFinalComponent],
  imports: [CommonModule, SharedModule, SebNgWizardModule.forRoot(), BasicRoutingModule],
  providers: [WizardSteps]
})
export class BasicModule {}`;

  // expose template
  template = `<!-- add wizard component and router outlet -->
<wiz-wizard>
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
      heading: 'Step one'
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
