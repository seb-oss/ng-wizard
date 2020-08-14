import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WizardModule } from '../../../../seb-ng-wizard/src/lib/wizard/wizard.module';
import { SharedModule } from '../shared/shared.module';
import { ProtectedStepInfoComponent } from './components/secondary-content/protected-step-info/protected-step-info.component';
import { ProtectedStepComponent } from './components/steps/protected-step/protected-step.component';
import { ReactiveFormComponent } from './components/steps/reactive-form/reactive-form.component';
import { FormAndRouteGuardRoutingModule } from './form-and-route-guard-routing.module';
import { FormAndRouteGuardComponent } from './form-and-route-guard.component';

@NgModule({
  declarations: [FormAndRouteGuardComponent, ReactiveFormComponent, ProtectedStepComponent, ProtectedStepInfoComponent],
  imports: [CommonModule, SharedModule, WizardModule, FormAndRouteGuardRoutingModule],
})
export class FormAndRouteGuardModule {}
