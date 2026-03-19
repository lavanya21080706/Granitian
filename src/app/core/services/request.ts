import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
  private baseUrl = 'https://x2f6r9dz0i.execute-api.ap-south-1.amazonaws.com/prd';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  searchUsers(username: string): Observable<any> {
  return this.http.get(
    `${this.baseUrl}/users/search?username=${username}`
  );
}

  //  searchUsers(username: string): Observable<any> {
  //   const token = localStorage.getItem('authToken') || localStorage.getItem('token');
  //   if(token) {
  //     console.log('Decoded JWT Payload:', JSON.parse(atob(token.split('.')[1])));
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
    
  //   return this.http.get(`${this.baseUrl}/users/search?username=${username}`, { headers });
  // }

  // Get user details by ID
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`);
  }

  // Send a user request
  sendUserRequest(requestedUserId: number, requestType: number = 1): Observable<any> {
    const payload = {
      requested_user_id: requestedUserId,
      request_type: requestType, // 1 = connection request, adjust based on your needs
      status_id: 1 // PENDING
    };
    return this.http.post(`${this.baseUrl}/user-requests`, payload);
  }

  // Get all approval list (with optional status filter)
  getApprovalList(statusId?: number): Observable<any> {
    let url = `${this.baseUrl}/user-requests/approvals`;
    if (statusId) {
      url += `?status_id=${statusId}`;
    }
    return this.http.get(url);
  }

  // Get pending requests (incoming)
  getPendingRequests(): Observable<any> {
    return this.getApprovalList(1); // status_id 1 = PENDING
  }

  // Get accepted requests
  getAcceptedRequests(): Observable<any> {
    return this.getApprovalList(2); // status_id 2 = ACCEPTED
  }

  // Accept a request
  acceptRequest(requestId: number): Observable<any> {
    const payload = {
      request_id: requestId,
      action: 'accept'
    };
    return this.http.put(`${this.baseUrl}/user-requests/manage`, payload);
  }

  // Reject a request
  rejectRequest(requestId: number): Observable<any> {
    const payload = {
      request_id: requestId,
      action: 'reject'
    };
    return this.http.put(`${this.baseUrl}/user-requests/manage`, payload);
  }

  // Cancel a request (for requests you sent)
  cancelRequest(requestId: number): Observable<any> {
    const payload = {
      request_id: requestId,
      action: 'cancel'
    };
    return this.http.put(`${this.baseUrl}/user-requests/manage`, payload);
  }

  // Get request status text
  getStatusText(statusId: number): string {
    const statusMap: { [key: number]: string } = {
      1: 'PENDING',
      2: 'ACCEPTED',
      3: 'REJECTED',
      4: 'CANCELLED'
    };
    return statusMap[statusId] || 'UNKNOWN';
  }

  // Get status color
  getStatusColor(statusId: number): string {
    const colorMap: { [key: number]: string } = {
      1: 'warning',    // PENDING - yellow
      2: 'success',    // ACCEPTED - green
      3: 'danger',     // REJECTED - red
      4: 'medium'      // CANCELLED - gray
    };
    return colorMap[statusId] || 'medium';
  }
}