import { TestBed } from '@angular/core/testing';

import { InventoryServiceTs } from './inventory.service.ts';

describe('InventoryServiceTs', () => {
  let service: InventoryServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
