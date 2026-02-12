import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
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
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then(m => m.SignupPage)
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
    path: 'slab-dashboard',
    loadComponent: () => import('./slab-dashboard/slab-dashboard.page').then(m => m.SlabDashboardPage)
  },
  {
    path: 'help',
    loadComponent: () => import('./pages/help/help.page').then(m => m.HelpPage)
  },
  {
    path: 'feedback',
    loadComponent: () => import('./pages/feedback/feedback.page').then(m => m.FeedbackPage)
  },
  {
    path: 'invite-friend',
    loadComponent: () => import('./pages/invite-friend/invite-friend.page').then(m => m.InviteFriendPage)
  },
  {
    path: 'add-user',
    loadComponent: () => import('./pages/add-user/add-user.page').then(m => m.AddUserPage)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about-us/about-us.page').then(m => m.AboutUsPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then(m => m.WelcomePage)
  },
  // {
  //   path: 'measurement',
  //   loadComponent: () => import('./pages/measurement/measurement.page').then(m => m.MeasurementPage)
  // },
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
    loadComponent: () => import('./pages/slab-form/slab-form.page').then( m => m.SlabFormPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.page').then( m => m.HistoryPage)
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
    loadComponent: () => import('./pages/user-search/user-search.page').then( m => m.UserSearchPage)
  },
  {
    path: 'friend-request',
    loadComponent: () => import('./pages/friend-requests/friend-requests.page').then( m => m.FriendRequestsPage)
  }
];
