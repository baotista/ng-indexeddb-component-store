import {ComponentStore, OnStateInit} from "@ngrx/component-store";
import {map, skip, switchMap} from "rxjs";
import {inject} from "@angular/core";
import {PersistenceService} from "../services/persistence.service";

export const StoredStore = (projectionFn: (state: any) => any) => {
  return <T extends { new(...args: any[]): ComponentStore<object> }>(target: T) => {
    return class extends target implements OnStateInit {
      #persistenceService = inject(PersistenceService);

      #watchState = this.effect(() => this.state$.pipe(
        skip(1),
        map(projectionFn),
        switchMap(count => this.#persistenceService.saveCount(count)),
      ));

      ngrxOnStateInit() {
        this.#persistenceService.getCurrentCount().pipe(
          map((dbCount) => dbCount?.count || 0),
        ).subscribe(count => {
          this.patchState({count});
        });
      }
    };
  };
}
