import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardTutorialComponent } from './wizard-tutorial.component';

describe('TakeOverComponent', () => {
  let component: WizardTutorialComponent;
  let fixture: ComponentFixture<WizardTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardTutorialComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
