import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import {CommonModule } from '@angular/common';

@Component({
  selector: 'app-lot-card',
  templateUrl: './lot-card.component.html',
  styleUrls: ['./lot-card.component.scss'],
  standalone: true,
  imports: [IonIcon , CommonModule]
})
export class LotCardComponent implements OnInit {

  @Input() item: any;
  @Input() showStatus = false;
  @Input() showActions = false;

  @Output() share = new EventEmitter<any>();
  @Output() open = new EventEmitter<any>();

  openShareModal() {
    this.share.emit(this.item);
  }

  openMeasurement() {
    this.open.emit(this.item);
  }
  constructor() { }

  ngOnInit() {
    console.log('card item', this.item);
  }

}
