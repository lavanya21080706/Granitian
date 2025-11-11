import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, HttpClientModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  recentData: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadRecentData();
  }

  loadRecentData() {
    this.http.get<any[]>('assets/data/markings-history.json').subscribe({
      next: (data) => {
        console.log('Loaded JSON:', data);
        this.recentData = data.slice(0, 5); 
      },
      error: (err) => {
        console.error('Error loading JSON:', err);
      },
    });
  }

  goToCreateSheet() {
    this.router.navigate(['/create-marking-sheet']);
  }
}
