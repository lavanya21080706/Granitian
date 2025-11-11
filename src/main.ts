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


addIcons({
  trashOutline,
  cameraOutline,
  createOutline,
  personCircleOutline, mailOutline, callOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(IonicStorageModule.forRoot())
  ],
});
