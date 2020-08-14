import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WizardControlService } from '../controls/wizard-control.service';
import { WizardControl } from '../models/wizard-step';

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
