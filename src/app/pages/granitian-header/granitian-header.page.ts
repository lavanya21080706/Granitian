import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-granitian-header',
  templateUrl: './granitian-header.page.html',
  styleUrls: ['./granitian-header.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle]
})
export class GranitianHeaderPage implements OnInit {

  navLinks = [
    { label: 'Measurement', route: '/measurement' },
    { label: 'Inventory', route: '/inventory' },
    { label: 'Social Media', route: '/social' },
    { label: 'Request a deal', route: '/request' },
  ];

  constructor(){}

  ngOnInit(): void {
      
  }

}
