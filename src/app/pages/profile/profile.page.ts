import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user = {
    fullName: 'Lavanya Kyla',
    email: 'lavanya.Kyla@example.com',
    phone: '+91 9876543210',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  };
}
