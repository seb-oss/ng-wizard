import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardStep } from '@sebgroup/ng-wizard';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { IndexComponent as SecondIndexComponent } from './components/steps/second-step/index/index.component';
import { SecondStepComponent } from './components/steps/second-step/second-step.component';
import { BarComponent } from './components/steps/second-step/sub-steps/bar/bar.component';
import { FooComponent } from './components/steps/second-step/sub-steps/foo/foo.component';
import { IndexComponent as ThirdIndexComponent } from './components/steps/third-step/index/index.component';
import { IpsumComponent } from './components/steps/third-step/sub-steps/ipsum/ipsum.component';
import { LoremComponent } from './components/steps/third-step/sub-steps/lorem/lorem.component';
import { ThirdStepComponent } from './components/steps/third-step/third-step.component';
import { SubStepsComponent } from './sub-steps.component';

const routes: WizardStep[] = [
  {
    path: '',
    component: SubStepsComponent,
    children: [
      { path: '', redirectTo: 'introduction', pathMatch: 'full' },
      {
        path: 'introduction',
        component: IntroductionComponent,
        data: {
          heading: 'Introduction',
          pageHeading: 'Wizard with optional sub-steps',
        },
      },
      {
        path: 'step-2',
        component: SecondStepComponent,
        data: {
          heading: 'Second step',
          subSteps: ['foo', 'bar'],
        },
        children: [
          {
            path: '',
            component: SecondIndexComponent,
          },
          {
            path: 'foo',
            data: {
              heading: 'Foo step',
            },
            component: FooComponent,
          },
          {
            path: 'bar',
            data: {
              heading: 'Bar step',
            },
            component: BarComponent,
          },
        ],
      },
      {
        path: 'step-3',
        component: ThirdStepComponent,
        children: [
          {
            path: '',
            component: ThirdIndexComponent,
          },
          {
            path: 'lorem',
            data: {
              heading: 'Lorem step',
            },
            component: LoremComponent,
          },
          {
            path: 'ipsum',
            data: {
              heading: 'Ipsum step',
            },
            component: IpsumComponent,
          },
        ],
        data: {
          heading: 'Third step',
          subSteps: [],
        },
      },
      { path: '**', pathMatch: 'full', redirectTo: 'introduction' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubStepsRoutingModule {}
