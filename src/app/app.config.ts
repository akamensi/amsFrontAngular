import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

import { TokenInterceptorService } from './services/token-interceptor-service.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withHashLocation()),
    provideHttpClient(),
    //{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ]
};


