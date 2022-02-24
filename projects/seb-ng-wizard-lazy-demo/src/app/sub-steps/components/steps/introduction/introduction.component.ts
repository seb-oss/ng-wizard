import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WizardSteps } from '@sebgroup/ng-wizard';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
})
export class IntroductionComponent {
  constructor(private wizardSteps: WizardSteps, private route: ActivatedRoute, private _fb: FormBuilder) {}

  routeConfiguration = `// sub-steps-routing.module.ts
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
          subSteps: ['foo', 'bar']
        },
        children: [{
          path: '',
          component: SecondIndexComponent
        },
          {
            path: 'foo',
            data: {
              heading: 'Foo step',
            },
            component: FooComponent
          },
          {
            path: 'bar',
            data: {
              heading: 'Bar step',
            },
            component: BarComponent
          }]
      },
      {
        path: 'step-3',
        component: ThirdStepComponent,
        children: [{
          path: '',
          component: ThirdIndexComponent
        },
          {
            path: 'lorem',
            data: {
              heading: 'Lorem step',
            },
            component: LoremComponent
          },
          {
            path: 'ipsum',
            data: {
              heading: 'Ipsum step',
            },
            component: IpsumComponent
          }],
        data: {
          heading: 'Third step',
          subSteps: [],
        },
      },
      { path: '**', pathMatch: 'full', redirectTo: 'introduction' },
    ],
  },
];`;
  updateSubSteps = `// active sub-step with route path 'foo' for step with path '/sub-steps/step-2'
this.wizardSteps.updateSubSteps(['foo'], '/sub-steps/step-2');`;

  // generate forms for updating active sub steps
  steps = Object.values(this.route.parent.routeConfig.children)
    .filter(route => route.children)
    .map(step => ({
      form: this._fb.group(
        step.children
          .filter(subStep => subStep.path.length > 0)
          .reduce(
            (initial, subStep) => ({
              ...initial,
              [subStep.path]: [step.data.subSteps.indexOf(subStep.path) !== -1],
            }),
            {},
          ),
      ),
      subSteps: step.children.filter(subStep => subStep.path.length > 0),
      path: step.path,
      heading: step.data.heading,
    }));

  toggleSubSteps(subSteps: { [key: string]: boolean }, step: string) {
    const activeSubSteps = Object.keys(subSteps).filter(subStep => subSteps[subStep]);

    // call function for updating sub-steps
    this.wizardSteps.updateSubSteps(activeSubSteps, step);
  }
}
