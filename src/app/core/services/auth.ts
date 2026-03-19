import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://x2f6r9dz0i.execute-api.ap-south-1.amazonaws.com/prd';

  constructor(private http: HttpClient) { }

  signup(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/signup`, payload, { headers });
  }

  login(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/login`, payload, { headers }).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('authToken', res.token);
        }
      })
    );
  }

  private getUserIdFromToken(): number | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_id;
  }

  requestOtp(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/request_otp`, payload, { headers });
  }

  verifyOtp(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/verify_otp`, payload, { headers });
  }

  resetPassword(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/auth/reset-password`, payload, { headers });
  }

  getUserTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user-types`);
  }


  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getProfile() {
    const userId = this.getUserIdFromToken();

    if (!userId) {
      throw new Error('User ID not found in token');
    }

    return this.http.get<any>(`${this.baseUrl}/users/${userId}`);
  }

  updateProfile(payload: any) {
    return this.http.put(`${this.baseUrl}/users`, payload);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
