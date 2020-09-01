import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SebNgWizardModule } from '@sebgroup/ng-wizard';
import { SharedModule } from '../shared/shared.module';
import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';

const wizardConfig: any = {
  translations: {
    en: {
      next: 'Next',
      prev: 'Back',
      save: 'Save',
      close: 'Close',
    },
    sv: {
      next: 'Nästa',
      prev: 'Tillbaka',
      save: 'Spara',
      close: 'Stäng',
    },
  },
};

@NgModule({
  declarations: [StepOneComponent, StepTwoComponent, BasicComponent],
  imports: [CommonModule, SharedModule, SebNgWizardModule.forRoot(), BasicRoutingModule],
})
export class BasicModule {}
