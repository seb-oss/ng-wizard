import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
})
export class GettingStartedComponent implements OnInit {
  importModule = `// app.module.ts
import { SebNgWizardModule, WizardStepsService } from '@sebgroup/ng-wizard'; // <-- Add this line
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // <-- Add this line to get animations
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';  // <-- Add this line to use correct icons

@NgModule({
  imports: [
    AppRoutingModule, // holds wizard steps as routes
    BrowserAnimationsModule, // <-- Add this line to get animations
    SebNgWizardModule.forRoot(),  // <-- Add wizard (pass optional config)
    FontAwesomeModule //  <-- Add this line to get correct icons
  ],
  providers: [WizardStepsService] // <-- Add wizard steps service
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // add icons that should be available in the app/module
    library.addIcons(
      faCalendarAlt
    );
  }
}`;

  addComponent = `<!-- app.component.html -->
<wiz-wizard title="SEB ng-wizard">
  <div class="wizard-main col-12 col-lg">
    <router-outlet></router-outlet>
  </div>
</wiz-wizard>`;

  addRoutes = `// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardSteps } from '@sebgroup/ng-wizard';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';

const routes: WizardSteps = [
  {
    path: '',
    redirectTo: 'step-one'
  }, {
    path: 'step-one',
    component: StepOneComponent,
    data: {
      heading: 'Step one',
      controls: [{
        type: 'next'
      }]
    }
  }, {
    path: 'step-two',
    component: StepTwoComponent,
    data: {
      heading: 'Step two',
      controls: [{
        type: 'prev'
      }, {
        name: 'Save',
        path: 'step-completed',
        type: 'save'
      }]
    },
  }, {
    path: '**',
    redirectTo: 'step-one',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
`;

  constructor() {}

  ngOnInit() {}
}
