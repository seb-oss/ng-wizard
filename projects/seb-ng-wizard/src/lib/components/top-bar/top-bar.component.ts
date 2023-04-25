import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WizardControl } from '../../models/wizard-step';
import { WizardConfigService } from '../../services/wizard-config.service';
import { WizardControlService } from '../../services/wizard-control.service';
import { WizardTranslationsService } from '../../services/wizard-translations.service';

@Component({
  selector: 'wiz-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TopBarComponent {
  get config() {
    return this._config.loadConfig();
  }
  constructor(
    private _config: WizardConfigService,
    public translations: WizardTranslationsService,
    private wizardControl: WizardControlService,
  ) {}

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
