import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SecondaryContentComponent } from '@sebgroup/ng-wizard';

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
