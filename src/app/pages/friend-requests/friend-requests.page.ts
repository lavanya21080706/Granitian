// import { Component, OnInit } from '@angular/core';
// import { UserRequestService } from 'src/app/services/request';
// import { ToastController, AlertController } from '@ionic/angular';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';  
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-friend-requests',
//   templateUrl: './friend-requests.page.html',
//   styleUrls: ['./friend-requests.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule, FormsModule]
// })
// export class FriendRequestsPage implements OnInit {
//   segments: string[] = ['pending', 'accepted', 'sent'];
//   activeSegment: string = 'pending';

//   pendingRequests: any[] = [];
//   acceptedRequests: any[] = [];
//   sentRequests: any[] = [];

//   isLoading = {
//     pending: false,
//     accepted: false,
//     sent: false
//   };

//   constructor(
//     private userRequestService: UserRequestService,
//     private toastCtrl: ToastController,
//     private alertCtrl: AlertController
//   ) { }

//   ngOnInit() {
//     this.loadRequests();
//   }

//   segmentChanged(event: any) {
//     this.activeSegment = event.detail.value;
//     this.loadRequests();
//   }

//   loadRequests() {
//     switch (this.activeSegment) {
//       case 'pending':
//         this.loadPendingRequests();
//         break;
//       case 'accepted':
//         this.loadAcceptedRequests();
//         break;
//       case 'sent':
//         this.loadSentRequests();
//         break;
//     }
//   }

//   loadPendingRequests() {
//     this.isLoading.pending = true;
//     this.userRequestService.getPendingRequests().subscribe({
//       next: (response: any) => {
//         this.pendingRequests = response.requests || [];
//         this.isLoading.pending = false;
//       },
//       error: (error) => {
//         console.error('Error loading pending requests:', error);
//         this.showToast('Failed to load requests');
//         this.isLoading.pending = false;
//       }
//     });
//   }

//   loadAcceptedRequests() {
//     this.isLoading.accepted = true;
//     this.userRequestService.getAcceptedRequests().subscribe({
//       next: (response: any) => {
//         this.acceptedRequests = response.requests || [];
//         this.isLoading.accepted = false;
//       },
//       error: (error) => {
//         console.error('Error loading accepted requests:', error);
//         this.showToast('Failed to load accepted requests');
//         this.isLoading.accepted = false;
//       }
//     });
//   }

//   loadSentRequests() {
//     this.isLoading.sent = true;
//     this.userRequestService.getApprovalList().subscribe({
//       next: (response: any) => {
//         // Filter for requests where current user is the requester
//         this.sentRequests = (response.requests || []).filter((req: any) =>
//           req.status_id === 1 && req.is_sent_by_current_user
//         );
//         this.isLoading.sent = false;
//       },
//       error: (error) => {
//         console.error('Error loading sent requests:', error);
//         this.showToast('Failed to load sent requests');
//         this.isLoading.sent = false;
//       }
//     });
//   }

//   async acceptRequest(request: any) {
//     const alert = await this.alertCtrl.create({
//       header: 'Accept Request',
//       message: `Do you want to accept connection request from ${request.sender_name}?`,
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel'
//         },
//         {
//           text: 'Accept',
//           handler: () => {
//             this.userRequestService.acceptRequest(request.request_id).subscribe({
//               next: () => {
//                 this.pendingRequests = this.pendingRequests.filter(r => r.request_id !== request.request_id);
//                 this.showToast('Request accepted');
//               },
//               error: (error) => {
//                 this.showToast(error?.error?.message || 'Failed to accept request');
//               }
//             });
//           }
//         }
//       ]
//     });
//     await alert.present();
//   }

//   async rejectRequest(request: any) {
//     const alert = await this.alertCtrl.create({
//       header: 'Reject Request',
//       message: `Reject connection request from ${request.sender_name}?`,
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel'
//         },
//         {
//           text: 'Reject',
//           role: 'destructive',
//           handler: () => {
//             this.userRequestService.rejectRequest(request.request_id).subscribe({
//               next: () => {
//                 this.pendingRequests = this.pendingRequests.filter(r => r.request_id !== request.request_id);
//                 this.showToast('Request rejected');
//               },
//               error: (error) => {
//                 this.showToast(error?.error?.message || 'Failed to reject request');
//               }
//             });
//           }
//         }
//       ]
//     });
//     await alert.present();
//   }

//   async cancelSentRequest(request: any) {
//     const alert = await this.alertCtrl.create({
//       header: 'Cancel Request',
//       message: 'Do you want to cancel this request?',
//       buttons: [
//         {
//           text: 'No',
//           role: 'cancel'
//         },
//         {
//           text: 'Yes, Cancel',
//           role: 'destructive',
//           handler: () => {
//             this.userRequestService.cancelRequest(request.request_id).subscribe({
//               next: () => {
//                 this.sentRequests = this.sentRequests.filter(r => r.request_id !== request.request_id);
//                 this.showToast('Request cancelled');
//               },
//               error: (error) => {
//                 this.showToast(error?.error?.message || 'Failed to cancel request');
//               }
//             });
//           }
//         }
//       ]
//     });
//     await alert.present();
//   }

