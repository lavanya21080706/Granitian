import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MeasurementService {

  baseUrl = 'https://x2f6r9dz0i.execute-api.ap-south-1.amazonaws.com/prd';

  constructor(private http: HttpClient) {}

  createMeasurement(payload: any) {
    return this.http.post(`${this.baseUrl}/measurements`, payload);
  }

  addMeasurementDetails(payload: any) {
    return this.http.post(`${this.baseUrl}/measurements/details`, payload);
  }
}
