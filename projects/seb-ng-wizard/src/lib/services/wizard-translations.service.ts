import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { WizardTexts } from '../models/wizard-texts';
import { WizardTranslations } from '../seb-ng-wizard.module';

@Injectable({
  providedIn: 'root',
})
export class WizardTranslationsService {
  private _defaultTranslations: Observable<WizardTexts> = of({
    wiz_next_action: 'Next',
    wiz_prev_action: 'Back',
    wiz_save_action: 'Save',
    wiz_close_action: 'Close',
    wiz_step_description: 'Step {{stepNumber}} of {{numberOfSteps}}',
  });
  translations$: Observable<WizardTexts> = combineLatest([
    this._defaultTranslations,
    this.translations.translations$.pipe(startWith({})),
  ]).pipe(
    map(([defaultTranslations, translations]) => ({ ...defaultTranslations, ...translations })),
    shareReplay(1),
  );
  constructor(public translations: WizardTranslations) {}
}
