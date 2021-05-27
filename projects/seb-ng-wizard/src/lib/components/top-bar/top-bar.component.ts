import { Component, Inject } from '@angular/core';
import { WizardControl } from '../../models/wizard-step';
import { SebNgWizardConfigService } from '../../seb-ng-wizard.module';
import { WizardControlService } from '../../services/wizard-control.service';
import { WizardTranslationsService } from '../../services/wizard-translations.service';

@Component({
  selector: 'wiz-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  hideClose = this.config.hideClose;
  constructor(
    @Inject(SebNgWizardConfigService) private config,
    public translations: WizardTranslationsService,
    private wizardControl: WizardControlService,
  ) {}

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
