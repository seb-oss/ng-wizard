import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: [],
})
export class FirstPageComponent implements OnInit, OnDestroy {
  options: Array<string> = [];

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 30; i++) {
      this.options.push('Lorem ipsum dolor sit amet');
    }
  }

  ngOnDestroy() {}
}
