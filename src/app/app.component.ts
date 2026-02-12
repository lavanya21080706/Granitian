import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@capacitor/status-bar';


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
  IonMenuToggle,
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
    IonMenuToggle,
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

    this.platform.ready().then(async () => {
      await StatusBar.hide(); // 🔥 hides status bar
    });
    this.platform.ready().then(() => {
      document.body.classList.remove('dark');
    });
  }


  async onSignOut() {
    localStorage.clear();
    sessionStorage.clear();

    await this.menuCtrl.close('mainMenu');   // 👈 CLOSE FIRST
    await this.router.navigateByUrl('/welcome', { replaceUrl: true }); // 👈 THEN NAVIGATE
  }


  // async onSignOut() {
  //   localStorage.clear();
  //   sessionStorage.clear();

  //   await this.router.navigateByUrl('/welcome', { replaceUrl: true });
  //   await this.menuCtrl.close('mainMenu');
  //   setTimeout(() => {
  //     this.menuCtrl.close('mainMenu');
  //   }, 50);

  // }


  async closeMenu() {
    await this.menuCtrl.close('mainMenu');
    setTimeout(() => {
      this.menuCtrl.close('mainMenu');
    }, 50);
  }
  // closeMenu() {
  //   this.menuCtrl.close('mainMenu');
  // }

  async goToProfile() {
    await this.router.navigate(['/profile']);
    if (this.isMobile) {
      await this.menuCtrl.close('mainMenu');
    }
  }

}
