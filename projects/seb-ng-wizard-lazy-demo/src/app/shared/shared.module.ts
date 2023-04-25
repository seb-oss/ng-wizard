import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { MarkdownModule } from 'ngx-markdown';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';

@NgModule({
  declarations: [CodeSnippetComponent],
  imports: [CommonModule, FormsModule, FontAwesomeModule, ReactiveFormsModule, MarkdownModule.forRoot()],
  exports: [CommonModule, FormsModule, FontAwesomeModule, ReactiveFormsModule, MarkdownModule, CodeSnippetComponent],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    // add icons that should be available in the app/module
    library.addIcons(<any>faGithub);
  }
}
