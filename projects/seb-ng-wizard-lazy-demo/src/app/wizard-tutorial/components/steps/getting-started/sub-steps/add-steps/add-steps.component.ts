import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-steps',
  templateUrl: './add-steps.component.html',
  styles: [],
})
export class AddStepsComponent implements OnInit {
  constructor() {}
  addRoutes = `// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardStep } from '@sebgroup/ng-wizard';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';

const routes: WizardStep[] = [
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
      heading: 'Step two'
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
export class AppRoutingModule {}
`;
  ngOnInit() {}
}
