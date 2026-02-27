import { Component, OnInit } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryServiceTs } from 'src/app/services/inventory.service';
import { InventoryLot } from 'src/app/models/inventory.model';
import { UserRole } from 'src/app/models/user-role.model';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, GranitianHeaderPage]
})
export class InventoryPage implements OnInit {

  lots: InventoryLot[] = [];
  filteredLots: InventoryLot[] = [];
  UserRole = UserRole;

  // 🔥 Change this to simulate roles
  // currentRole: UserRole = UserRole.INDIVIDUAL;
  // currentRole: UserRole = UserRole.SUPERVISOR;
  currentRole: UserRole = UserRole.FACTORY_OWNER;

  selectedFactory: number | null = null;
  selectedUser: number | null = null;
  selectedStatus: string | null = null;
  selectedDate: string | null = null;
  selectedMaterial: string | null = null;

  factories: any[] = [];
  users: any[] = [];

  constructor(private inventoryService: InventoryServiceTs) { }

  ngOnInit() {
    this.lots = this.inventoryService.getLots();
    this.filteredLots = [...this.lots];
    this.initializeFilters();
  }

  initializeFilters() {

    this.factories = [...new Map(
      this.lots.map(l => [l.factoryId, {
        factoryId: l.factoryId,
        factoryName: l.factoryName
      }])
    ).values()];
    this.users = [...new Map(
      this.lots.map(l => [l.userId, {
        userId: l.userId,
        userName: l.userName,
        factoryId: l.factoryId
      }])
    ).values()];
  }

  onFactoryChange() {
    if (this.selectedFactory) {
      this.users = [...new Map(
        this.lots
          .filter(l => l.factoryId === this.selectedFactory)
          .map(l => [l.userId, {
            userId: l.userId,
            userName: l.userName,
            factoryId: l.factoryId
          }])
      ).values()];
    } else {
      this.initializeFilters();
    }

    this.selectedUser = null;

    this.applyFilters();
  }
  applyFilters() {

    this.filteredLots = this.lots.filter(lot => {
      if (this.selectedFactory &&
        lot.factoryId !== this.selectedFactory) {
        return false;
      }
      if (this.selectedUser &&
        lot.userId !== this.selectedUser) {
        return false;
      }

      if (this.selectedMaterial &&
        lot.material !== this.selectedMaterial) {
        return false;
      }

      if (this.selectedStatus &&
        lot.status !== this.selectedStatus) {
        return false;
      }

      if (this.selectedDate) {
        const selected = new Date(this.selectedDate)
          .toISOString()
          .split('T')[0];

        if (lot.date !== selected) {
          return false;
        }
      }

      return true;
    });
  }
  async onDateChange(modal: IonModal) {
    this.applyFilters();
    await modal.dismiss();
  }

}
