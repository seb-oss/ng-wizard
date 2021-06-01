import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styles: [
    `
      div[markdown] {
        max-width: calc(100vw - 2.5rem);
      }
    `,
  ],
})
export class CodeSnippetComponent implements OnInit {
  @Input() data: string;
  @Input() github: string;
  @Input() lang: string;
  @Input() desc: string;
  @Input() title: string;
  show = false;
  constructor() {}

  ngOnInit() {}

  toggleSnippet() {
    this.show = !this.show;
  }
}
