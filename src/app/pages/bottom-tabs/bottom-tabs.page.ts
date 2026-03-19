import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

interface tabs {
  label: string;
  icon: string;
  route: string;
  mode?: string;
  showBack?: boolean;
}

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.page.html',
  styleUrls: ['./bottom-tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})


export class BottomTabsPage implements OnInit {
  @Input() tabs: tabs[] = [];
  @Input() activeRoute: string = '';
  @Input() showAddButton: boolean = false;
  @Input() showDivider: boolean = true;
  @Output() addAction = new EventEmitter<void>();

  constructor(private router: Router) { }

  navigate(tab: any) {

    if (!tab.route) return;
    if (tab.mode) {
      this.router.navigate([tab.route], {
        queryParams: { mode: tab.mode }
      });
    } else {
      this.router.navigate([tab.route]);
    }

  }

  get leftTabs() {
    return this.tabs.slice(0, 2);
  }

  goToMeasurement() {
    this.router.navigate(['/home']);
  }

  get rightTabs() {
    return this.tabs.slice(2);
  }

  ngOnInit() {
  }


}



