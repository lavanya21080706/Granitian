import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-share-history-modal',
  templateUrl: './share-history-modal.page.html',
  styleUrls: ['./share-history-modal.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ShareHistoryModalComponent {

  @Input() measurement: any;

  searchQuery: string = '';
  selectedUser: any = null;

  // Mock users (replace later with API)
  users = [
    { id: 1, name: 'Rajesh Kumar', username: 'M0007' },
    { id: 2, name: 'Kiran Patel', username: 'T0012' },
    { id: 3, name: 'Anil Sharma', username: 'S0003' }
  ];

  filteredUsers() {
    if (!this.searchQuery) return [];
    return this.users.filter(u =>
      u.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      u.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

  share() {
    this.modalCtrl.dismiss({
      shared: true,
      user: this.selectedUser
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  constructor(private modalCtrl: ModalController) {}
}
