import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepStatesComponent } from './step-states.component';

describe('StepStatesComponent', () => {
  let component: StepStatesComponent;
  let fixture: ComponentFixture<StepStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepStatesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
