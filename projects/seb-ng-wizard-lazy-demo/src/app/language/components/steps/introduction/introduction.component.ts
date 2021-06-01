import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
})
export class IntroductionComponent implements OnInit {
  constructor() {}
  translationsProivder = `// app.module.ts
import { CommonModule } from '@angular/common';
import { ClassProvider, Injectable, NgModule } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { SebNgWizardModule, WizardSteps, WizardTranslations } from '@sebgroup/ng-wizard';
import { Observable } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { TranslocoRootModule } from '../transloco-root.module';

import { ChangeLanguageComponent } from './components/steps/change-language/change-language.component';
import { IntroductionComponent } from './components/steps/introduction/introduction.component';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageComponent } from './language.component';

// service for custom translations implementing wizard translations
@Injectable()
export class CustomTranslations implements WizardTranslations {
  // this example uses transloco but feel free to use whatever you like
  constructor(private translocoService: TranslocoService) {}
  // you need to provide translations$ observable with key value pairs for the keys you use in the wizard
  translations$: Observable<WizardTexts> = this.translocoService.selectTranslation();
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
    SebNgWizardModule.forRoot(null, TRANSLATIONS_PROVIDER), // pass provider to wizard
    SharedModule
  ],
  providers: [WizardSteps, CustomTranslations],
})
export class LanguageModule {}
`;

  ngOnInit() {}
}
