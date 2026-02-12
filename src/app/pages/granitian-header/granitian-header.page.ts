import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-granitian-header',
  templateUrl: './granitian-header.page.html',
  styleUrls: ['./granitian-header.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class GranitianHeaderPage implements OnInit {
  // isDesktop = false;

  navLinks = [
    { label: 'Measurement', route: '/measurement' },
    { label: 'Inventory', route: '/inventory' },
    { label: 'Social Media', route: '/social' },
    { label: 'Request a deal', route: '/request' },
  ];

  constructor(){}

  ngOnInit(): void {
      
  }

  // constructor() {
  //   this.checkScreen();
  //   window.addEventListener('resize', () => this.checkScreen());
  // }

  // checkScreen() {
  //   this.isDesktop = window.innerWidth >= 1024;
  // }
    // ngOnInit() {
    //   this.checkScreen();
    // }


}
