import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestService } from 'src/app/core/services/request';
import { ToastController, AlertController } from '@ionic/angular';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';

interface FriendRequest {
  request_id: number;
  requested_by_first_name: string;
  requested_by_last_name: string;
  requested_by_user_name: string;
  created_at?: string;
  sender_id?: number;
  status_id?: number;
  is_sent_by_current_user?: boolean;
  user_type_id?: number;
  processing?: boolean;
}

@Component({
  selector: 'app-friend-requests',
  templateUrl: './handle-requests.page.html',
  styleUrls: ['./handle-requests.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
    IonButton,
    IonIcon,
    GranitianHeaderPage
  ]
})
export class FriendRequestsPage implements OnInit {
  segments: string[] = ['pending', 'accepted', 'sent'];
  activeSegment: string = 'pending';

  pendingRequests: any[] = [];
  acceptedRequests: any[] = [];
  sentRequests: any[] = [];
  selectedAccepted: any[] = [];

//   pendingRequests: FriendRequest[] = [];
// acceptedRequests: FriendRequest[] = [];
// sentRequests: FriendRequest[] = [];
// selectedAccepted: FriendRequest[] = [];

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

    setTimeout(() => {
      this.pendingRequests = [
        {
          request_id: 101,
          requested_by_first_name: 'John',
          requested_by_last_name: 'Doe',
          requested_by_user_name: 'M0007',
          created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          request_id: 102,
          requested_by_first_name: 'Sarah',
          requested_by_last_name: 'Arjun',
          requested_by_user_name: 'S0003',
          created_at: new Date(Date.now() - 7200000).toISOString()
        }
      ];

      this.isLoading.pending = false;
    }, 800);
  }

  loadAcceptedRequests() {
    this.isLoading.accepted = true;

    setTimeout(() => {
      this.acceptedRequests = [
        {
          request_id: 201,
          sender_id: 3,
          requested_by_first_name: 'Raj',
          requested_by_last_name: 'Kumar',
          requested_by_user_name: 'T0012'
        },
        {
          request_id: 202,
          sender_id: 4,
          requested_by_first_name: 'Anita',
          requested_by_last_name: 'Sharma',
          requested_by_user_name: 'A0004'
        }
      ];

      this.isLoading.accepted = false;
    }, 800);
  }
  loadSentRequests() {
    this.isLoading.sent = true;
    this.userRequestService.getApprovalList().subscribe({
      next: (response: any) => {
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

  acceptRequest(request: any) {

  if (request.processing) return;

  request.processing = true;

  setTimeout(() => {

    this.pendingRequests =
      this.pendingRequests.filter(r => r.request_id !== request.request_id);

    this.acceptedRequests.push({
      ...request,
      sender_id: request.request_id
    });

    this.showToast('Request accepted');

  }, 500);

}
  rejectRequest(request: any) {

  if (request.processing) return;

  request.processing = true;

  setTimeout(() => {

    this.pendingRequests =
      this.pendingRequests.filter(r => r.request_id !== request.request_id);

    this.showToast('Request rejected');

  }, 500);

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

  trackByRequest(index: number, item: any) {
    return item.request_id;
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


  toggleSelection(request: any) {
    const exists = this.selectedAccepted.find(r => r.request_id === request.request_id);

    if (exists) {
      this.selectedAccepted = this.selectedAccepted
        .filter(r => r.request_id !== request.request_id);
    } else {
      this.selectedAccepted.push(request);
    }
  }

  removeConnection(request: any) {
    this.acceptedRequests =
      this.acceptedRequests.filter(r => r.request_id !== request.request_id);

    this.showToast('Connection removed');
  }

  removeSelected() {
    const ids = this.selectedAccepted.map(r => r.request_id);

    this.acceptedRequests =
      this.acceptedRequests.filter(r => !ids.includes(r.request_id));

    this.selectedAccepted = [];

    this.showToast('Selected connections removed');
  }
  getUserTypeName(typeId: number): string {
    const typeMap: { [key: number]: string } = {
      0: 'Trader',
      1: 'Marker',
      2: 'Supervisor',
      3: 'Factory Owner',
      4: 'Retailer',
    };

    return typeMap[typeId] || 'User';
  }
}

