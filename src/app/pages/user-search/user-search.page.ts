import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRequestService } from 'src/app/core/services/request';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

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
  searchSubject = new Subject<string>();

  constructor(
    private userRequestService: UserRequestService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {

    this.searchSubject
      .pipe(
        debounceTime(400),
        switchMap(query => {

          if (query.length < 4) {
            this.showResults = false;
            this.searchResults = [];
            return [];
          }

          this.isLoading = true;

          return this.mockSearch(query);

        })
      )
      .subscribe((results: any) => {

        this.searchResults = results;
        this.showResults = true;
        this.isLoading = false;

      });

  }

  mockSearch(query: string) {

    return new Promise<any>((resolve) => {

      setTimeout(() => {

        resolve([
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
            last_name: 'Kumar',
            user_name: 'T0012',
            user_type_id: 5,
            requestStatus: 'ACCEPTED'
          }
        ]);

      }, 800);

    });

  }
  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  trackByUser(index: number, user: any) {
    return user.user_id;
  }
  searchUsers() {
    this.isLoading = true;

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
          last_name: 'Kumar',
          user_name: 'T0012',
          user_type_id: 5,
          requestStatus: 'ACCEPTED'
        }
      ];

      this.showResults = true;
      this.isLoading = false;

    }, 800); 
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


  getUserTypeName(typeId: number): string {
    const typeMap: { [key: number]: string } = {
      0: 'Trader',
      1: 'Marker',
      2: 'Supervisor',
      3: 'Factory Owner',
      4: 'Retailer',
    };
    return typeMap[typeId] || 'Unknown';
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