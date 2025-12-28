import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, cameraOutline, createOutline } from 'ionicons/icons';
import { routes } from './app/app.routes';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { personCircleOutline, mailOutline, callOutline } from 'ionicons/icons';
import {
  home,
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
} from 'ionicons/icons';
import { provideHttpClient } from '@angular/common/http';


addIcons({
    trashOutline,
  cameraOutline,
  createOutline,
  personCircleOutline, mailOutline, callOutline,
  home,
  readerOutline,
  add,
  'help-circle': helpCircle,
  'chatbubble-ellipses-outline': chatbubbleEllipses,
  'people-outline': people,
  'person-add-outline': personAdd,
  'information-circle-outline': informationCircle,
  'log-out-outline': logOut,
  'close-outline': closeOutline
  ,'logo-twitter': logoTwitter
  , 'location-outline': locationOutline,
  'lock-closed-outline': lockClosedOutline,
  'sparkles-outline': sparklesOutline
  , 'briefcase-outline': briefcaseOutline,
  'business-outline': businessOutline,
  'close-circle-outline': closeCircleOutline,
});



bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(IonicStorageModule.forRoot())
  ],
});
