import { Component } from '@angular/core';
import {
  IonContent, IonMenu, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonList, IonItem, IonAvatar,
  IonIcon, IonLabel, IonButton
} from '@ionic/angular/standalone';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    IonContent, IonMenu, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonList, IonItem, IonAvatar,
    IonIcon, IonLabel,
  ]
})
export class DashboardPage {

  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupMenuForDevice();
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


}
