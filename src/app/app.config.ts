import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {IPublicClientApplication, PublicClientApplication} from '@azure/msal-browser';
import {MSAL_INSTANCE, MsalService} from '@azure/msal-angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorInterceptor} from './core/interceptors/auth-interceptor.interceptor';

export function MSALFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'a8838fdd-dd11-410d-881a-5c216bc42362',
      redirectUri: 'http://localhost:4200'
    }
  });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {provide: MSAL_INSTANCE, useFactory: MSALFactory},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }
  ]
};
