import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MeasurementService } from 'src/app/services/measurement';
import { Router } from '@angular/router';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';
import { BottomTabsPage } from '../bottom-tabs/bottom-tabs.page';
import { ModalController } from '@ionic/angular';
import { ShareHistoryModalComponent } from '../share-history-modal/share-history-modal.page';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, GranitianHeaderPage, BottomTabsPage]
})
export class HistoryPage implements OnInit {
  activeTab: string = 'all'
  measurements: any[] = [];
  historyList: any[] = [];


  measurementTabs = [
    { label: 'Home', icon: 'home-outline', route: '/dashboard', showBack: true },
    { label: 'Measurement', icon: 'analytics-outline', route: '/assistant' },
    { label: 'History', icon: 'reader-outline', route: '/resources' },
    { label: 'Shared', icon: 'share-social-outline', route: '/profile' }
  ];


  constructor(
    private measurementService: MeasurementService,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  // ngOnInit() {
  //   this.measurementService.getMeasurements().subscribe((res: any) => {
  //     this.measurements = res.measurements || [];
  //   });
  // }


  // openMeasurement(measurementId: number) {
  //   this.router.navigate(['/slabs', measurementId], {
  //     queryParams: { view: true }
  //   });
  // }

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
    this.measurementService.getMeasurements().subscribe((res: any) => {
      this.measurements = res.measurements || [];
    });
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
    this.loadMockHistory();
  }

  loadMockHistory() {
    this.historyList = [
      {
        measurement_id: 101,
        granite_color: 'Black Galaxy',
        quality_type: 'Premium',
        total_slabs: 3,
        total_net_sft: 220.45,
        isSharedByMe: false,
        isSharedWithMe: false,
        isEditable: true
      },
      {
        measurement_id: 102,
        granite_color: 'White Pearl',
        quality_type: 'Standard',
        total_slabs: 2,
        total_net_sft: 180.20,
        isSharedByMe: true,
        isEditable: false
      },
      {
        measurement_id: 103,
        granite_color: 'Red Ruby',
        quality_type: 'Premium',
        total_slabs: 5,
        total_net_sft: 300.10,
        isSharedWithMe: true,
        isEditable: false
      }
    ];
  }

  filteredHistory() {
    if (this.activeTab === 'sharedByMe') {
      return this.historyList.filter(h => h.isSharedByMe);
    }

    if (this.activeTab === 'sharedWithMe') {
      return this.historyList.filter(h => h.isSharedWithMe);
    }

    return this.historyList;
  }



}
