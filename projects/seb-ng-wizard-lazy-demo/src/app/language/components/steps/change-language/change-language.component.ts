import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
})
export class ChangeLanguageComponent implements OnInit {
  constructor(private translocoService: TranslocoService, private _router: Router) {}

  toggleLang() {
    const lang = this.translocoService.getActiveLang() === 'sv' ? 'en' : 'sv';
    this._router.navigate([], {
      queryParams: {
        lang,
      },
      queryParamsHandling: 'merge',
    });
    this.translocoService.setActiveLang(lang);
  }

  ngOnInit() {}
}
