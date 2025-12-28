import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';


import {
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonInputPasswordToggle
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonInput,
    IonLabel,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonInputPasswordToggle,
    HttpClientModule,
  ]
})
export class LoginPage implements OnInit {

  otpMode: boolean = false;
  otpSent: boolean = false;
  signupMode = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showLoginPassword: boolean = false;

  errors = {
    userType: '',
    firstName: '',
    lastName: '',
    firmName: '',
    email: '',
    mobile: '',
    location: '',
    password: '',
    confirmPassword: ''
  };

  loginErrors = {
    email: '',
    password: ''
  };

  loginData = {
    email: '',
    password: ''
  };


  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { }


  userType: string | null = null;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    location: '',
    firmName: '',
    password: '',
    confirmPassword: '',
  };

  isGroupA(): boolean {
    return this.userType === 'marker' || this.userType === 'supervisor';
  }

  isGroupB(): boolean {
    return (
      this.userType === 'factory_owner' ||
      this.userType === 'trader' ||
      this.userType === 'retailer'
    );
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  private validateMobile(mobile: string): boolean {
    // Assuming 10 digits for Indian mobile
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];

      if (mode === 'signup') {
        this.enableSignupMode();
      } else {
        this.backToLogin();
      }
    });
  }

  getUserTypeId(): number {
    switch (this.userType) {
      case 'marker': return 1;
      case 'supervisor': return 2;
      case 'factory_owner': return 3;
      case 'retailer': return 4;
      case 'trader': return 5;
      default: return 0;
    }
  }

  register() {
    // Reset errors
    this.errors = {
      userType: '',
      firstName: '',
      lastName: '',
      firmName: '',
      email: '',
      mobile: '',
      location: '',
      password: '',
      confirmPassword: ''
    };

    let hasError = false;

    // Validate userType
    if (!this.userType) {
      this.errors.userType = 'Please select a user type';
      hasError = true;
    }

    // Validate firstName
    if (!this.formData.firstName.trim()) {
      this.errors.firstName = 'Please enter your first name';
      hasError = true;
    }

    // Validate lastName
    if (!this.formData.lastName.trim()) {
      this.errors.lastName = 'Please enter your last name';
      hasError = true;
    }

    // Validate firmName if required
    if (this.isGroupB() && !this.formData.firmName.trim()) {
      this.errors.firmName = 'Please enter your firm name';
      hasError = true;
    }

    // Validate email
    if (!this.formData.email.trim()) {
      this.errors.email = 'Please enter your email';
      hasError = true;
    } else if (!this.validateEmail(this.formData.email)) {
      this.errors.email = 'Please enter a valid email address';
      hasError = true;
    }

    // Validate mobile
    if (!this.formData.mobile.trim()) {
      this.errors.mobile = 'Please enter your mobile number';
      hasError = true;
    } else if (!this.validateMobile(this.formData.mobile)) {
      this.errors.mobile = 'Please enter a valid 10-digit mobile number';
      hasError = true;
    }

    if (this.isGroupB() && !this.formData.location.trim()) {
      this.errors.location = 'Please enter your location';
      hasError = true;
    }

    // Validate password
    if (!this.formData.password) {
      this.errors.password = 'Please enter a password';
      hasError = true;
    } else if (!this.validatePassword(this.formData.password)) {
      this.errors.password = 'Password must be at least 8 characters with one uppercase, one lowercase, and one number';
      hasError = true;
    }

    if (!this.formData.confirmPassword) {
      this.errors.confirmPassword = 'Please confirm your password';
      hasError = true;
    } else if (this.formData.password !== this.formData.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const payload = {
      first_name: this.formData.firstName,
      last_name: this.formData.lastName,
      email: this.formData.email,
      phone: this.formData.mobile,
      countryCode: '+91',
      password: this.formData.password,
      confirm_password: this.formData.confirmPassword,
      user_type_id: this.getUserTypeId(),
      is_parent: false,
      is_child: false
    };

    this.authService.signup(payload).subscribe({
      next: (res: any) => {
        this.showToast('Registration successful');
        this.signupMode = false;
      },
      error: (err: any) => {
        this.showToast(err?.error?.message || 'Signup failed');
      }

    });

  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleLoginPasswordVisibility() {
    this.showLoginPassword = !this.showLoginPassword;
  }


  onMobileInput(event: any) {
    const input = event.target.value;

    // Allow only numbers
    this.formData.mobile = input.replace(/[^0-9]/g, '');

    // Clear error while typing
    if (this.formData.mobile.length === 0) {
      this.errors.mobile = '';
      return;
    }

    if (this.formData.mobile.length < 10) {
      this.errors.mobile = 'Mobile number must be 10 digits';
    } else {
      this.errors.mobile = '';
    }
  }

  onMobileBlur() {
    if (!this.formData.mobile) {
      this.errors.mobile = 'Please enter your mobile number';
    } else if (!this.validateMobile(this.formData.mobile)) {
      this.errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
  }

  goToDashboard() {
    console.log("hi")
    // Reset errors
    this.loginErrors = {
      email: '',
      password: ''
    };

    let hasError = false;


    // Validate email
    if (!this.loginData.email.trim()) {
      this.loginErrors.email = 'Please enter your email';
      hasError = true;
    } else if (!this.validateEmail(this.loginData.email)) {
      this.loginErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (!this.loginData.password.trim()) {
      this.loginErrors.password = 'Please enter your password';
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const payload = {
      email: this.loginData.email,
      password: this.loginData.password
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        this.showToast('Login successful');
        localStorage.setItem('authToken', res.token); 
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.showToast(err?.error?.message || 'Login failed');
      }
    });
  }


  enableOtpMode() {
    this.otpMode = true;
    this.otpSent = false;
  }

  sendOtp() {
    // (Later: add API call)
    this.otpSent = true;
  }

  submitOtp() {
    this.router.navigate(['/dashboard']);
  }


  enableSignupMode() {
    this.signupMode = true;
    this.otpMode = false;
  }

  backToLogin() {
    this.signupMode = false;
    this.otpMode = false;
    this.otpSent = false;
  }

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otpBoxes = Array(6).fill(0);

  // Move to next box when typing
  moveNext(event: any, index: number) {
    const value = event.target.value;

    if (value && index < this.otpBoxes.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  // Move to previous box on backspace
  movePrev(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && index > 0) {
      const current = this.otpInputs.toArray()[index].nativeElement;

      if (current.value === '') {
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      }
    }
  }


}