//   async showToast(message: string) {
//     const toast = await this.toastCtrl.create({
//       message,
//       duration: 2500,
//       position: 'bottom'
//     });
//     await toast.present();
//   }

//   getTimeAgo(date: string): string {
//     const now = new Date();
//     const created = new Date(date);
//     const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

//     if (diffInSeconds < 60) return 'Just now';
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
//     return `${Math.floor(diffInSeconds / 86400)}d ago`;
//   }
// }

// src/app/pages/friend-requests/friend-requests.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestService } from 'src/app/services/request';
// import { UserRequestService } from '../../services/user-request.service';
import { ToastController, AlertController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonBadge,
  IonSpinner,
  IonList,
  IonItem,
  IonAvatar,
  IonButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.page.html',
  styleUrls: ['./friend-requests.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonBadge,
    IonSpinner,
    IonList,
    IonItem,
    IonAvatar,
    IonButton,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    RouterLink
  ]
})
export class FriendRequestsPage implements OnInit {
   segments: string[] = ['pending', 'accepted', 'sent'];
  activeSegment: string = 'pending';

  pendingRequests: any[] = [];
  acceptedRequests: any[] = [];
  sentRequests: any[] = [];

  isLoading = {
    pending: false,
    accepted: false,
    sent: false
  };

  constructor(
    private userRequestService: UserRequestService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadRequests();
  }

  segmentChanged(event: any) {
    this.activeSegment = event.detail.value;
    this.loadRequests();
  }

  loadRequests() {
    switch (this.activeSegment) {
      case 'pending':
        this.loadPendingRequests();
        break;
      case 'accepted':
        this.loadAcceptedRequests();
        break;
      case 'sent':
        this.loadSentRequests();
        break;
    }
  }

  loadPendingRequests() {
    this.isLoading.pending = true;
    this.userRequestService.getPendingRequests().subscribe({
      next: (response: any) => {
        this.pendingRequests = response.requests || [];
        this.isLoading.pending = false;
      },
      error: (error) => {
        console.error('Error loading pending requests:', error);
        this.showToast('Failed to load requests');
        this.isLoading.pending = false;
      }
    });
  }

  loadAcceptedRequests() {
    this.isLoading.accepted = true;
    this.userRequestService.getAcceptedRequests().subscribe({
      next: (response: any) => {
        this.acceptedRequests = response.requests || [];
        this.isLoading.accepted = false;
      },
      error: (error) => {
        console.error('Error loading accepted requests:', error);
        this.showToast('Failed to load accepted requests');
        this.isLoading.accepted = false;
      }
    });
  }

  loadSentRequests() {
    this.isLoading.sent = true;
    this.userRequestService.getApprovalList().subscribe({
      next: (response: any) => {
        // Filter for requests where current user is the requester
        this.sentRequests = (response.requests || []).filter((req: any) =>
          req.status_id === 1 && req.is_sent_by_current_user
        );
        this.isLoading.sent = false;
      },
      error: (error) => {
        console.error('Error loading sent requests:', error);
        this.showToast('Failed to load sent requests');
        this.isLoading.sent = false;
      }
    });
  }

  async acceptRequest(request: any) {
    const alert = await this.alertCtrl.create({
      header: 'Accept Request',
      message: `Do you want to accept connection request from ${request.sender_name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Accept',
          handler: () => {
            this.userRequestService.acceptRequest(request.request_id).subscribe({
              next: () => {
                this.pendingRequests = this.pendingRequests.filter(r => r.request_id !== request.request_id);
                this.showToast('Request accepted');
              },
              error: (error) => {
                this.showToast(error?.error?.message || 'Failed to accept request');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async rejectRequest(request: any) {
    const alert = await this.alertCtrl.create({
      header: 'Reject Request',
      message: `Reject connection request from ${request.sender_name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reject',
          role: 'destructive',
          handler: () => {
            this.userRequestService.rejectRequest(request.request_id).subscribe({
              next: () => {
                this.pendingRequests = this.pendingRequests.filter(r => r.request_id !== request.request_id);
                this.showToast('Request rejected');
              },
              error: (error) => {
                this.showToast(error?.error?.message || 'Failed to reject request');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async cancelSentRequest(request: any) {
    const alert = await this.alertCtrl.create({
      header: 'Cancel Request',
      message: 'Do you want to cancel this request?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Cancel',
          role: 'destructive',
          handler: () => {
            this.userRequestService.cancelRequest(request.request_id).subscribe({
              next: () => {
                this.sentRequests = this.sentRequests.filter(r => r.request_id !== request.request_id);
                this.showToast('Request cancelled');
              },
              error: (error) => {
                this.showToast(error?.error?.message || 'Failed to cancel request');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }

  getTimeAgo(date: string): string {
    const now = new Date();
    const created = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }
}