import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {NgxIndexedDBModule} from 'ngx-indexed-db';
import {routes} from './app.routes';
import {DB_CONFIG} from './config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(NgxIndexedDBModule.forRoot(DB_CONFIG)),
  ],
};
