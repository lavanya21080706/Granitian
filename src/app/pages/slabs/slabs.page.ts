import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';
import { BottomTabsPage } from '../bottom-tabs/bottom-tabs.page';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SlabFormPage } from '../slab-form/slab-form.page';
import { Router, ActivatedRoute } from '@angular/router';
import { MeasurementService } from 'src/app/services/measurement';



@Component({
  standalone: true,
  selector: 'app-slabs',
  templateUrl: './slabs.page.html',
  styleUrls: ['./slabs.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    GranitianHeaderPage, IonicModule,
    BottomTabsPage
  ]
})
export class SlabsPage {
  measurementId!: number;
  lot: any = {};


  constructor(
    private modalCtrl: ModalController,
    private service: MeasurementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  isLotLocked = false;
  isViewMode = false;

ionViewWillEnter() {
  this.route.paramMap.subscribe(params => {
    const routeId = params.get('id');
    this.route.queryParamMap.subscribe(qp => {
      const queryId = qp.get('id');

      this.isViewMode = qp.get('view') === 'true';
      const finalId = routeId || queryId;

      console.log('Route ID:', routeId);
      console.log('Query ID:', queryId);
      console.log('Final ID:', finalId);

      if (finalId) {
        this.measurementId = +finalId;
        this.loadLot();
      }
    });
  });

}


ngOnInit() {
  console.log('SlabsPage initialized');
}


  loadSlabsFromResponse(details: any[]) {
    this.slabs = details.map(d => {

      const originalSft = +(d.raw_length_in * d.raw_height_in / 144).toFixed(3);

      const netSft = d.net_area_sqft
        ? d.net_area_sqft
        : originalSft;

      return {
        detail_id: d.detail_id,
        rawLength: d.raw_length_in,
        rawWidth: d.raw_height_in,
        lengthAfter: d.final_height_in,
        widthAfter: d.final_length_in,
        originalSft,
        netSft,
        notes: d.notes || '',
        photo: d.slab_photo_url || null,
        showRawInfo: false
      };

    });
    console.log('lavanya FROM API:', details);

    this.updateTotals();
  }

  loadLot() {
      this.slabs = [];
    this.service.getMeasurementById(this.measurementId).subscribe((res: any) => {
      console.log('📥 LOT DATA:', res);

      // LOT DATA
      this.lot = {
        customer_name: res.customer_name,
        granite_color: res.granite_color,
        quality_type: res.quality_type,
        thickness: res.thickness,
        location: res.location,
        measurement_type: res.measurement_type,
        allowance_length_in: res.allowance_length_in,
        allowance_height_in: res.allowance_height_in
      };

      if (res.details && res.details.length) {
        this.loadSlabsFromResponse(res.details);
      }
    });
  }

  currentSlab: any = {
    rawLength: null,
    rawWidth: null,
    lengthAfter: null,
    widthAfter: null,
    notes: '',
    allowanceSft: 0,
    fullSft: 0
  };

  slabs: any[] = [];

  slabTabs = [
    { label: 'Home', icon: 'home-outline', route: '/dashboard', showBack: true },
    { label: 'Measurement', icon: 'analytics-outline', route: '/assistant' },
    { label: 'History', icon: 'reader-outline', route: '/resources' },
    { label: 'Shared', icon: 'share-social-outline', route: '/profile' }
  ];

  async openAddSlabModal() {
    const modal = await this.modalCtrl.create({
      component: SlabFormPage,
      componentProps: {
        slab: {
          rawLength: null,
          rawWidth: null,
          notes: '',
          lengthAfter: null,
          widthAfter: null,
          allowanceSft: 0,
          fullSft: 0
        },
        lot: this.lot,
        isEdit: false
      },
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.9
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.slabs.push(data);
      this.updateTotals();
    }
  }


  calculateSlabAreas(rawL: number, rawW: number) {
    const AL = this.lot.allowance_length_in || 0;
    const AW = this.lot.allowance_height_in || 0;

    const originalSft = +(rawL * rawW / 144).toFixed(3);

    let finalL = rawL - AL;
    let finalW = rawW - AW;

    if (this.lot.measurement_type === '3-Multiple') {
      finalL = Math.floor(finalL / 3) * 3;
      finalW = Math.floor(finalW / 3) * 3;
    }

    finalL = Math.max(0, finalL);
    finalW = Math.max(0, finalW);

    const netSft = +(finalL * finalW / 144).toFixed(3);

    return { finalL, finalW, originalSft, netSft };
  }

  inchesToMm(inches: number) {
    return +(inches * 25.4).toFixed(3);
  }

  inchesToCm(inches: number) {
    return +(inches * 2.54).toFixed(3);
  }


  calculateCurrent() {
    const L = Number(this.currentSlab.rawLength) || 0;
    const W = Number(this.currentSlab.rawWidth) || 0;

    let finalL = L - this.lot.allowance_length_in;
    let finalW = W - this.lot.allowance_height_in;

    if (this.lot.measurement_type === '3-Multiple') {
      finalL = Math.floor(finalL / 3) * 3;
      finalW = Math.floor(finalW / 3) * 3;
    }

    finalL = Math.max(finalL, 0);
    finalW = Math.max(finalW, 0);

    this.currentSlab.lengthAfter = finalL;
    this.currentSlab.widthAfter = finalW;

    const full = (finalL * finalW) / 144;
    const raw = (L * W) / 144;

    this.currentSlab.fullSft = +full.toFixed(3);
    this.currentSlab.allowanceSft = +(raw - full).toFixed(3);
  }


  addSlab() {
    if (!this.currentSlab.rawLength || !this.currentSlab.rawWidth) return;

    this.slabs.push({ ...this.currentSlab });
    this.updateTotals();

    this.resetCurrentSlab();
  }


  copyLastSlab() {
    if (!this.slabs.length) return;

    const last = this.slabs[this.slabs.length - 1];

    this.currentSlab = {
      rawLength: last.rawLength,
      rawWidth: last.rawWidth,
      lengthAfter: null,
      widthAfter: null,
      notes: last.notes,
      allowanceSft: 0,
      fullSft: 0
    };
  }

  editLot() {
    this.router.navigate(
      ['/measurement', this.measurementId],
      { queryParams: { edit: true } }
    );
  }



  async editSlab(index: number) {
    const modal = await this.modalCtrl.create({
      component: SlabFormPage,
      componentProps: {
        slab: { ...this.slabs[index] },
        lot: this.lot,
        isEdit: true
      },
      breakpoints: [0, 0.65],
      initialBreakpoint: 0.65
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.slabs[index] = data;
      this.updateTotals();
    }
  }

  totals = { original: 0, net: 0 };

  updateTotals() {
    this.totals.original = this.slabs.reduce((sum, s) => sum + (s.originalSft || 0), 0);
    this.totals.net = this.slabs.reduce((sum, s) => sum + (s.netSft || 0), 0);
  }

  deleteSlab(index: number) {
    const slab = this.slabs[index];
    this.totals.original -= slab.originalSft;
    this.slabs.splice(index, 1);
  }

  addPhoto() {
    console.log('Open camera or gallery here');
  }

  resetCurrentSlab() {
    this.currentSlab = {
      rawLength: null,
      rawWidth: null,
      lengthAfter: null,
      widthAfter: null,
      notes: '',
      allowanceSft: 0,
      fullSft: 0
    };
  }

  saveSlab() {
    if (!this.currentSlab.rawLength || !this.currentSlab.rawWidth) return;

    const rawL = this.currentSlab.rawLength;
    const rawW = this.currentSlab.rawWidth;

    const { finalL, finalW, originalSft, netSft } =
      this.calculateSlabAreas(rawL, rawW);

    const newSlab = {
      rawLength: rawL,
      rawWidth: rawW,
      lengthAfter: finalL,
      widthAfter: finalW,
      originalSft,
      netSft,
      notes: this.currentSlab.notes,
      photo: this.currentSlab.photo || null,
      showRawInfo: false
    };

    this.slabs.push(newSlab);
    this.updateTotals();
    this.resetCurrentSlab();
  }

  enableLotEdit() {
    this.isLotLocked = false;
  }


  saveLot() {
    if (!this.slabs.length) {
      console.log('No slabs to save');
      return;
    }

    let cumulative = 0;

    const details = this.slabs.map((slab, index) => {
      cumulative += slab.netSft;

      return {
        detail_id: slab.detail_id || null,

        raw_length_in: slab.rawLength,
        raw_length_mm: +(slab.rawLength * 25.4).toFixed(3),
        raw_length_cm: +(slab.rawLength * 2.54).toFixed(3),

        raw_height_in: slab.rawWidth,
        raw_height_mm: +(slab.rawWidth * 25.4).toFixed(3),
        raw_height_cm: +(slab.rawWidth * 2.54).toFixed(3),
        final_height_in: slab.lengthAfter,
        final_height_mm: +(slab.lengthAfter * 25.4).toFixed(3),
        final_height_cm: +(slab.lengthAfter * 2.54).toFixed(3),

        final_length_in: slab.widthAfter,
        final_length_mm: +(slab.widthAfter * 25.4).toFixed(3),
        final_length_cm: +(slab.widthAfter * 2.54).toFixed(3),

        net_area_sqft: slab.netSft,
        original_area_sqft: slab.originalSft,

        cumulative_sqft: +cumulative.toFixed(3),

        slab_photo_url: slab.photo || null,
        file_verification_status_id: 1,
        notes: slab.notes || ''
      };
    });

    const payload = {
      measurement_id: this.measurementId,
      details
    };

    console.log('📤 SAVING SLABS:', payload);

    this.service.addMeasurementDetails(payload).subscribe({
      next: (res: any) => {
        console.log('✅ SLABS SAVED:', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('❌ SAVE FAILED:', err);
      }
    });
  }
}
