import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WizardControl } from '../models/wizard-step';

@Injectable({
  providedIn: 'root',
})
export class WizardControlService {
  protected _controlEvent$: Subject<WizardControlEvent> = new Subject();
  controlEvent$: Observable<WizardControlEvent>;
  constructor() {
    this.controlEvent$ = this._controlEvent$.asObservable();
  }

  click($event: MouseEvent, control: WizardControl) {
    this._controlEvent$.next({ ...control, $event });
  }
}

export interface WizardControlEvent extends WizardControl {
  $event: MouseEvent;
}
