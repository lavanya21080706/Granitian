import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRequestService } from 'src/app/services/request';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.page.html',
  styleUrls: ['./user-search.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GranitianHeaderPage
  ]
})
export class UserSearchPage implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  showResults: boolean = false;
  sentRequests: Set<number> = new Set();

  constructor(
    private userRequestService: UserRequestService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() { }

  onSearchInput() {
    if (this.searchQuery.length >= 4) {
      this.searchUsers();
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }
  searchUsers() {
    this.isLoading = true;

    // ⏳ simulate API delay
    setTimeout(() => {

      this.searchResults = [
        {
          user_id: 1,
          first_name: 'John',
          last_name: 'Doe',
          user_name: 'M0007',
          user_type_id: 1,
          requestStatus: null
        },
        {
          user_id: 2,
          first_name: 'Sarah',
          last_name: 'Arjun',
          user_name: 'S0003',
          user_type_id: 2,
          requestStatus: 'PENDING',
          requestId: 101
        },
        {
          user_id: 3,
          first_name: 'Raj',
          last_name: 'Kyla',
          user_name: 'T0012',
          user_type_id: 5,
          requestStatus: 'ACCEPTED'
        }
      ];

      this.showResults = true;
      this.isLoading = false;

    }, 800); // simulate network delay
  }


  // searchUsers() {
  //   console.log('Searching for:', this.searchQuery);
  //   this.isLoading = true;
  //   this.userRequestService.searchUsers(this.searchQuery).subscribe({
  //     next: (response: any) => {
  //       this.searchResults = response.users || [];
  //       this.showResults = true;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.log('Status:', error.status);
  //       console.log('Backend Response:', error.error);
  //       this.isLoading = false;
  //     }

  //   });
  // }

  sendRequest(userId: number) {
    this.userRequestService.sendUserRequest(userId).subscribe({
      next: (response: any) => {
        this.sentRequests.add(userId);
        this.showToast('Request sent successfully');

        const user = this.searchResults.find(u => u.user_id === userId);
        if (user) {
          user.requestStatus = 'PENDING';
          user.requestId = response.request_id;
        }
      },
      error: (error) => {
        console.error('Send request error:', error);
        this.showToast(error?.error?.message || 'Failed to send request');
      }
    });
  }

  cancelRequest(requestId: number, userId: number) {
    this.userRequestService.cancelRequest(requestId).subscribe({
      next: () => {
        this.sentRequests.delete(userId);
        const user = this.searchResults.find(u => u.user_id === userId);
        if (user) {
          user.requestStatus = null;  
          user.requestId = null;
        }
        this.showToast('Request cancelled');
      },
      error: (error) => {
        console.error('Cancel error:', error);
        this.showToast(error?.error?.message || 'Failed to cancel request');
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  }

  // ADD THESE MISSING METHODS
  getAvatarColor(userId: number): string {
    const colors = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #30cfd0, #330867)'
    ];
    return colors[userId % colors.length];
  }

  getUserTypeColor(typeId: number): string {
    const colorMap: { [key: number]: string } = {
      0: 'medium',   // General User
      1: 'primary',  // Marker
      2: 'success',  // Supervisor
      3: 'warning',  // Factory Owner
      4: 'danger',   // Retailer
      5: 'tertiary'  // Trader
    };
    return colorMap[typeId] || 'medium';
  }

  getUserTypeName(typeId: number): string {
    const typeMap: { [key: number]: string } = {
      0: 'General User',
      1: 'Marker',
      2: 'Supervisor',
      3: 'Factory Owner',
      4: 'Retailer',
      5: 'Trader'
    };
    return typeMap[typeId] || 'Unknown';
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'PENDING': 'warning',
      'ACCEPTED': 'success',
      'REJECTED': 'danger',
      'CANCELLED': 'medium'
    };
    return colorMap[status] || 'medium';
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }
}