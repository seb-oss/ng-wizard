import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
})
export class LanguageComponent {
  constructor(private translocoService: TranslocoService) {}

  toggleLang() {
    this.translocoService.setActiveLang(this.translocoService.getActiveLang() === 'sv' ? 'en' : 'sv');
  }
}
