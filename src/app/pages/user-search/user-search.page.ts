// // src/app/pages/user-search/user-search.page.ts
// import { Component, OnInit } from '@angular/core';
// import { UserRequestService } from 'src/app/services/request';
// import { ToastController } from '@ionic/angular';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-user-search',
//   templateUrl: './user-search.page.html',
//   styleUrls: ['./user-search.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule, FormsModule]
// })
// export class UserSearchPage implements OnInit {
//   searchQuery: string = '';
//   searchResults: any[] = [];
//   isLoading: boolean = false;
//   showResults: boolean = false;
//   sentRequests: Set<number> = new Set(); // Track sent requests

//   constructor(
//     private userRequestService: UserRequestService,
//     private toastCtrl: ToastController
//   ) { }

//   ngOnInit() { }

//   onSearchInput() {
//     if (this.searchQuery.length >= 3) {
//       this.searchUsers();
//     } else {
//       this.searchResults = [];
//       this.showResults = false;
//     }
//   }

//   searchUsers() {
//     this.isLoading = true;
//     this.userRequestService.searchUsers(this.searchQuery).subscribe({
//       next: (response: any) => {
//         this.searchResults = response.users || [];
//         this.showResults = true;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Search error:', error);
//         this.showToast('Error searching users');
//         this.isLoading = false;
//       }
//     });
//   }

//   sendRequest(userId: number) {
//     this.userRequestService.sendUserRequest(userId).subscribe({
//       next: (response: any) => {
//         this.sentRequests.add(userId);
//         this.showToast('Request sent successfully');

//         // Update the user's request status in results
//         const user = this.searchResults.find(u => u.user_id === userId);
//         if (user) {
//           user.requestStatus = 'PENDING';
//           user.requestId = response.request_id;
//         }
//       },
//       error: (error) => {
//         console.error('Send request error:', error);
//         this.showToast(error?.error?.message || 'Failed to send request');
//       }
//     });
//   }

//   async showToast(message: string) {
//     const toast = await this.toastCtrl.create({
//       message,
//       duration: 2500,
//       position: 'bottom'
//     });
//     await toast.present();
//   }

//   cancelRequest(requestId: number, userId: number) {
//     this.userRequestService.cancelRequest(requestId).subscribe({
//       next: () => {
//         this.sentRequests.delete(userId);
//         const user = this.searchResults.find(u => u.user_id === userId);
//         if (user) {
//           user.requestStatus = 'CANCELLED';
//         }
//         this.showToast('Request cancelled');
//       },
//       error: (error) => {
//         console.error('Cancel error:', error);
//         this.showToast(error?.error?.message || 'Failed to cancel request');
//       }
//     });
//   }

//   getInitials(name: string): string {
//     if (!name) return 'U';
//     return name.charAt(0).toUpperCase();
//   }
// }

// src/app/pages/user-search/user-search.page.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Required for ngModel
import { CommonModule } from '@angular/common'; // Required for ngStyle
import { UserRequestService } from 'src/app/services/request';
// import { UserRequestService } from '../../services/user-request.service';
import { ToastController } from '@ionic/angular';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonIcon,
  IonSpinner,
  IonLabel,
  IonList,
  IonItem,
  IonAvatar,
  IonBadge,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.page.html',
  styleUrls: ['./user-search.page.scss'],
  standalone: true,
  imports: [
    CommonModule,      // For ngStyle, ngIf, ngFor
    FormsModule,       // For ngModel
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonInput,
    IonIcon,
    IonSpinner,
    IonLabel,
    IonList,
    IonItem,
    IonAvatar,
    IonBadge,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
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
  ) {}

  ngOnInit() {}

  onSearchInput() {
    if (this.searchQuery.length >= 3) {
      this.searchUsers();
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  searchUsers() {
    this.isLoading = true;
    this.userRequestService.searchUsers(this.searchQuery).subscribe({
      next: (response: any) => {
        this.searchResults = response.users || [];
        this.showResults = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.showToast('Error searching users');
        this.isLoading = false;
      }
    });
  }

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
          user.requestStatus = 'CANCELLED';
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