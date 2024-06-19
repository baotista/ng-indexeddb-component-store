import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { routes } from './app.routes';

const dbConfig: DBConfig = {
  name: 'PimentoDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'counter',
      storeConfig: { keyPath: 'tabId', autoIncrement: false },
      storeSchema: [
        { name: 'count', keypath: 'count', options: { unique: false } },
      ],
    },
  ],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)),
  ],
};
