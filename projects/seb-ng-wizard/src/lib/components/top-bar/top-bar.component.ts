import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { WizardControl } from '../../models/wizard-step';
import { SebNgWizardConfigService } from '../../seb-ng-wizard.module';
import { WizardControlService } from '../../services/wizard-control.service';

@Component({
  selector: 'wiz-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input()
  title: string;

  @Input()
  progress: string;

  @Input()
  hideClose = false;

  @Input()
  lang: 'sv' | 'en' = 'en';

  @Output()
  close: EventEmitter<MouseEvent> = new EventEmitter();

  texts: any = {};
  constructor(@Inject(SebNgWizardConfigService) private config, private wizardControl: WizardControlService) {
    this.texts = this.config.translations[this.lang];
  }

  closeControl: WizardControl = {
    name: this.texts.next,
    type: 'close',
  };

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
