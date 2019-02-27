import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wiz-top-bar',
  template: `
    <div class="wizard-progress-bar">
      <div class="progress" [style.width]="progress"></div>
    </div>
    <div class="title">
      <span [innerText]="title"></span>
    </div>
    <div class="close-wizard">
      <button type="button" class="close-link" (click)="close.next()">{{ lang == 'en' ? 'Close' : 'Stäng' }}</button>
      <button type="button" class="close-button" data-dismiss="modal" aria-label="Close" (click)="close.next()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `,
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
