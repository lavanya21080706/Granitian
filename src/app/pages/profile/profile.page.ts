import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(private authService: AuthService) {}


  isEdit = false;
  user: any = {};


  ngOnInit() {
  this.loadProfile();
}
loadProfile() {
  this.authService.getProfile().subscribe({
    next: (res) => {
      console.log('👤 Profile data:', res);

      this.user = {
        firstName: res.first_name,
        lastName: res.last_name,
        email: res.email,
        phone: res.phone_number,
        location: res.location || 'Not set',
        role: res.user_type_name || 'User',
        avatar: res.user_photo || 'assets/default-avatar.png'
      };
    },
    error: (err) => {
      console.error('Failed to load profile', err);
    }
  });
}


toggleEdit() {
  this.isEdit = !this.isEdit;

  if (!this.isEdit) {
    const payload = {
      first_name: this.user.firstName,
      last_name: this.user.lastName,
      email: this.user.email,
      phone_number: this.user.phone,
      location: this.user.location,
      user_photo: this.user.avatar
    };

    console.log('📤 Updating profile:', payload);

    this.authService.updateProfile(payload).subscribe({
      next: () => {
        console.log('✅ Profile updated successfully');
      },
      error: (err) => {
        console.error('❌ Profile update failed', err);
      }
    });
  }
}

}
