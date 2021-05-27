import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepControlsComponent } from './step-controls.component';

describe('StepControlsComponent', () => {
  let component: StepControlsComponent;
  let fixture: ComponentFixture<StepControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepControlsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
