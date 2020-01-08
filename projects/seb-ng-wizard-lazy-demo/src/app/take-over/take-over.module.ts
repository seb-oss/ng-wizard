import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WizardModule } from '../../../../seb-ng-wizard/src/lib/wizard/wizard.module';
import { SharedModule } from '../shared/shared.module';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';

import { TakeOverRoutingModule } from './take-over-routing.module';
import { TakeOverComponent } from './take-over.component';

@NgModule({
  declarations: [TakeOverComponent, FirstPageComponent, SecondPageComponent],
  imports: [CommonModule, TakeOverRoutingModule, WizardModule, SharedModule],
})
export class TakeOverModule {}
