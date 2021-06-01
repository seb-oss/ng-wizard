import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SecondaryContentComponent } from '../../../../../../../seb-ng-wizard/src/lib/wizard/wizard.component';

@Component({
  selector: 'app-more-examples',
  templateUrl: './more-examples.component.html',
})
export class MoreExamplesComponent implements OnInit, OnDestroy, SecondaryContentComponent {
  @Input() data: any;
  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    console.log('DESTROY!');
  }
}
