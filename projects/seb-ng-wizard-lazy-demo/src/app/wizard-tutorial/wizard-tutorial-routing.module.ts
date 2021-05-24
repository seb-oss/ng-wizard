import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardStep } from '@sebgroup/ng-wizard';
import { MoreExamplesComponent } from './components/secondary-content/more-examples/more-examples.component';
import { ExamplesWrapperComponent } from './components/steps/examples/examples.component';
import { ExamplesComponent } from './components/steps/examples/sub-steps/examples/examples.component';
import { LanguageComponent } from './components/steps/examples/sub-steps/language/language.component';
import { PreventNavigationComponent } from './components/steps/examples/sub-steps/prevent-navigation/prevent-navigation.component';
import { AdditionalContentComponent } from './components/steps/examples/sub-steps/secondary-content/additional-content/additional-content.component';
import { SecondaryContentComponent } from './components/steps/examples/sub-steps/secondary-content/secondary-content.component';
import { StepStatesComponent } from './components/steps/examples/sub-steps/step-states/step-states.component';
import { SubStepsComponent } from './components/steps/examples/sub-steps/sub-steps/sub-steps.component';
import { GettingStartedComponent } from './components/steps/getting-started/getting-started.component';
import { AddComponentComponent } from './components/steps/getting-started/sub-steps/add-component/add-component.component';
import { AddStepsComponent } from './components/steps/getting-started/sub-steps/add-steps/add-steps.component';
import { GettingStartedComponent as Index } from './components/steps/getting-started/sub-steps/getting-started/getting-started.component';
import { ImportModuleComponent } from './components/steps/getting-started/sub-steps/import-module/import-module.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { OptionsComponent } from './components/steps/options/options.component';
import { OptionsAndConfigurationComponent } from './components/steps/options/sub-steps/options-and-configuration/options-and-configuration.component';
import { StepConfigurationComponent } from './components/steps/options/sub-steps/step-configuration/step-configuration.component';
import { StepControlsComponent } from './components/steps/options/sub-steps/step-controls/step-controls.component';

import { WizardTutorialComponent } from './wizard-tutorial.component';

const routes: WizardStep[] = [
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
        },
      },
      {
        path: 'getting-started',
        component: GettingStartedComponent,
        data: {
          heading: 'Get started',
          pageHeading: 'Install, setup and use the wizard',
          subSteps: ['import-module', 'add-component', 'add-steps'],
        },
        children: [
          {
            path: '',
            component: Index,
            data: {
              heading: 'Import module',
              pageHeading: 'Import and configure wizard module',
            },
          },
          {
            path: 'import-module',
            component: ImportModuleComponent,
            data: {
              heading: 'Import module',
              pageHeading: 'Import and configure wizard module',
            },
          },
          {
            path: 'add-component',
            component: AddComponentComponent,
            data: {
              heading: 'Add component',
              pageHeading: 'Add and configure wizard component',
            },
          },
          {
            path: 'add-steps',
            component: AddStepsComponent,
            data: {
              heading: 'Add steps',
              pageHeading: 'Add and configure wizard steps',
            },
          },
        ],
      },
      {
        path: 'options-and-configuration',
        component: OptionsComponent,
        data: {
          heading: 'Options and configuration',
          pageHeading: 'Customize the wizard',
          subSteps: ['step-configuration', 'step-controls'],
        },
        children: [
          {
            path: '',
            component: OptionsAndConfigurationComponent,
            data: {
              heading: 'Options and configuration',
              pageHeading: 'Customize and configure the wizard',
            },
          },
          {
            path: 'step-configuration',
            component: StepConfigurationComponent,
            data: {
              heading: 'Step configuration',
              pageHeading: 'Setup and configure steps',
            },
          },
          {
            path: 'step-controls',
            component: StepControlsComponent,
            data: {
              heading: 'Step controls',
              pageHeading: 'Customize step controls in footer',
            },
          },
        ],
      },
      {
        path: 'examples',
        component: ExamplesWrapperComponent,
        data: {
          heading: 'Examples',
          pageHeading: 'How to use the wizard',
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
            },
          },
          {
            path: 'secondary-content',
            component: SecondaryContentComponent,
            data: {
              pageHeading: 'Add additional content',
              heading: 'Secondary content',
              secondaryContent: {
                component: AdditionalContentComponent,
                class: 'col-12 col-lg-auto order-last ml-lg-3 mb-3',
                data: {
                  heading: 'Alert box',
                },
              },
            },
          },
          {
            path: 'prevent-navigation',
            component: PreventNavigationComponent,
            data: {
              heading: 'Prevent navigation',
              pageHeading: 'Use route guards to prevent navigation',
            },
          },
          {
            path: 'language',
            component: LanguageComponent,
            data: {
              heading: 'Language',
              pageHeading: 'Support different languages and translations',
            },
          },
          {
            path: 'sub-steps',
            component: SubStepsComponent,
            data: {
              heading: 'Sub steps',
              pageHeading: 'Use sub steps when you need to drill down',
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
