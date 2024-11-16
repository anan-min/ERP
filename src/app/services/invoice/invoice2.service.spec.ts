import { TestBed } from '@angular/core/testing';

import { Invoice2Service } from './invoice2.service';

describe('Invoice2Service', () => {
  let service: Invoice2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Invoice2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
