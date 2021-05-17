import { Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WizSecondaryContentDirective } from '../../directives/secondary-content.directive';
import { WizardStepData } from '../../models/wizard-step';
import { WizardTranslations } from '../../seb-ng-wizard.module';
import { WizardStepsService } from '../../services/wizard-steps.service';

@Component({
  selector: 'wiz-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent {
  public activeStep$ = this.wizardStepService.activeStep$.pipe(
    tap(activeStep => {
      if (activeStep && activeStep.data.secondaryContent) {
        this.loadComponent(activeStep.data.secondaryContent);
      }
    }),
  );

  @ViewChild(WizSecondaryContentDirective, { static: false }) wizSecondaryContentHost: WizSecondaryContentDirective;
  @Input()
  title: string;

  @Input()
  hideCloseButton = false;

  @Input()
  lang: 'sv' | 'en' = 'en';

  @Input()
  routerOutletName: string;

  @Output()
  navigate: EventEmitter<WizardStepData> = new EventEmitter(true);

  @Output()
  close: EventEmitter<MouseEvent> = new EventEmitter(true);
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public wizardStepService: WizardStepsService,
    public translations: WizardTranslations,
  ) {}

  loadComponent(secondaryContent: any) {
    setTimeout(() => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(secondaryContent.component);

      if (this.wizSecondaryContentHost) {
        const viewContainerRef = this.wizSecondaryContentHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent<any>(componentFactory);
        componentRef.instance.data = secondaryContent.data;
      }
    }, 0);
  }
}
