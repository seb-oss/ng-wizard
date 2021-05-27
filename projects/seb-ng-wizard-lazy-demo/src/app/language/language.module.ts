import { CommonModule } from '@angular/common';
import { ClassProvider, Injectable, NgModule } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { SebNgWizardModule, WizardSteps, WizardTexts, WizardTranslations } from '@sebgroup/ng-wizard';
import { Observable } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { TranslocoRootModule } from '../transloco-root.module';

import { ChangeLanguageComponent } from './components/steps/change-language/change-language.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { LanguageInHeaderComponent } from './components/steps/language-in-header/language-in-header.component';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageComponent } from './language.component';

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
  declarations: [LanguageComponent, IntroductionComponent, ChangeLanguageComponent, LanguageInHeaderComponent],
  imports: [
    CommonModule,
    LanguageRoutingModule,
    TranslocoRootModule,
    SebNgWizardModule.forRoot(null, TRANSLATIONS_PROVIDER),
    SharedModule
  ],
  providers: [WizardSteps, CustomTranslations],
})
export class LanguageModule {}
