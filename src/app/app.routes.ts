import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'create-marking-sheet',
    loadComponent: () => import('./pages/create-marking-sheet/create-marking-sheet.page').then(m => m.CreateMarkingSheetPage)
  },
  {
    path: 'markings-history',
    loadComponent: () => import('./pages/markings-history/markings-history.page').then(m => m.MarkingsHistoryPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
];
