import { TestBed } from '@angular/core/testing';

import { Payment2Service } from './payment2.service';

describe('Payment2Service', () => {
  let service: Payment2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Payment2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
