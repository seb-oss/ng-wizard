import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
})
export class GettingStartedComponent implements OnInit {
  importModule = `// app.module.ts
import { WizardModule } from '@sebgroup/ng-wizard'; // <-- Add this line

@NgModule({
  imports: [
    AppRoutingModule, // holds wizard steps as routes
    WizardModule  // <-- Add this line
  ],
})
export class AppModule {}`;

  addComponent = `<!-- app.component.html -->
<wiz-wizard title="SEB ng-wizard">
  <div class="wizard-main col-12 col-lg">
    <router-outlet></router-outlet>
  </div>
</wiz-wizard>`;

  addRoutes = `// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardSteps } from '@sebgroup/ng-wizard';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';

const routes: WizardSteps = [
  {
    path: '',
    component: StepOneComponent,
    children: [
      { path: '', redirectTo: 'step-one' },
      { path: 'step-one', component: StepOneComponent,
        data: {
          heading: 'Step one',
          controls: [{
            name: 'Step two',
            path: 'step-two',
            type: 'next'
          }]
        }
      },
      { path: 'step-two', component: StepTwoComponent,
        data: {
          heading: 'Step two',
          controls: [{
            name: 'Step one',
            path: 'step-one',
            type: 'prev'
          }, {
            name: 'Save',
            path: 'step-completed',
            type: 'save'
          }]
        }
      }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
`;

  constructor() {}

  ngOnInit() {}
}
