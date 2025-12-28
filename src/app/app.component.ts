import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import {
  IonApp,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonAvatar,
  IonButton,
  IonRouterOutlet
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonApp,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonAvatar,
    IonRouterOutlet,
    IonButton,
    HttpClientModule
  ],
})
export class AppComponent {
  isMobile = false;

  constructor(
    private menuCtrl: MenuController,
    private platform: Platform,
    private router: Router       
  ) {
    this.isMobile =
      this.platform.is('mobile') ||
      this.platform.is('android') ||
      this.platform.is('ios');
  }

  async onMenuClick() {
    await this.menuCtrl.close('mainMenu');
  }

  async onSignOut() {
    localStorage.clear();
    sessionStorage.clear();

    await this.router.navigateByUrl('/welcome', { replaceUrl: true });

    if (this.isMobile) {
      await this.menuCtrl.close('mainMenu');
    }

  }
  closeMenu() {
    this.menuCtrl.close('mainMenu');
  }

  async goToProfile() {
    await this.router.navigate(['/profile']);
    if (this.isMobile) {
      await this.menuCtrl.close('mainMenu');
    }
  }

}
