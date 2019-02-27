import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { WizardModule } from '../../../seb-ng-wizard/src/lib/wizard/wizard.module';
import { AppRoutingModule } from './app.routing-module';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';

@NgModule({
  declarations: [AppComponent, FirstPageComponent, SecondPageComponent, ThirdPageComponent],
  imports: [BrowserModule, WizardModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
