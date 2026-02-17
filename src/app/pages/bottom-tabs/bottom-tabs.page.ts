import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.page.html',
  styleUrls: ['./bottom-tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class BottomTabsPage implements OnInit {


  @Input() tabs: any[] = [];
  @Input() activeRoute: string = '';
  @Input() showAddButton: boolean = false;

  @Output() addAction = new EventEmitter<void>();

  constructor(private router: Router) { }

  navigate(tab: any) {
    if (tab.route) {
      this.router.navigate([tab.route]);
    }
  }

  get leftTabs() {
    return this.tabs.slice(0, 2);
  }

  goToMeasurement() {
    this.router.navigate(['/measurement']);
  }

  get rightTabs() {
    return this.tabs.slice(2);
  }
  ngOnInit() {
  }


}



