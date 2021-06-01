# @sebgroup/ng-wizard

[![CI](https://github.com/sebgroup/ng-wizard/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/sebgroup/ng-wizard/actions/workflows/main.yml)[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<p class="lead">
  This is a wizard component built for angular. It uses routes and route guards to control steps and it relies on
  Bootstrap for markup and styling as well as Font Awesome for icons.
</p>
<h4>Requirements</h4>
<ul class="list-group list-group-check">
  <li class="list-group-item">
    <strong>Angular</strong> - This component is built for Angular and tested with version 12+.
  </li>
  <li class="list-group-item">
    <strong>A route for each step</strong> - Each step in the wizard is a route with an optional route guard using
    <a href="https://angular.io/api/router/CanActivate" class="external" target="_blank">CanActivate</a> (for protected
    steps). Step controls are provided using route data objects.
  </li>
  <li class="list-group-item">
    <strong>Bootstrap</strong> - This component relies on styles provided by SEB:s Bootstrap theme:
    <a href="https://github.com/sebgroup/bootstrap" class="external" target="_blank">@sebgroup/bootstrap</a>.
  </li>
  <li class="list-group-item">
    <strong>Font Awesome</strong> - This component uses Font Awesome regular icons (dependency might be removed in a
    future release).
    <div class="alert alert-warning alert-icon mt-3 mx-n5 mx-sm-0">
      Note that you need to have a pro license for Font Awesome or use SEB:s internal npm registry to install this
      package.
    </div>
  </li>
</ul>

## Demo and documentation

[View demo and documentation](https://sebgroup.github.io/ng-wizard/)

## Quick start

### Install

```
npm install @sebgroup/ng-wizard
```

### Import the module.

app.module.ts

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SebNgWizardModule, WizardSteps } from '@sebgroup/ng-wizard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';

@NgModule({
  declarations: [AppComponent, StepOneComponent, StepTwoComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FontAwesomeModule, SebNgWizardModule.forRoot()],
  providers: [WizardSteps],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // add icons that should be available in the app/module
  }
}
```

### Setup steps as routes

app-routing.module.ts

```TypeScript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardStep } from '@sebgroup/ng-wizard';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';

const routes: WizardStep[] = [
  {
    path: '',
    redirectTo: 'step-one',
    pathMatch: 'full',
  },
  {
    path: 'step-one',
    component: StepOneComponent,
    data: {
      heading: 'Step one',
    },
  },
  {
    path: 'step-two',
    component: StepTwoComponent,
    data: {
      heading: 'Step two',
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```

### Add component

app.component.ts

```Html
<!-- add wizard component and router outlet -->
<wiz-wizard>
  <div class="wizard-main">
    <!-- this is where your steps will be rendered -->
    <router-outlet></router-outlet>
  </div>
</wiz-wizard>
```

For more info and examples please see [demo and documentation](https://sebgroup.github.io/ng-wizard/).
