import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MeasurementService } from 'src/app/services/measurement';
import { Router, ActivatedRoute } from '@angular/router';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';
import { BottomTabsPage } from '../bottom-tabs/bottom-tabs.page';


@Component({
  standalone: true,
  selector: 'app-measurement',
  templateUrl: './measurement.page.html',
  styleUrls: ['./measurement.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    GranitianHeaderPage,
    BottomTabsPage,
    IonicModule
  ]
})

export class MeasurementPage {

  measurementId!: number;
  isLotLocked = false;
  isViewMode = false;
  isEditMode = false;

  lot = {
    customer_name: '',
    granite_color: '',
    quality_type: '',
    measurement_type: 'Flat',

    allowance_length_in: null as number | null,
    allowance_height_in: null as number | null,

    thickness: null as number | null,
    location: '',
    notes: '',

    original_area_sqft: 0,
    original_area_sqm: 0,
    net_area_sqft: 0,
    net_area_sqm: 0
  };



  constructor(
    private service: MeasurementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  allLocations: string[] = [
    'Chennai',
    'Bangalore',
    'Hyderabad',
    'Mumbai',
    'Delhi',
    'Jaipur',
    'Mysore',
    'Coimbatore'
  ];

  filteredLocations: string[] = [];

  filterLocations(event: any) {
    const value = event.target.value?.toLowerCase() || '';

    if (!value) {
      this.filteredLocations = [];
      return;
    }

    this.filteredLocations = this.allLocations.filter(loc =>
      loc.toLowerCase().includes(value)
    );
  }

  sqftToSqm(sqft: number) {
    return +(sqft * 0.092903).toFixed(2);
  }


  selectLocation(location: string) {
    this.lot.location = location;
    this.filteredLocations = [];
  }


  measurementTabs = [
    { label: 'Home', icon: 'home-outline', route: '/dashboard', showBack: true },
    { label: 'Measurement', icon: 'analytics-outline', route: '/assistant' },
    { label: 'History', icon: 'reader-outline', route: '/resources' },
    { label: 'Shared', icon: 'share-social-outline', route: '/profile' }
  ];

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');

    if (id) {
      this.measurementId = +id;
      this.isEditMode = true;
      this.loadMeasurementById();
    }
  });
}


  loadMeasurementById() {
    this.service.getMeasurementById(this.measurementId)
      .subscribe((res: any) => {
        this.lot = {
          customer_name: res.customer_name,
          granite_color: res.granite_color,
          quality_type: res.quality_type,
          thickness: res.thickness,
          location: res.location,
          measurement_type: res.measurement_type,
          allowance_length_in: res.allowance_length_in,
          allowance_height_in: res.allowance_height_in,
          notes: res.notes,

          original_area_sqft: res.original_area_sqft || 0,
          original_area_sqm: res.original_area_sqm || 0,
          net_area_sqft: res.net_area_sqft || 0,
          net_area_sqm: res.net_area_sqm || 0
        };
      });
  }



  inchesToMm(inches: number | null) {
    return inches ? +(inches * 25.4).toFixed(2) : 0;
  }

  inchesToCm(inches: number | null) {
    return inches ? +(inches * 2.54).toFixed(2) : 0;
  }

  loadMeasurementForView(id: number) {
    this.service.getMeasurementById(id).subscribe((res: any) => {
      console.log('📥 LOAD LOT RESPONSE:', res);

      this.measurementId = res.measurement_id;

      this.lot = {
        customer_name: res.customer_name || '',
        granite_color: res.granite_color || '',
        quality_type: res.quality_type || '',
        measurement_type: res.measurement_type || 'Flat',

        allowance_length_in: res.allowance_length_in ?? null,
        allowance_height_in: res.allowance_height_in ?? null,

        thickness: res.thickness ?? null,
        location: res.location || '',
        notes: res.notes || '',

        original_area_sqft: res.original_area_sqft || 0,
        original_area_sqm: res.original_area_sqm || 0,
        net_area_sqft: res.net_area_sqft || 0,
        net_area_sqm: res.net_area_sqm || 0
      };

      this.isLotLocked = true;
    });
  }

  createLot() {
    const payload = {
      customer_name: this.lot.customer_name,
      granite_color: this.lot.granite_color,
      quality_type: this.lot.quality_type,
      measurement_type: this.lot.measurement_type,

      thickness: this.lot.thickness,
      location: this.lot.location,
      notes: this.lot.notes || '',


      allowance_length_in: this.lot.allowance_length_in,
      allowance_length_mm: this.inchesToMm(this.lot.allowance_length_in),
      allowance_length_cm: this.inchesToCm(this.lot.allowance_length_in),

      allowance_height_in: this.lot.allowance_height_in,
      allowance_height_mm: this.inchesToMm(this.lot.allowance_height_in),
      allowance_height_cm: this.inchesToCm(this.lot.allowance_height_in),

      original_area_sqft: this.lot.original_area_sqft,
      original_area_sqm: this.sqftToSqm(this.lot.original_area_sqft),

      net_area_sqft: this.lot.net_area_sqft,
      net_area_sqm: this.sqftToSqm(this.lot.net_area_sqft)
    };

    console.log('📤 CREATE LOT REQUEST:', payload);

    this.service.createMeasurement(payload).subscribe({
      next: (res: any) => {
        console.log('✅ CREATE LOT SUCCESS:', res);

        this.measurementId = res.measurement_id;
        this.isLotLocked = true;
        this.router.navigate(['/slabs'], {
          queryParams: { id: this.measurementId },
          replaceUrl: true
        });
      },
      error: err => {
        console.error('❌ CREATE LOT ERROR:', err);
      }
    });
  }

  updateLot() {
    const payload = {
      customer_name: this.lot.customer_name,
      granite_color: this.lot.granite_color,
      quality_type: this.lot.quality_type,
      measurement_type: this.lot.measurement_type,

      thickness: this.lot.thickness,
      location: this.lot.location,
      notes: this.lot.notes || '',


      allowance_length_in: this.lot.allowance_length_in,
      allowance_length_mm: this.inchesToMm(this.lot.allowance_length_in),
      allowance_length_cm: this.inchesToCm(this.lot.allowance_length_in),

      allowance_height_in: this.lot.allowance_height_in,
      allowance_height_mm: this.inchesToMm(this.lot.allowance_height_in),
      allowance_height_cm: this.inchesToCm(this.lot.allowance_height_in),

      original_area_sqft: this.lot.original_area_sqft,
      original_area_sqm: this.sqftToSqm(this.lot.original_area_sqft),

      net_area_sqft: this.lot.net_area_sqft,
      net_area_sqm: this.sqftToSqm(this.lot.net_area_sqft)
    };
  
  this.service.updateMeasurement(this.measurementId, payload).subscribe({
    next: (res) => {
      console.log('✅ UPDATE LOT SUCCESS:', res);

      this.router.navigate(['/slabs'], {
        queryParams: { id: this.measurementId },
        replaceUrl: true
      });
    },
    error: err => console.error('❌ UPDATE LOT ERROR:', err)
  });
}
}
