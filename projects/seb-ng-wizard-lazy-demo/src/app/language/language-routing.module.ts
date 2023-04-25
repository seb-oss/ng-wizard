import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardStep } from '@sebgroup/ng-wizard';
import { ChangeLanguageComponent } from './components/steps/change-language/change-language.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { LanguageInHeaderComponent } from './components/steps/language-in-header/language-in-header.component';

import { LanguageComponent } from './language.component';

const routes: WizardStep[] = [
  {
    path: '',
    component: LanguageComponent,
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
      {
        path: 'introduction',
        component: IntroductionComponent,
        data: {
          heading: 'introduction_heading',
        },
      },
      {
        path: 'add-to-header',
        component: LanguageInHeaderComponent,
        data: {
          heading: 'addToHeader_heading',
        },
      },
      {
        path: 'change-language-in-step',
        component: ChangeLanguageComponent,
        data: {
          heading: 'changeLanguageInStep_heading',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguageRoutingModule {}
