import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';

import { TakeOverComponent } from './take-over.component';

const routes: Routes = [
  {
    path: '',
    component: TakeOverComponent,
    children: [
      { path: '', redirectTo: 'first' },
      { path: 'first', component: FirstPageComponent },
      { path: 'second', component: SecondPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeOverRoutingModule {}
