import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonItem, IonLabel, IonButton, IonRadioGroup, IonRadio, IonTextarea, IonCard, IonCardContent, IonCardHeader,IonCardTitle } from '@ionic/angular/standalone';
import { MeasurementService } from 'src/app/services/measurement';

@Component({
  standalone: true,
  selector: 'app-measurement',
  templateUrl: './measurement.page.html',
  styleUrls: ['./measurement.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonRadioGroup,
    IonRadio,
    IonTextarea,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  ]
})
export class MeasurementPage {

  measurementId!: number;

  lot = {
    factory_name: '',
    granite_color: '',
    quality_type: '',
    measurement_type: 'Flat',
    allowance_length_in: 0,
    allowance_height_in: 0,
    cumulative_sqft: 0
  };

  slabs: any[] = [];

  constructor(private service: MeasurementService) {}

  createLot() {
    this.service.createMeasurement(this.lot).subscribe((res: any) => {
      this.measurementId = res.measurement_id;
      this.addSlab();
    });
  }

  addSlab(copy = false) {
    if (copy && this.slabs.length) {
      this.slabs.push({ ...this.slabs[this.slabs.length - 1] });
    } else {
      this.slabs.push({
        raw_length_in: 0,
        raw_height_in: 0,
        final_length: 0,
        final_height: 0,
        square_feet: 0,
        notes: ''
      });
    }
  }

  calculate(slab: any) {
    let length = slab.raw_length_in - this.lot.allowance_length_in;
    let height = slab.raw_height_in - this.lot.allowance_height_in;

    if (this.lot.measurement_type === '3-Multiple') {
      length = Math.floor(length / 3) * 3;
      height = Math.floor(height / 3) * 3;
    }

    slab.final_length = length;
    slab.final_height = height;
    slab.square_feet = +(length * height / 144).toFixed(2);

    this.lot.cumulative_sqft = this.slabs.reduce(
      (sum, s) => sum + (s.square_feet || 0), 0
    );
  }

  saveSlabs() {
    const payload = {
      measurement_id: this.measurementId,
      details: this.slabs.map((s, i) => ({
        ...s,
        cumulative_sqft: this.slabs
          .slice(0, i + 1)
          .reduce((a, b) => a + b.square_feet, 0)
      }))
    };

    this.service.addMeasurementDetails(payload).subscribe();
  }
}
