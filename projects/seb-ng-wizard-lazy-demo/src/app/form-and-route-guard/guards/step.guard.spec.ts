import { async, inject, TestBed } from '@angular/core/testing';

import { StepGuard } from './step.guard';

describe('StepGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepGuard],
    });
  });

  it('should ...', inject([StepGuard], (guard: StepGuard) => {
    expect(guard).toBeTruthy();
  }));
});
