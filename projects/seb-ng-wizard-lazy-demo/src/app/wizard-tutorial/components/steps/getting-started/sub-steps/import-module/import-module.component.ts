import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-module',
  templateUrl: './import-module.component.html',
  styles: [],
})
export class ImportModuleComponent implements OnInit {
  constructor() {}
  importModule = `// app.module.ts
import { SebNgWizardModule, WizardSteps } from '@sebgroup/ng-wizard'; // <-- Add this line
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // <-- Add this line to get animations
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';  // <-- Add this line to use correct icons

@NgModule({
  imports: [
    AppRoutingModule, // holds wizard steps as routes
    BrowserAnimationsModule, // <-- Add this line to get animations
    SebNgWizardModule.forRoot(),  // <-- Add wizard (pass optional config)
    FontAwesomeModule //  <-- Add this line to get correct icons
  ],
  providers: [WizardSteps] // <-- Add wizard steps
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // add icons that should be available in the app/module
    library.addIcons(
      faCalendarAlt
    );
  }
}`;
  ngOnInit() {}
}
