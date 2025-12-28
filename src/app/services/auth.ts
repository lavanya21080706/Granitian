import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://x2f6r9dz0i.execute-api.ap-south-1.amazonaws.com/prd';

  constructor(private http: HttpClient) { }

  signup(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`/api/prd/signup`, payload, { headers });
  }

  // login(payload: any): Observable<any> {
  //   // return this.http.post(`${this.baseUrl}/login`, payload);
  //   return this.http.post(`/api/prd/login`, payload);
  // }
  login(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`/api/prd/login`, payload, { headers });
  }

  requestOtp(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/request_otp`, payload);
  }

  verifyOtp(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify_otp`, payload);
  }
}
