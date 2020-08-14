import { Component } from '@angular/core';
import { WizardControlService } from '../../../../seb-ng-wizard/src/lib/controls/wizard-control.service';

@Component({
  selector: 'app-form-and-route-guard',
  templateUrl: './form-and-route-guard.component.html',
})
export class FormAndRouteGuardComponent {
  constructor(private controls: WizardControlService) {}

  /**
   * Global close function - function is available on all steps
   */
  onClose(event?: MouseEvent) {
    console.log('Close function called');
  }

  /**
   * Global save function - function is available on all steps
   */
  save($event: MouseEvent) {
    console.log('Save function called');

    // optionally the wizard control service can be used to emit an control event
    this.controls.click($event, { type: 'save', name: 'Save' });
  }
}
