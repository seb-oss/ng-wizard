import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStepsComponent } from './sub-steps.component';

describe('SubStepsComponent', () => {
  let component: SubStepsComponent;
  let fixture: ComponentFixture<SubStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubStepsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
