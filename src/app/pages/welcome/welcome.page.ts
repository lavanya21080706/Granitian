import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg,IonText,IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonContent, IonImg, IonText,IonButton,CommonModule, FormsModule]
})
export class WelcomePage implements OnInit {

   constructor(private router: Router) {}

  ngOnInit() {
  }

   openLogin() {
    this.router.navigate(['/login']);
  }

  openSignup() {
    this.router.navigate(['/login'], {
      queryParams: { mode: 'signup' },
    });
  }

}
