import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
})
export class AddComponentComponent implements OnInit {
  constructor() {}
  addComponent = `<!-- app.component.html -->
<wiz-wizard>
  <div class="wizard-main col-12 col-lg">
    <router-outlet></router-outlet>
  </div>
</wiz-wizard>`;
  addComponentControls = `<!-- app.component.html -->
<wiz-wizard>
  <!-- wizard-actions can be used to add controls to header -->
  <div class="wizard-actions">
    <button class="btn btn-secondary d-flex justify-content-between" (click)="save($event)">
      Save <fa-icon icon="save" class="ml-2"></fa-icon>
    </button>
  </div>
  <div class="wizard-main col-12 col-lg">
    <router-outlet></router-outlet>
  </div>
</wiz-wizard>`;

  ngOnInit() {}
}
