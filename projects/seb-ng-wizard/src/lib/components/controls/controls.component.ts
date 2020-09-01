import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { WizardControl, WizardControls } from '../../models/wizard-step';
import { WizardControlService } from '../../services/wizard-control.service';

@Component({
  selector: 'wiz-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  $controls: Observable<WizardControls>;
  constructor(private route: ActivatedRoute, public router: Router, private wizardControl: WizardControlService) {
    this.$controls = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(_ => {
        if (this.route.snapshot.firstChild) {
          return this.route.snapshot.firstChild.data.controls;
        } else {
          console.warn(
            `Missing or incorrect route configuration.
            Please make sure you have a route with route data containing required properties for the wizard.`,
          );
          return [];
        }
      }),
      startWith(this.route.snapshot.firstChild ? this.route.snapshot.firstChild.data.controls : []),
    );
  }

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
