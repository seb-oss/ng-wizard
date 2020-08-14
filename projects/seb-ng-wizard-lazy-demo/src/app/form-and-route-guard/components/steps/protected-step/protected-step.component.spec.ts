import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedStepComponent } from './protected-step.component';

describe('ProtectedStepComponent', () => {
  let component: ProtectedStepComponent;
  let fixture: ComponentFixture<ProtectedStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProtectedStepComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
