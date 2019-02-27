import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  template: `
    <wiz-wizard [wizardTitle]="title" [steps]="steps" lang="en" (navigate)="nav($event)">
      <div class="wizard-main">
        Main content
      </div>
      <div class="wizard-right-content">
        Right content
      </div>
    </wiz-wizard>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'seb-ng-wizard-demo';
  steps = [
    { path: '/first', text: 'First step' },
    { path: '/second', text: 'Second step' },
    { path: '/third', text: 'third step' },
  ];

  nav(e: any) {
    console.log('nav', e);
  }
}
