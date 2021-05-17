import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardSteps } from '@sebgroup/ng-wizard';
import { MoreExamplesComponent } from './components/secondary-content/more-examples/more-examples.component';
import { ExamplesWrapperComponent } from './components/steps/examples/examples.component';
import { ExamplesComponent } from './components/steps/examples/sub-steps/examples/examples.component';
import { LanguageComponent } from './components/steps/examples/sub-steps/language/language.component';
import { PreventNavigationComponent } from './components/steps/examples/sub-steps/prevent-navigation/prevent-navigation.component';
import { SecondaryContentComponent } from './components/steps/examples/sub-steps/secondary-content/secondary-content.component';
import { StepStatesComponent } from './components/steps/examples/sub-steps/step-states/step-states.component';
import { SubStepsComponent } from './components/steps/examples/sub-steps/sub-steps/sub-steps.component';
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
          pageHeading: 'Install, setup and use the wizard',
          controls: [
            {
              name: 'Introduction',
              type: 'prev',
            },
            {
              name: 'Options and configuration',
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
          pageHeading: 'Customize the wizard',
          controls: [
            {
              name: 'Get started',
              type: 'prev',
            },
            {
              name: 'Examples',
              type: 'next',
            },
          ],
        },
      },
      {
        path: 'examples',
        component: ExamplesWrapperComponent,
        data: {
          heading: 'Examples',
          pageHeading: 'How to use the wizard',
          controls: [
            {
              name: 'Options and configuration',
              path: 'options-and-configuration',
              type: 'prev',
            },
            {
              name: 'Options and configuration',
              path: 'examples/step-states',
              type: 'next',
            },
          ],
          subSteps: ['step-states', 'secondary-content', 'prevent-navigation', 'language', 'sub-steps'],
          secondaryContent: {
            component: MoreExamplesComponent,
            class: 'col-12 col-lg-auto order-last ml-lg-3 mb-3',
            data: {
              heading: 'Want more examples?',
            },
          },
        },
        children: [
          {
            path: '',
            component: ExamplesComponent,
          },
          {
            path: 'step-states',
            component: StepStatesComponent,
            data: {
              pageHeading: 'Set a state for a step',
              state: 'info',
              heading: 'Step states',
              controls: [
                {
                  path: 'examples',
                  type: 'prev',
                },
                {
                  path: 'examples/secondary-content',
                  type: 'next',
                },
              ],
            },
          },
          {
            path: 'secondary-content',
            component: SecondaryContentComponent,
            data: {
              pageHeading: 'Add additional content',
              heading: 'Secondary content',
              controls: [
                {
                  path: 'examples/step-states',
                  type: 'prev',
                },
                {
                  path: 'examples/prevent-navigation',
                  type: 'next',
                },
              ],
            },
          },
          {
            path: 'prevent-navigation',
            component: PreventNavigationComponent,
            data: {
              heading: 'Prevent navigation',
              pageHeading: 'Use route guards to prevent navigation',
              controls: [
                {
                  path: 'examples/secondary-content',
                  type: 'prev',
                },
                {
                  path: 'examples/language',
                  type: 'next',
                },
              ],
            },
          },
          {
            path: 'language',
            component: LanguageComponent,
            data: {
              heading: 'Language',
              pageHeading: 'Support different languages and translations',
              controls: [
                {
                  path: 'examples/prevent-navigation',
                  type: 'prev',
                },
                {
                  path: 'examples/sub-steps',
                  type: 'next',
                },
              ],
            },
          },
          {
            path: 'sub-steps',
            component: SubStepsComponent,
            data: {
              heading: 'Sub steps',
              pageHeading: 'Use sub steps when you need to drill down',
              controls: [
                {
                  path: 'examples/language',
                  type: 'prev',
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WizardTutorialRoutingModule {}
