import { TestBed } from '@angular/core/testing';

import { StepService } from './step.service';

describe('StepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepService = TestBed.get(StepService);
    expect(service).toBeTruthy();
  });
});
