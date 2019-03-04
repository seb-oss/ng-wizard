# @sebgroup/ng-wizard

[![Build Status](https://travis-ci.com/sebgroup/ng-wizard.svg?token=ogFUkA9d52UFZqFZXBNy&branch=master)](https://travis-ci.com/sebgroup/ng-wizard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A reusable angular component for a Wizard according to the seb-style guide. It manages all the css for you. It does require the use of Angulars router to keep track of what step in the wizard the user is currently on.

## Quick start

Import the module.

```TypeScript
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WizardModule } from 'ng-wizard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WizardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Setup the steps and event-listeners in your component.

```TypeScript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardStep } from 'ng-wizard';

@Component({
  selector: 'app-root', // tslint:disable-line
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  steps: WizardStep[] = [
    { path: '/first', text: 'First step' },
    { path: '/second', text: 'Second step' },
    { path: '/third', text: 'Third step' }
  ];

  constructor(private router: Router) {}

  onClose() {
    console.log('close');
  }

  onStep(step: WizardStep) {
    this.router.navigateByUrl(step.path);
  }
}
```

Write the markup for your template.

```Html
<wiz-wizard [hideNavigation]="false"
             wizardTitle="Wizard title"
            [steps]="steps"
            (navigate)="onStep($event)"
            (close)="onClose($event)">
  <div class="wizard-main">
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </div>
  <div class="wizard-right-content">
    <h3>Help content</h3>
    <p>Content in the right column of the wizard</p>
  </div>
</wiz-wizard>
```

## Content selectors

Two content selectors are used by the wizard, _.wizard-main_ where the main content of the wizard will be displayed. To get started quickly, place your router-outlet there. _.wizard-right-content_ this is where your right hand side help content will be placed.

## The properties of the wizard component

The properties you should know about are;

- _wizardTitle_ a string that described the title of the wizard.
- _steps_ an array of _WizardSteps_ that describe the different steps the wizard of following, the path property must be the same as in the applications router since it's this property it's using to mark what steps have been visited and which is currently active.
- _hideNavigation_ a boolean that tells the wizard to hide the navigation pane on the left side.
- _hideCloseButton_ a boolean that tells the wizard to hide the close button on the top-right.
- _lang_ a string that tells the wizard what language it should be displayed in.

## Events

Two events are used, _navigate_, it fires when the user clicks one of the links in the left navigation pane, the _WizardStep_ associated with that step is sent with the event. _close_ fires when the user clicks the X button in the top right corner of the wizard.
