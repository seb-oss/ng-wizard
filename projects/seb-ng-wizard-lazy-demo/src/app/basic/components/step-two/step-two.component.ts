import { Component } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {
  WizardControlEvent,
  WizardControlService,
} from '../../../../../../seb-ng-wizard/src/lib/controls/wizard-control.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
})
export class StepTwoComponent {
  eventLog: Array<WizardControlEvent>; // array to store events
  controlEvents$ = this.controls.controlEvent$ // observable for events (subscribe with async pipe in template)
    .pipe(
      tap(event => (this.eventLog = [...(this.eventLog || []), event])), // add event to event log
      tap(event => {
        if (event.type === 'cancel') {
          this.eventLog = null;
        }
      }), // clear event log on cancel event
      switchMap(_ => of(this.eventLog)), // return event log as an observable
    );

  // add wizard control service to component
  constructor(public controls: WizardControlService) {}

  // expose component for example
  component = `import { Component } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { WizardControlEvent, WizardControlService } from '@sebgroup/ng-wizard';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent {

  eventLog: Array<WizardControlEvent>; // array to store events
  controlEvents$ = this.controls.controlEvent$ // observable for events (subscribe with async pipe in template)
    .pipe(
      tap(event => this.eventLog = [...this.eventLog || [], event]), // add event to event log
      tap(event => {if (event.type === 'cancel') {this.eventLog = null; }}), // clear event log on cancel event
      switchMap(_ => of(this.eventLog)) // return event log as an observable
    );

  // add wizard control service to component
  constructor(public controls: WizardControlService) { }
}`;
  // expose template
  template = `<h3>Listen to control events</h3>
<ng-container *ngIf="controlEvents$ | async as controlEvents; else noEvents">
  <code class="d-block" *ngFor="let event of controlEvents">{{event | json}}</code>
</ng-container>
<ng-template #noEvents>
  <div class="alert alert-info alert-icon">
    <h5 class="alert-heading">Nothing has been emitted!</h5>
    Click "Save" down in the footer to emit an event.
  </div>
</ng-template>`;
}
