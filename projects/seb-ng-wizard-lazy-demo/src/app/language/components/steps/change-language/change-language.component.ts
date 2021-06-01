import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
})
export class ChangeLanguageComponent {
  toggleLangExample = `import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
})
export class ChangeLanguageComponent {
  constructor(private translocoService: TranslocoService, private _router: Router) {}

  toggleLang() {
    // get active language
    const lang = this.translocoService.getActiveLang() === 'sv' ? 'en' : 'sv';

    // pass language as query param
    this._router.navigate([], {
      queryParams: {
        lang,
      },
      queryParamsHandling: 'merge',
    });

    // set active language
    this.translocoService.setActiveLang(lang);
  }

}
`;
  constructor(private translocoService: TranslocoService, private _router: Router) {}

  toggleLang() {
    // get active language
    const lang = this.translocoService.getActiveLang() === 'sv' ? 'en' : 'sv';

    // pass language as query param
    this._router.navigate([], {
      queryParams: {
        lang,
      },
      queryParamsHandling: 'merge',
    });

    // set active language
    this.translocoService.setActiveLang(lang);
  }
}
