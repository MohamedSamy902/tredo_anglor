/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharingDataAppService } from './SharingDataApp.service';

describe('Service: SharingDataApp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharingDataAppService]
    });
  });

  it('should ...', inject([SharingDataAppService], (service: SharingDataAppService) => {
    expect(service).toBeTruthy();
  }));
});
