import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  isEdit = false;

  user = {
    firstName: 'Lavanya',
    lastName: 'Gidda',
    role: 'Senior Graphic Designer',
    email: 'lavanya072@example.com',
    phone: '+91 9876543210',
    location: 'Hyderabad, India',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  toggleEdit() {
    this.isEdit = !this.isEdit;

    if (!this.isEdit) {
      // 🔥 SAVE PROFILE HERE (API CALL)
      console.log('Profile saved', this.user);
    }
  }
}
