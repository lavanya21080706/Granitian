export interface InventoryLot {
  id: number;
  lotNumber: string;
  material: string;
  size: string;
  factoryId: number;
  factoryName: string;
  userId: number;
  userName: string;
  status: 'Saved' | 'Shared';
  date: string;
}