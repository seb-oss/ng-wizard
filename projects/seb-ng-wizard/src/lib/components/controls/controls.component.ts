import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isObservable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WizardControl } from '../../models/wizard-step';
import { WizardControlService } from '../../services/wizard-control.service';
import { WizardSteps } from '../../services/wizard-steps.service';
import { WizardTranslationsService } from '../../services/wizard-translations.service';

@Component({
  selector: 'wiz-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class ControlsComponent {
  controls$ = this.wizardStepService.activeStep$.pipe(
    filter(step => !!step.data),
    map(step =>
      step.data.controls.map(control => {
        let path = control.path;
        if (!control.path) {
          if (control.type === 'next') {
            path = this.wizardStepService.getPathTo('next');
          } else if (control.type === 'prev') {
            path = this.wizardStepService.getPathTo('prev');
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
    public translations: WizardTranslationsService,
    private wizardControl: WizardControlService,
    public wizardStepService: WizardSteps,
  ) {}

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
