import { TestBed } from '@angular/core/testing';

import { OrderingObserverService } from './ordering-observer.service';

describe('OrderingObserverService', () => {
  let service: OrderingObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderingObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
