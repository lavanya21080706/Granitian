import { Component, HostListener, OnInit } from '@angular/core';
import { IonicModule, MenuController, Platform} from '@ionic/angular';
import { Router } from '@angular/router';
import { BottomTabsPage } from '../bottom-tabs/bottom-tabs.page';
import { GranitianHeaderPage } from '../granitian-header/granitian-header.page';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    IonicModule, BottomTabsPage, GranitianHeaderPage]
})
export class DashboardPage implements OnInit {
  isDesktop = false;
  dashboardTabs: any[] = [];

  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkScreenSize();
    this.initializeDashboardTabs();
    this.setupMenuForDevice();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth > 768;
  }

  initializeDashboardTabs() {
    this.dashboardTabs = [
      { label: 'Measurements', icon: 'analytics-outline', route: '/assistant' },
      { label: 'Inventory', icon: 'cube-outline', route: '/inventory' },
      { label: 'Social media', icon: 'people-outline', route: '/social' },
      { label: 'Request a deal', icon: 'call-outline', route: '/contact' }
    ];
  }

  setupMenuForDevice() {
    if (this.platform.is('desktop') || this.platform.is('tablet')) {
      this.menuCtrl.open('mainMenu');
    } else {
      this.menuCtrl.close();
    }
  }

  openSlabDashboard() {
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    // Toggle sidebar on desktop
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.toggle();
    }
  }
}
