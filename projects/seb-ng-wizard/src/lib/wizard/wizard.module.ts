import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LeftNavigationModule } from '../left-navigation/left-navigation.module';
import { TopBarModule } from '../top-bar/top-bar.module';
import { WizardComponent } from './wizard.component';

@NgModule({
  declarations: [WizardComponent],
  exports: [WizardComponent],
  imports: [CommonModule, BrowserAnimationsModule, RouterModule.forChild([]), TopBarModule, LeftNavigationModule],
})
export class WizardModule {}
