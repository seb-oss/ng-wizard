import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wiz-top-bar',
  template: `
    <nav class="navbar navbar-light bg-white position-fixed w-100 border-bottom">
      <span class="navbar-brand" [innerText]="title"></span>
      <button type="button" class="close d-flex align-items-center" data-dismiss="modal">
        <span class="d-none d-md-inline">{{ lang === 'en' ? 'Close' : 'Stäng' }}</span>
      </button>
    </nav>
    <!--<div class="wizard-progress-bar">
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
    </div>-->
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
