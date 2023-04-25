import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WizSecondaryContentDirective } from '../../directives/secondary-content.directive';
import { WizardStepData } from '../../models/wizard-step';
import { WizardConfigService } from '../../services/wizard-config.service';
import { WizardSteps } from '../../services/wizard-steps.service';
import { WizardTranslationsService } from '../../services/wizard-translations.service';
import { ControlsComponent } from '../controls/controls.component';
import { LeftNavigationComponent } from '../left-navigation/left-navigation.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'wiz-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  standalone: true,
  imports: [CommonModule, LeftNavigationComponent, TopBarComponent, ControlsComponent, WizSecondaryContentDirective],
})
export class WizardComponent {
  public activeStep$ = this.wizardStepService.activeStep$.pipe(
    tap(activeStep => {
      if (activeStep && activeStep.data && activeStep.data.secondaryContent) {
        this.loadComponent(activeStep.data.secondaryContent);
      }
    }),
  );

  get config() {
    return this._config.loadConfig();
  }

  @ViewChild(WizSecondaryContentDirective) wizSecondaryContentHost: WizSecondaryContentDirective;

  @Input()
  routerOutletName: string;

  @Output()
  navigate: EventEmitter<WizardStepData> = new EventEmitter(true);

  @Output()
  close: EventEmitter<MouseEvent> = new EventEmitter(true);
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public wizardStepService: WizardSteps,
    public translations: WizardTranslationsService,
    private _config: WizardConfigService,
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
