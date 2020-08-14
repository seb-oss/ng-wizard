import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedStepInfoComponent } from './protected-step-info.component';

describe('ProtectedStepInfoComponent', () => {
  let component: ProtectedStepInfoComponent;
  let fixture: ComponentFixture<ProtectedStepInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProtectedStepInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedStepInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
