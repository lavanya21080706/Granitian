import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MeasurementService } from 'src/app/services/measurement';
import { Router } from '@angular/router';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';
import { BottomTabsPage } from '../bottom-tabs/bottom-tabs.page';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, GranitianHeaderPage, BottomTabsPage]
})
export class HistoryPage implements OnInit {
  measurements: any[] = [];


  measurementTabs = [
    { label: 'Home', icon: 'home-outline', route: '/dashboard', showBack: true },
    { label: 'Measurement', icon: 'analytics-outline', route: '/assistant' },
    { label: 'History', icon: 'reader-outline', route: '/resources' },
    { label: 'Shared', icon: 'share-social-outline', route: '/profile' }
  ];


  constructor(
    private measurementService: MeasurementService,
    private router: Router
  ) { }

  ngOnInit() {
    this.measurementService.getMeasurements().subscribe((res: any) => {
      this.measurements = res.measurements || [];
    });
  }


  openMeasurement(measurementId: number) {
  this.router.navigate(['/slabs', measurementId], {
    queryParams: { view: true }
  });
}
  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory() {
    this.measurementService.getMeasurements().subscribe((res: any) => {
      this.measurements = res.measurements || [];
    });
  }

}
