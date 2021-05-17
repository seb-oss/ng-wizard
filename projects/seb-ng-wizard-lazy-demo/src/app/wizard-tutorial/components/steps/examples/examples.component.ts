import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples',
  template: '<router-outlet></router-outlet>',
})
export class ExamplesWrapperComponent implements OnInit {
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
      description:
        'Use the wizard with different languages and pass translations. This example uses transloco but you could use any library or custom setup as long as it can return translations as key value pairs.',
      path: '/language',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
