import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'wizard',
    loadChildren: () => import('./wizard-tutorial/wizard-tutorial.module').then(m => m.WizardTutorialModule),
  },
  { path: 'basic', loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule) },
  {
    path: 'form-and-route-guard',
    loadChildren: () =>
      import('./form-and-route-guard/form-and-route-guard.module').then(m => m.FormAndRouteGuardModule),
  },
  { path: '', redirectTo: 'wizard', pathMatch: 'full' },
  { path: '**', redirectTo: 'wizard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
