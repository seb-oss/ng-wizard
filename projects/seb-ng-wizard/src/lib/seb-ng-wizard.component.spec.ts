import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SebNgWizardComponent } from './seb-ng-wizard.component';

describe('SebNgWizardComponent', () => {
  let component: SebNgWizardComponent;
  let fixture: ComponentFixture<SebNgWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SebNgWizardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SebNgWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
