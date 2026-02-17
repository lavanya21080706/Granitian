import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, cameraOutline, createOutline, arrowBack, arrowBackOutline } from 'ionicons/icons';
import { routes } from './app/app.routes';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpInterceptor, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptor/auth.interceptor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { personCircleOutline, mailOutline, callOutline } from 'ionicons/icons';
import {
  homeOutline,
  helpCircle,
  chatbubbleEllipses,
  people,
  personAdd,
  informationCircle,
  logOut,
  closeOutline,
  locationOutline,
  lockClosedOutline,
  logoTwitter,
  sparklesOutline,
  readerOutline,
  add,
  briefcaseOutline,
  businessOutline,
  closeCircleOutline,
  checkmarkCircle,
  checkmarkCircleOutline,
  cubeOutline,
  shareSocialOutline,
  receiptOutline,
  arrowBackCircleOutline,
chevronForwardOutline,
chevronDownCircleOutline,
searchOutline,
menuOutline,
} from 'ionicons/icons';


addIcons({
  trashOutline,
  cameraOutline,
  createOutline,
  personCircleOutline, mailOutline, callOutline,
  homeOutline,
  readerOutline,
  add,
  'help-circle': helpCircle,
  'chatbubble-ellipses-outline': chatbubbleEllipses,
  'people-outline': people,
  'person-add-outline': personAdd,
  'information-circle-outline': informationCircle,
  'log-out-outline': logOut,
  'close-outline': closeOutline
  , 'logo-twitter': logoTwitter
  , 'location-outline': locationOutline,
  'lock-closed-outline': lockClosedOutline,
  'sparkles-outline': sparklesOutline
  , 'briefcase-outline': briefcaseOutline,
  'business-outline': businessOutline,
  'close-circle-outline': closeCircleOutline,
  'checkmark-circle': checkmarkCircle,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'analytics-outline': receiptOutline,
  'cube-outline': cubeOutline,
  'share-social-outline': shareSocialOutline,
  'arrow-back-circle-outline': arrowBackCircleOutline,
'arrow-back-outline': arrowBackOutline,
'chevron-forward-outline': chevronForwardOutline,
'chevron-down-outline': chevronDownCircleOutline
  , 'search-outline': searchOutline,
  'menu-outline': menuOutline
});



bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(IonicStorageModule.forRoot()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
});
