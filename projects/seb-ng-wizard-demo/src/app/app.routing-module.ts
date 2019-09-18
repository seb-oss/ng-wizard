import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';

const routes: Routes = [
  { path: 'first', component: FirstPageComponent },
  { path: 'second', component: SecondPageComponent },
  { path: 'third', component: ThirdPageComponent },
  // { path: '', pathMatch: 'full', redirectTo: '/second' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
