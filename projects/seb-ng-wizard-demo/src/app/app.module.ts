import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { WizardModule } from '../../../seb-ng-wizard/src/lib/wizard/wizard.module';
import { AppRoutingModule } from './app.routing-module';
import { MainContentExampleComponent } from './components/main-content-example/main-content-example.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    MainContentExampleComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, WizardModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
