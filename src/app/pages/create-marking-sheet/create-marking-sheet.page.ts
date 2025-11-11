import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-create-marking-sheet',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './create-marking-sheet.page.html',
  styleUrls: ['./create-marking-sheet.page.scss'],
})
export class CreateMarkingSheetPage {
  private _storage: Storage | null = null;
  lot: any = {};
  slabs: any[] = [{ rawLength: 0, rawHeight: 0, area: 0 }];
  grandTotal = 0;

  constructor(private alertCtrl: AlertController, private storage: Storage) { }

  async ngOnInit() {
    this._storage = await this.storage.create();
    await this.loadSavedForm();
  }

  recalculate(index: number) {
    const slab = this.slabs[index];
    slab.area = slab.rawLength * slab.rawHeight;
    this.updateTotal();
  }

  updateTotal() {
    this.grandTotal = this.slabs.reduce((sum, s) => sum + s.area, 0);
  }

  addRow() {
    this.slabs.push({ rawLength: 0, rawHeight: 0, area: 0 });
  }
  async saveDraft() {
    const formData = {
      lot: this.lot,
      slabs: this.slabs,
      grandTotal: this.grandTotal,
      savedAt: new Date()
    };
    await this.storage.set('markingSheetDraft', formData);

    const alert = await this.alertCtrl.create({
      header: 'Draft Saved',
      message: 'Your marking sheet has been saved locally.',
      buttons: ['OK']
    });
    await alert.present();
  }

  
  async saveForm() {
    const formData = {
      lot: this.lot,
      slabs: this.slabs,
      grandTotal: this.grandTotal,
      savedAt: new Date().toISOString()
    };

    await this._storage?.set('markingSheetForm', formData); 
    const alert = await this.alertCtrl.create({
      header: 'Saved',
      message: 'Your form has been saved locally!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async loadSavedForm() {
    const saved = await this._storage?.get('markingSheetForm');
    if (saved) {
      this.lot = saved.lot;
      this.slabs = saved.slabs;
      this.grandTotal = saved.grandTotal;
      const alert = await this.alertCtrl.create({
        header: 'Loaded',
        message: 'Your saved form has been restored!',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async deleteSlab(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Slab',
      message: 'Are you sure you want to delete this slab entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.slabs.splice(index, 1);
            this.updateTotal();
          }
        }
      ]
    });
    await alert.present();
  }

  editSlab(index: number) {
    // Need to implement this
  }
}
