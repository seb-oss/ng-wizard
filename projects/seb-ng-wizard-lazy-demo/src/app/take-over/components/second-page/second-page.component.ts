import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: [],
})
export class SecondPageComponent implements OnInit, OnDestroy {
  model: NgbDateStruct;

  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
