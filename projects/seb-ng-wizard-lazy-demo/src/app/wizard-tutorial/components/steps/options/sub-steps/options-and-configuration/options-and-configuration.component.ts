import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-and-configuration',
  templateUrl: './options-and-configuration.component.html',
})
export class OptionsAndConfigurationComponent implements OnInit {
  constructor() {}
  useCustomConfig = `// app.module.ts
import { CommonModule } from '@angular/common';
import { ClassProvider, Injectable, NgModule } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { SebNgWizardModule, WizardSteps, WizardTexts, WizardTranslations } from '@sebgroup/ng-wizard';
import { Observable } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { TranslocoRootModule } from '../transloco-root.module';

import { ChangeLanguageComponent } from './components/steps/change-language/change-language.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@Injectable()
export class CustomTranslations implements WizardTranslations {
  constructor(private translocoService: TranslocoService) {}
  translations$: Observable<WizardTexts> = this.translocoService.selectTranslation();
}

const TRANSLATIONS_PROVIDER: ClassProvider = {
  provide: WizardTranslations,
  useClass: CustomTranslations,
};

@NgModule({
  declarations: [AppComponent, IntroductionComponent, ChangeLanguageComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslocoRootModule,
    SebNgWizardModule.forRoot({ hideClose: true }, TRANSLATIONS_PROVIDER),
    SharedModule
  ],
  providers: [WizardSteps, CustomTranslations],
})
export class LanguageModule {}
`;

  ngOnInit() {}
}
