import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons/faArrowRight';
import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons/faCalendarAlt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, NgbModule, FontAwesomeModule],
  exports: [CommonModule, FormsModule, NgbModule, FontAwesomeModule],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    // add icons that should be available in the app/module
    library.addIcons(faCalendarAlt, faArrowRight, faArrowLeft);
  }
}
