import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardSteps } from '@sebgroup/ng-wizard';
import { MoreExamplesComponent } from './components/secondary-content/more-examples/more-examples.component';
import { ExamplesComponent } from './components/steps/examples/examples.component';
import { GettingStartedComponent } from './components/steps/getting-started/getting-started.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { OptionsComponent } from './components/steps/options/options.component';

import { WizardTutorialComponent } from './wizard-tutorial.component';

const routes: WizardSteps = [
  {
    path: '',
    component: WizardTutorialComponent,
    children: [
      { path: '', redirectTo: 'introduction' },
      {
        path: 'introduction',
        component: IntroductionComponent,
        data: {
          heading: 'Introduction',
          controls: [
            {
              name: 'Get started',
              path: 'getting-started',
              type: 'next',
            },
          ],
        },
      },
      {
        path: 'getting-started',
        component: GettingStartedComponent,
        data: {
          heading: 'Get started',
          controls: [
            {
              name: 'Introduction',
              path: 'introduction',
              type: 'prev',
            },
            {
              name: 'Options and configuration',
              path: 'options-and-configuration',
              type: 'next',
            },
          ],
        },
      },
      {
        path: 'options-and-configuration',
        component: OptionsComponent,
        data: {
          heading: 'Options and configuration',
          controls: [
            {
              name: 'Get started',
              path: 'getting-started',
              type: 'prev',
            },
            {
              name: 'Examples',
              path: 'examples',
              type: 'next',
            },
          ],
        },
      },
      {
        path: 'examples',
        component: ExamplesComponent,
        data: {
          heading: 'Examples',
          controls: [
            {
              name: 'Options and configuration',
              path: 'options-and-configuration',
              type: 'prev',
            },
          ],
          secondaryContent: {
            component: MoreExamplesComponent,
            class: 'col-12 col-lg-auto order-last ml-lg-3 mb-3',
            data: {
              heading: 'Want more examples?',
            },
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WizardTutorialRoutingModule {}
