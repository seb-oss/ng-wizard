import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
})
export class LanguageComponent implements OnInit {
  constructor(private translocoService: TranslocoService) {}

  toggleLang() {
    this.translocoService.setActiveLang(this.translocoService.getActiveLang() === 'sv' ? 'en' : 'sv');
  }

  ngOnInit() {}
}
