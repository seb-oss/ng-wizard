import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeftNavigationComponent } from './left-navigation.component';

@NgModule({
  declarations: [LeftNavigationComponent],
  exports: [LeftNavigationComponent],
  imports: [CommonModule, RouterModule.forChild([])],
})
export class LeftNavigationModule {}
