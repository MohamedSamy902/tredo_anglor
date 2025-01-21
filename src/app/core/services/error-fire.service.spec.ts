import { TestBed } from '@angular/core/testing';

import { ErrorFireService } from './error-fire.service';

describe('ErrorFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorFireService = TestBed.get(ErrorFireService);
    expect(service).toBeTruthy();
  });
});
