# NG indexedDb ComponentStore

### The aim of this app is to show the use of indexedDb as the persitence of an NGRX component store.

* The persistence is handled per browser tab.
* When the app bootsraps, it creates or retrieves a unique tab id in the session storage.
* The session storage is used because it is scoped to the brower tab and the tabs created by duplicating it.
* A TTL is used to invalidate the data stored after a period of time without update. It allows to reload the tab with the data stored but only during a certain period of time

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
