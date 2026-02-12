import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BottomTabsPage } from '../bottom-tabs/bottom-tabs.page';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, HttpClientModule, BottomTabsPage, GranitianHeaderPage],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  recentData: any[] = [];
  hasAnyMarkings = false;
  totalHistory = 128;
  totalShared = 37;

  homeTabs = [
    { label: 'Home', icon: 'home-outline', route: '/dashboard', showBack: true },
    { label: 'Measurement', icon: 'analytics-outline', route: '/assistant' },
    { label: 'History', icon: 'reader-outline', route: '/history' },
    { label: 'Shared', icon: 'share-social-outline', route: '/profile' }
  ];


  constructor(private router: Router, private http: HttpClient) { }
  ionViewWillEnter() {
    this.loadRecentData();
  }


  ngOnInit() {
    this.loadRecentData();
  }


  loadRecentData() {
    this.http.get<any>('https://x2f6r9dz0i.execute-api.ap-south-1.amazonaws.com/prd/measurements')
      .subscribe({
        next: (res) => {
          console.log('📦 Measurements API response:', res);

          const data = res.measurements;

          if (!data || data.length === 0) {
            this.hasAnyMarkings = false;
            return;
          }
           if (!data.length) {
          this.hasAnyMarkings = false;
          this.totalHistory = 0;
          return;
        }
               // Total count
        this.totalHistory = data.length;

          const sorted = data.sort((a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

          this.recentData = sorted.slice(0, 5).map((item: any) => ({
            id: item.measurement_id,
            // name: `${item.factory_name} - ${item.granite_color}`,
            name: `${item.customer_name} - ${item.granite_color}`,

            date: new Date(item.created_at).toLocaleDateString()
          }));

          this.hasAnyMarkings = true;
        },
        error: (err) => {
          console.error('Failed to load measurements', err);
          this.hasAnyMarkings = false;
          this.totalHistory = 0;
        }
      });
  }

  goToCreateSheet() {
    this.router.navigate(['/measurement']);
  }

   openMeasurement(measurementId: number) {
  this.router.navigate(['/slabs', measurementId], {
    queryParams: { view: true }
  });
}
}
