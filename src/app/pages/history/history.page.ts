import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MeasurementService } from 'src/app/core/services/measurement';
import { Router } from '@angular/router';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';
import { ModalController } from '@ionic/angular';
import { ShareHistoryModalComponent } from '../share-history-modal/share-history-modal.page';
import { MeasurementStore } from 'src/app/store/measurement.store';
import { ActivatedRoute } from '@angular/router';
import { LotCardComponent } from 'src/app/shared/lot-card/lot-card.component';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, GranitianHeaderPage, LotCardComponent]
})
export class HistoryPage implements OnInit {
  activeTab: string = 'all'
  measurements: any[] = [];
  historyList: any[] = [];
  mode = 'all';
  searchTerm = '';

  measurementTabs = [
    { label: 'Home', icon: 'home-outline', route: '/dashboard', showBack: true },
    { label: 'Measurement', icon: 'analytics-outline', route: '/assistant' },
    { label: 'History', icon: 'reader-outline', route: '/resources' },
    { label: 'Shared', icon: 'share-social-outline', route: '/profile' }
  ];


  onSearch(event: any) {
    this.searchTerm = event.detail.value?.toLowerCase() || '';
  }

  constructor(
    private measurementService: MeasurementService,
    private router: Router,
    private modalCtrl: ModalController,
    private store: MeasurementStore,
    private route: ActivatedRoute
  ) { }

  async openShareModal(measurement: any) {
    const modal = await this.modalCtrl.create({
      component: ShareHistoryModalComponent,
      componentProps: { measurement }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.shared) {
      measurement.isSharedByMe = true;
      measurement.isEditable = false;
      measurement.sharedWithUser = data.user.name;
    }
  }
  ionViewWillEnter() {
    this.loadHistory();
  }


  loadHistory() {

    this.historyList = [

      {
        measurement_id: 101,
        granite_color: 'Black Galaxy',
        quality_type: 'Premium',
        total_slabs: 3,
        total_net_sft: 220.45,
        isEditable: true
      },

      {
        measurement_id: 102,
        granite_color: 'White Pearl',
        quality_type: 'Standard',
        total_slabs: 2,
        total_net_sft: 180.20,
        isSharedByMe: true,
        sharedWithUser: 'Ramesh'
      },
      {
        measurement_id: 102,
        granite_color: 'White Pearl',
        quality_type: 'Standard',
        total_slabs: 2,
        total_net_sft: 180.20,
        isSharedByMe: true,
        sharedWithUser: 'Ramesh'
      },
      {
        measurement_id: 102,
        granite_color: 'White Pearl',
        quality_type: 'Standard',
        total_slabs: 2,
        total_net_sft: 180.20,
        isSharedByMe: true,
        sharedWithUser: 'Ramesh'
      },
      {
        measurement_id: 102,
        granite_color: 'White Pearl',
        quality_type: 'Standard',
        total_slabs: 2,
        total_net_sft: 180.20,
        isSharedByMe: true,
        sharedWithUser: 'Ramesh'
      },
      {
        measurement_id: 102,
        granite_color: 'White Pearl',
        quality_type: 'Standard',
        total_slabs: 2,
        total_net_sft: 180.20,
        isSharedByMe: true,
        sharedWithUser: 'Ramesh'
      },

      {
        measurement_id: 103,
        granite_color: 'Red Ruby',
        quality_type: 'Premium',
        total_slabs: 5,
        total_net_sft: 300.1,
        isSharedWithMe: true,
        sharedByUser: 'Anil'
      },
      {
        measurement_id: 103,
        granite_color: 'Red Ruby',
        quality_type: 'Premium',
        total_slabs: 5,
        total_net_sft: 300.1,
        isSharedWithMe: true,
        sharedByUser: 'Anil'
      },
      {
        measurement_id: 103,
        granite_color: 'Red Ruby',
        quality_type: 'Premium',
        total_slabs: 5,
        total_net_sft: 300.1,
        isSharedWithMe: true,
        sharedByUser: 'Anil'
      },
      {
        measurement_id: 103,
        granite_color: 'Red Ruby',
        quality_type: 'Premium',
        total_slabs: 5,
        total_net_sft: 300.1,
        isSharedWithMe: true,
        sharedByUser: 'Anil'
      },
      {
        measurement_id: 103,
        granite_color: 'Red Ruby',
        quality_type: 'Premium',
        total_slabs: 5,
        total_net_sft: 300.1,
        isSharedWithMe: true,
        sharedByUser: 'Anil'
      }

    ];

  }

  openMeasurement(item: any) {
    this.router.navigate(['/slabs'], {
      state: {
        measurement: item,
        isViewMode: !item.isEditable
      }
    });
  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.mode = params['mode'] || 'all';

      if (this.mode === 'shared') {
        this.activeTab = 'sharedByMe';
      }

    });
  }

  filteredHistory() {
    let data = this.historyList;
    if (this.mode === 'shared') {
      if (this.activeTab === 'sharedByMe') {
        data = data.filter(item => item.isSharedByMe);
      }
      if (this.activeTab === 'sharedWithMe') {
        data = data.filter(item => item.isSharedWithMe);
      }
    }
    if (this.searchTerm) {
      data = data.filter(item =>
        item.measurement_id.toString().includes(this.searchTerm)
      );
    }
    return data;
  }
}
