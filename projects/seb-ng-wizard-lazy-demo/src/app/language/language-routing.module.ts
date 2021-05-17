import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeLanguageComponent } from './components/steps/change-language/change-language.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';

import { LanguageComponent } from './language.component';

const routes: Routes = [
  {
    path: '',
    component: LanguageComponent,
    children: [
      {
        path: '',
        redirectTo: 'introduction',
      },
      {
        path: 'introduction',
        component: IntroductionComponent,
        data: {
          heading: 'introduction_heading',
          controls: [
            {
              name: 'Get started',
              type: 'next',
            },
          ],
        },
      },
      {
        path: 'change-language',
        component: ChangeLanguageComponent,
        data: {
          heading: 'changeLanguage_heading',
          controls: [
            {
              name: 'Get started',
              type: 'prev',
            },
          ],
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
