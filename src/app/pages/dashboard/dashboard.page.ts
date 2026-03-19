import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BottomTabsPage } from '../bottom-tabs/bottom-tabs.page';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';
import { CommonModule } from '@angular/common';

interface FeatureItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [IonicModule, BottomTabsPage, GranitianHeaderPage, CommonModule]
})
export class DashboardPage {

  features: FeatureItem[] = [
    {
      label: 'Measurement',
      icon: 'analytics-outline',
      route: '/home'
    },
    {
      label: 'Inventory',
      icon: 'cube-outline',
      route: '/inventory'
    },
    {
      label: 'Social Media',
      icon: 'people-outline',
      route: '/social'
    },
    {
      label: 'Request a deal',
      icon: 'call-outline',
      route: '/contact'
    }
  ];


  dashboardTabs: FeatureItem[] = [];

  constructor(private router: Router) {}

  ionViewWillEnter() {
    this.initializeDashboardTabs();
  }

  initializeDashboardTabs() {
    this.dashboardTabs = [...this.features]; 
  }

  navigate(route: string) {
    if (!route) {
      console.warn('Route not provided');
      return;
    }

    this.router.navigate([route]).catch(err => {
      console.error('Navigation error:', err);
    });
  }

  trackByFn(index: number, item: FeatureItem): string {
    return item.route;
  }
}