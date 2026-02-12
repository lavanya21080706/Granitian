import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // 👈 ADD THIS


@Component({
  selector: 'app-markings-history',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, RouterModule  ],
  templateUrl: './markings-history.page.html',
  styleUrls: ['./markings-history.page.scss'],
})
export class MarkingsHistoryPage implements OnInit {
  allData: any[] = [];
  displayedData: any[] = [];

  itemsPerPage = 20;
  currentPage = 1;
  preloadPages = 4;
  totalPages = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadJSONData();
  }
 loadJSONData() {
  this.http.get<any>('https://x2f6r9dz0i.execute-api.ap-south-1.amazonaws.com/prd/measurements')
    .subscribe({
      next: (res) => {
        const data = res.measurements; // 🔥 FIX

        const sorted = data.sort((a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        this.allData = sorted.map((item: any) => ({
          id: item.measurement_id,
          name: `${item.factory_name} - ${item.granite_color}`,
          date: new Date(item.created_at).toLocaleDateString()
        }));

        this.totalPages = Math.ceil(this.allData.length / this.itemsPerPage);
        this.preloadDataWindow(this.currentPage);
      },
      error: (err) => {
        console.error('Error loading measurements:', err);
      }
    });
}


  preloadDataWindow(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = (page - 1 + this.preloadPages) * this.itemsPerPage;
    this.displayedData = this.allData.slice(0, endIndex);
  }


  onIonInfinite(event: any) {
    this.currentPage++;

    if (this.currentPage > this.totalPages) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }
    const nextEndIndex = (this.currentPage - 1 + this.preloadPages) * this.itemsPerPage;
    const nextSlice = this.allData.slice(0, nextEndIndex);
    this.displayedData = nextSlice;

    setTimeout(() => {
      event.target.complete();
    }, 400);
  }
}
