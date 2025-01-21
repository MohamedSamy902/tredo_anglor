import { TestBed } from '@angular/core/testing';

import { MerchentsService } from './merchents.service';

describe('MerchentsService', () => {
  let service: MerchentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
