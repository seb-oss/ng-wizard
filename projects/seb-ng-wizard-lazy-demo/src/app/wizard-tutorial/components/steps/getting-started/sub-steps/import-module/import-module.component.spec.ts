import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModuleComponent } from './import-module.component';

describe('ImportModuleComponent', () => {
  let component: ImportModuleComponent;
  let fixture: ComponentFixture<ImportModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
