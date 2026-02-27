import { Injectable } from '@angular/core';
import { InventoryLot } from '../models/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryServiceTs {


  private mockLots: InventoryLot[] = [
    {
      id: 1,
      lotNumber: 'LOT-1001',
      material: 'Black Galaxy',
      size: '240 x 120',
      factoryId: 1,
      factoryName: 'Vijay Granites',
      userId: 11,
      userName: 'Ramesh',
      status: 'Shared',
      date: '2026-01-12'
    },
    {
      id: 2,
      lotNumber: 'LOT-1002',
      material: 'Steel Grey',
      size: '300 x 180',
      factoryId: 2,
      factoryName: 'Sai Granites',
      userId: 22,
      userName: 'Anil',
      status: 'Saved',
      date: '2026-01-10'
    },
    {
      id: 3,
      lotNumber: 'LOT-1003',
      material: 'Absolute Black',
      size: '260 x 160',
      factoryId: 1,
      factoryName: 'Vijay Granites',
      userId: 11,
      userName: 'Ramesh',
      status: 'Shared',
      date: '2026-01-08'
    }
  ];

  getLots() {
    return [...this.mockLots];
  }
  
}
