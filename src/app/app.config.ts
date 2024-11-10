import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { IMAGE_CONFIG } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(
    provideFirebaseApp(() => initializeApp(environment.firebase))), 
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideAnimations(),
    provideToastr({
      maxOpened: 1, // Only one toast visible at a time
      autoDismiss: true, // Automatically close old toast when new one appears
      newestOnTop: true, // Display the newest toast on top
    }),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true, 
        disableImageLazyLoadWarning: true
      }
    }
  ]
};
