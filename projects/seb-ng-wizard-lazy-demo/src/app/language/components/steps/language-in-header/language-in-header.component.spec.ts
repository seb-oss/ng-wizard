import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageInHeaderComponent } from './language-in-header.component';

describe('LanguageInHeaderComponent', () => {
  let component: LanguageInHeaderComponent;
  let fixture: ComponentFixture<LanguageInHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageInHeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageInHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
