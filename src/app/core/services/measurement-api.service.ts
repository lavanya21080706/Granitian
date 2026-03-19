import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_MEASUREMENTS } from '../../data/mock-measurements';

@Injectable({
providedIn: 'root'
})
export class MeasurementApiService {

getMeasurements(): Observable<any[]> {

return of(MOCK_MEASUREMENTS);

}

}