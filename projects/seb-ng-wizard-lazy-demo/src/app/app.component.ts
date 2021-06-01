import { Component } from '@angular/core';
import { FaConfig } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'seb-ng-wizard-lazy-demo';
  constructor(private faConfig: FaConfig) {
    this.faConfig.defaultPrefix = 'far';
  }
}
