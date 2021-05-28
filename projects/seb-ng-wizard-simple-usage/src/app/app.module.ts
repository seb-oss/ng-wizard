import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SebNgWizardModule, WizardSteps } from '@sebgroup/ng-wizard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { IndexComponent } from './steps/step-two/sub-steps/index/index.component';
import { StepAComponent } from './steps/step-two/sub-steps/step-a/step-a.component';
import { StepBComponent } from './steps/step-two/sub-steps/step-b/step-b.component';

@NgModule({
  declarations: [AppComponent, StepOneComponent, StepTwoComponent, StepAComponent, StepBComponent, IndexComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FontAwesomeModule, SebNgWizardModule.forRoot()],
  providers: [WizardSteps],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // add icons that should be available in the app/module
  }
}
