import { Component, Input } from '@angular/core';
import { SecondaryContentComponent } from '@sebgroup/ng-wizard';

@Component({
  selector: 'app-additional-content',
  templateUrl: './additional-content.component.html',
  styleUrls: ['./additional-content.component.scss'],
})
export class AdditionalContentComponent implements SecondaryContentComponent {
  @Input() data: any;
  constructor() {}
}
