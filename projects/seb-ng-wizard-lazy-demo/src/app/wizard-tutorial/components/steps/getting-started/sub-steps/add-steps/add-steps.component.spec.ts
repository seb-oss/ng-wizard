import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepsComponent } from './add-steps.component';

describe('AddStepsComponent', () => {
  let component: AddStepsComponent;
  let fixture: ComponentFixture<AddStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddStepsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
