import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MeasurementApiService } from 'src/app/core/services/measurement-api.service';

@Injectable({
    providedIn: 'root'
})
export class MeasurementStore {

    private measurements = new BehaviorSubject<any[]>([]);

    measurements$ = this.measurements.asObservable();

    constructor(private api: MeasurementApiService) { }

    loadMeasurements() {

        this.api.getMeasurements().subscribe(data => {
            this.measurements.next(data);
        });

    }

    getAll() {
        return this.measurements.value;
    }

    getShared() {
        return this.measurements.value.filter(
            m => m.isSharedByMe || m.isSharedWithMe
        );
    }

    getSharedByMe() {
        return this.measurements.value.filter(
            m => m.isSharedByMe
        );
    }

    getReceived() {
        return this.measurements.value.filter(
            m => m.isSharedWithMe
        );
    }

}