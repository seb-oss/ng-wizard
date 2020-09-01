import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WizardControl } from '../../models/wizard-step';
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
  lang: 'sv' | 'en';

  @Output()
  close: EventEmitter<MouseEvent> = new EventEmitter();
  constructor(private wizardControl: WizardControlService) {}

  closeControl: WizardControl = {
    name: 'Close',
    type: 'close',
  };

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
