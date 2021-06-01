import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
})
export class ExamplesComponent implements OnInit {
  examples = [
    {
      title: 'Basic example',
      description: 'A basic example with two routes and custom action in modal footer.',
      path: '/basic',
    },
    {
      title: 'Using route guards',
      description:
        'A wizard using reactive forms, form validation and route guards to prevent user from navigating to steps unless previous step has been completed.',
      path: '/form-and-route-guard',
    },
    {
      title: 'Secondary content (right content)',
      description: 'Coming soon...',
      path: '',
    },
    {
      title: 'With language and translations',
      description: 'Coming soon...',
      path: '',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
