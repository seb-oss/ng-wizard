import { CommonModule } from '@angular/common';
import { ClassProvider, Injectable, NgModule } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { SebNgWizardModule, WizardStepsService, WizardTranslations } from '@sebgroup/ng-wizard';
import { Observable } from 'rxjs';
import { TranslocoRootModule } from '../transloco-root.module';

import { ChangeLanguageComponent } from './components/steps/change-language/change-language.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageComponent } from './language.component';

@Injectable()
export class CustomTranslations implements WizardTranslations {
  constructor(private translocoService: TranslocoService) {}
  translations$: Observable<any> = this.translocoService.selectTranslation();
}

const TRANSLATIONS_PROVIDER: ClassProvider = {
  provide: WizardTranslations,
  useClass: CustomTranslations,
};

@NgModule({
  declarations: [LanguageComponent, IntroductionComponent, ChangeLanguageComponent],
  imports: [
    CommonModule,
    LanguageRoutingModule,
    TranslocoRootModule,
    SebNgWizardModule.forRoot(null, TRANSLATIONS_PROVIDER),
  ],
  providers: [WizardStepsService, CustomTranslations],
})
export class LanguageModule {}
