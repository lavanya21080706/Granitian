import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MeasurementService {

  baseUrl = 'https://x2f6r9dz0i.execute-api.ap-south-1.amazonaws.com/prd';

  constructor(private http: HttpClient) { }

  createMeasurement(payload: any) {
    return this.http.post(`${this.baseUrl}/measurement/create`, payload);
  }


  addMeasurementDetails(payload: any) {
    return this.http.post(
      `${this.baseUrl}/measurements/addorupdatedetails`,
      payload
    );
  }
  getMeasurements() {
    return this.http.get<any[]>(`${this.baseUrl}/measurements`);
  }
  getMeasurementById(id: number) {
    return this.http.get(`${this.baseUrl}/measurements/${id}`);
  }

  updateMeasurement(id: number, payload: any) {
    return this.http.put(`${this.baseUrl}/measurement/update/${id}`, payload);
  }

  getMeasurementDetailsById(id: number) {
  return this.http.get(
    `${this.baseUrl}/measurement/getmeasurementdetailsbyid/${id}`
  );
}
}
