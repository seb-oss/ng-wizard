import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wizSecondaryContentHost]',
  standalone: true,
})
export class WizSecondaryContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

export interface SecondaryContentComponent {
  data: any;
}
