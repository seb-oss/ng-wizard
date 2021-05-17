import { Component, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { WizardControl } from '../../models/wizard-step';
import { SebNgWizardConfigService, WizardTranslations } from '../../seb-ng-wizard.module';
import { WizardControlService } from '../../services/wizard-control.service';
import { WizardStepsService } from '../../services/wizard-steps.service';

@Component({
  selector: 'wiz-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  controls$ = this.wizardStepService.activeStep$.pipe(
    map(step => [step.data.number, step.data.controls]),
    map(([number, controls]: [number, Array<WizardControl>]) =>
      controls.map(control => {
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
          textKey: control.textKey || control.type,
          path,
          name: this.config.translations['en'][control.type] || control.name,
        };
      }),
    ),
  );

  constructor(
    @Inject(SebNgWizardConfigService) private config,
    public translations: WizardTranslations,
    private wizardControl: WizardControlService,
    public wizardStepService: WizardStepsService,
  ) {}

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
