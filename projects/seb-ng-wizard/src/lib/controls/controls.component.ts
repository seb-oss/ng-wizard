import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { WizardControl, WizardControls } from '../models/wizard-step';
import { WizardControlService } from './wizard-control.service';

@Component({
  selector: 'wiz-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  $controls: Observable<WizardControls>;
  constructor(private route: ActivatedRoute, public router: Router, private wizardControl: WizardControlService) {
    this.$controls = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(_ => this.route.snapshot.firstChild.data.controls),
      startWith(this.route.snapshot.firstChild.data.controls),
    );
  }

  emitControlEvent($event: MouseEvent, control: WizardControl) {
    this.wizardControl.click($event, control);
  }

  ngOnInit() {}
}
