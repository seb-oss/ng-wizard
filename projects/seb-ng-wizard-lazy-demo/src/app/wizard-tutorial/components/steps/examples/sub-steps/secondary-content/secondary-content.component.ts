import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secondary-content',
  templateUrl: './secondary-content.component.html',
})
export class SecondaryContentComponent implements OnInit {
  constructor() {}
  additionalContentTs = `// additional-content.component.ts
import { Component, Input } from '@angular/core';
import { SecondaryContentComponent } from '@sebgroup/ng-wizard';

@Component({
  selector: 'app-additional-content',
  templateUrl: './additional-content.component.html',
  styleUrls: ['./additional-content.component.scss']
})
export class AdditionalContentComponent implements SecondaryContentComponent {
  @Input() data: any;
  constructor() { }
}`;

  additionalContentHtml = `<!-- additional-content.component.html -->
<div class="alert alert-secondary mb-4">
  <h4 class="alert-heading">{{ data.heading }}</h4>
  <p>
    This is just a regular alert box i.e "alert alert-secondary" with a link to github.
    <a href="https://github.com/sebgroup/ng-wizard" target="_blank" class="alert-link external">View repo in github</a>.
  </p>
</div>
<h4>Pie chart</h4>
<figure>
  <figcaption>
    <p>You can add anything you like as secondary content to your step. Like this svg symbolizing some fancy pie chart or diagram that you might want to add.</p>
  </figcaption>
  <svg width="100" height="100" class="chart mt-4">
    <circle r="25" cx="50" cy="50" class="pie" style="stroke-dasharray: 94.8, 158;"></circle>
  </svg>
</figure>`;

  stepConfig = `// WizardStep config in routing.module.ts
{
  path: 'secondary-content',
  component: SecondaryContentComponent,
  data: {
    pageHeading: 'Add additional content',
    heading: 'Secondary content',
    secondaryContent: {
      component: AdditionalContentComponent,
      class: 'col-12 col-lg-auto order-last ml-lg-3 mb-3',
      data: {
        heading: 'Alert box',
      },
    },
  }
}`;
  ngOnInit() {}
}
