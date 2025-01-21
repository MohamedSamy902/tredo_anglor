import { TestBed } from '@angular/core/testing';

import { MerchantProfileService } from './merchant-profile.service';

describe('MerchantProfileService', () => {
  let service: MerchantProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
