import { DBConfig } from 'ngx-indexed-db';

// The amount of time in ms that the app data is considered valid.
export const APP_DATA_TTL = 5000;

// The configuration for the IndexedDB.
export const DB_CONFIG: DBConfig = {
  name: 'PimentoDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'counter',
      storeConfig: { keyPath: 'tabId', autoIncrement: false },
      storeSchema: [
        { name: 'count', keypath: 'count', options: { unique: false } },
        { name: 'updatedAt', keypath: 'updatedAt', options: { unique: false } },
      ],
    },
  ],
};
