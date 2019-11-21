import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wiz-top-bar',
  template: `
    <div class="wizard-progress-bar">
      <div class="progress" [style.width]="progress"></div>
    </div>
    <div class="title">
      <div class="seb-logo"></div>
      <div class="title-text" [innerText]="title"></div>
    </div>
    <div class="close-wizard">
      <button type="button" class="close-link" (click)="close.next()">{{ lang == 'en' ? 'Close' : 'Stäng' }}</button>
      <button type="button" class="close-button" data-dismiss="modal" aria-label="Close" (click)="close.next()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `,
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input()
  title: string;

  @Input()
  progress: string;

  @Input()
  lang: 'sv' | 'en';

  @Output()
  close: EventEmitter<void> = new EventEmitter();
  constructor() {}
}
