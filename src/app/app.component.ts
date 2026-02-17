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
     this.isMobile = this.platform.is('hybrid');
  }


  async onSignOut() {
    localStorage.clear();
    sessionStorage.clear();

    await this.menuCtrl.close('mainMenu');   
    await this.router.navigateByUrl('/welcome', { replaceUrl: true });
  }

  async closeMenu() {
    await this.menuCtrl.close('mainMenu');
    setTimeout(() => {
      this.menuCtrl.close('mainMenu');
    }, 50);
  }

  async goToProfile() {
    await this.router.navigate(['/profile']);
    if (this.isMobile) {
      await this.menuCtrl.close('mainMenu');
    }
  }

}
