import { Component, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { WizardControl, WizardControls } from '../../models/wizard-step';
import { SebNgWizardConfigService } from '../../seb-ng-wizard.module';
import { WizardControlService } from '../../services/wizard-control.service';

@Component({
  selector: 'wiz-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  $controls: Observable<WizardControls>;
  constructor(
    @Inject(SebNgWizardConfigService) private config,
    private route: ActivatedRoute,
    public router: Router,
    private wizardControl: WizardControlService,
  ) {
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
      map(controls =>
        controls.map(control => {
          return { ...control, name: this.config.translations['en'][control.type] || control.name };
        }),
      ),
    );
  }

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }
}
