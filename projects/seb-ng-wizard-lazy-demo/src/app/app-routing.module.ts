import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'take-over', loadChildren: () => import('./take-over/take-over.module').then(m => m.TakeOverModule) },
  { path: '', redirectTo: 'take-over', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
