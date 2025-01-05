import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {IPublicClientApplication, PublicClientApplication} from "@azure/msal-browser";
import {MSAL_INSTANCE, MsalService} from "@azure/msal-angular";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorInterceptor} from "./core/interceptors/auth-interceptor.interceptor";

export function MSALFactory(): IPublicClientApplication {
  const instance = new PublicClientApplication({
    auth: {
      clientId: 'b29ae966-7adf-4ce5-bed8-9ba0e6062f50',
      redirectUri: 'http://localhost:4200'
    }
  });
  instance.initialize();
  return instance;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALFactory
    },
    MsalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }
  ]
};
