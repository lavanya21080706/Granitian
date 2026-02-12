import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-slab-form',
  templateUrl: './slab-form.page.html',
  styleUrls: ['./slab-form.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SlabFormPage implements OnInit {

ngOnInit() {
  if (this.isEdit && this.slab) {
    this.calculate();
  }
}

  @Input() slab: any;
  @Input() lot: any;
  @Input() isEdit = false;

  constructor(private modalCtrl: ModalController) { }


  calculate() {
  const RL = Number(this.slab.rawLength) || 0;
  const RW = Number(this.slab.rawWidth) || 0;

  const AL = this.lot.allowance_length_in || 0;
  const AW = this.lot.allowance_height_in || 0;

  let finalL = RL - AL;
  let finalW = RW - AW;

  if (this.lot.measurement_type === '3-Multiple') {
    finalL = Math.floor(finalL / 3) * 3;
    finalW = Math.floor(finalW / 3) * 3;
  }

  finalL = Math.max(finalL, 0);
  finalW = Math.max(finalW, 0);

  this.slab.lengthAfter = finalL;
  this.slab.widthAfter = finalW;

  // ORIGINAL SFT (RAW)
  this.slab.originalSft = +((RL * RW) / 144).toFixed(2);

  // NET SFT (FINAL)
  this.slab.netSft = +((finalL * finalW) / 144).toFixed(2);
}

ionViewWillEnter() {
  if (this.isEdit && this.slab) {
    this.calculate();
  }
}

  save() {
    this.calculate();
    this.modalCtrl.dismiss(this.slab);
  }

  close() {
    this.modalCtrl.dismiss();
  }


}



