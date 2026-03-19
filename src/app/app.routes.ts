import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'welcome',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'friend-requests',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then(m => m.WelcomePage)
  },
  {
    path: 'bottom-tabs',
    loadComponent: () => import('./pages/bottom-tabs/bottom-tabs.page').then(m => m.BottomTabsPage)
  },
  {
    path: 'slabs',
    loadComponent: () => import('./pages/slabs/slabs.page').then(m => m.SlabsPage)
  },
  {
    path: 'slabs/:id',
    loadComponent: () =>
      import('./pages/slabs/slabs.page').then(m => m.SlabsPage)
  },
  {
    path: 'slab-form',
    loadComponent: () => import('./pages/slab-form/slab-form.page').then(m => m.SlabFormPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.page').then(m => m.HistoryPage)
  },

  {
    path: 'measurement',
    loadComponent: () => import('./pages/measurement/measurement.page')
      .then(m => m.MeasurementPage)
  },
  {
    path: 'measurement/:id',
    loadComponent: () => import('./pages/measurement/measurement.page')
      .then(m => m.MeasurementPage)
  },
  {
    path: 'user-search',
    loadComponent: () => import('./pages/user-search/user-search.page').then(m => m.UserSearchPage)
  },
  {
    path: 'handle-requests',
    loadComponent: () => import('./pages/handle-requests/handle-requests.page').then(m => m.FriendRequestsPage)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./pages/inventory/inventory.page').then(m => m.InventoryPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
];
