import { Component, Inject } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WizardControl } from '../../models/wizard-step';
import { SebNgWizardConfigService } from '../../seb-ng-wizard.module';
import { WizardControlService } from '../../services/wizard-control.service';
import { WizardSteps } from '../../services/wizard-steps.service';
import { WizardTranslationsService } from '../../services/wizard-translations.service';

@Component({
  selector: 'wiz-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  controls$ = this.wizardStepService.activeStep$.pipe(
    map(step =>
      step.data.controls.map(control => {
        let path = control.path;
        if (!control.path) {
          if (control.type === 'next') {
            path = this.wizardStepService.getStepByNumber(number + 1).path;
          } else if (control.type === 'prev') {
            path = this.wizardStepService.getStepByNumber(number - 1).path;
          }
        }
        return {
          ...control,
          path: isObservable(path) ? path : of(path),
          text: control.text || `wiz_${control.type}_action`,
        };
      }),
    ),
  );

  constructor(
    @Inject(SebNgWizardConfigService) private config,
    public translations: WizardTranslationsService,
    private wizardControl: WizardControlService,
    public wizardStepService: WizardSteps,
  ) {}

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
