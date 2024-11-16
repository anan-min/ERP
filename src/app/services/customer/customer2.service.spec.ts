import { TestBed } from '@angular/core/testing';

import { Customer2Service } from './customer2.service';

describe('Customer2Service', () => {
  let service: Customer2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Customer2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
