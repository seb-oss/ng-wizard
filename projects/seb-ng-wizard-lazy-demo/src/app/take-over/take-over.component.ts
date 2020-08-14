import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WizardStep } from '../../../../seb-ng-wizard/src/lib/wizard/wizard-step';

@Component({
  selector: 'app-take-over',
  templateUrl: './take-over.component.html',
  styleUrls: ['./take-over.component.scss'],
})
export class TakeOverComponent implements OnInit {
  steps: WizardStep[] = [
    { path: 'take-over/first', text: 'First step' },
    { path: 'take-over/second', text: 'Second step' },
  ];
  showRightContent = true;

  constructor(private route: ActivatedRoute, private router: Router) {}

  toggleRightContent() {
    this.showRightContent = !this.showRightContent;
  }

  onClose(event?: any) {
    console.log('clicked');
    // @ts-ignore
    window.parent.$$SEB.closeModal();
  }

  onStep(step: WizardStep) {
    console.log('STEP', step);
    this.router.navigateByUrl(step.path);
  }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('arenaHeader') === 'true') {
      document.getElementsByTagName('wiz-top-bar')[0].remove();
    }
  }
}
