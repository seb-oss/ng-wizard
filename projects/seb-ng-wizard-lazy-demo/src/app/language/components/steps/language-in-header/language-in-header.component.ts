import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-in-header',
  templateUrl: './language-in-header.component.html',
  styles: [],
})
export class LanguageInHeaderComponent implements OnInit {
  headerMarkup = `<wiz-wizard>
  <!-- wizard-actions can be used to add controls to header -->
  <div class="wizard-actions">
    <ng-container *transloco="let t">
      <button class="btn btn-secondary d-flex justify-content-between" (click)="toggleLang()">
        {{ t('language') }}
      </button>
    </ng-container>
  </div>
  <div class="wizard-main col-12 col-lg order-1 order-md-0 mr-lg-3">
    <router-outlet></router-outlet>
  </div>
</wiz-wizard>`;
  typescript = `import { Component } from '@angular/core';
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
}`;
  constructor() {}

  ngOnInit() {}
}
