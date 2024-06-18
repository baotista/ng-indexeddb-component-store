import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { PersistenceService } from '../services/persistence.service';

export type CounterState = {
  count: number;
};

@Injectable()
export class CounterStore extends ComponentStore<CounterState> {
  public readonly count$ = this.select((state) => state.count);

  constructor(private readonly persistenceService: PersistenceService) {
    super({ count: 0 });
    this.persistenceService.getCurrentCount().subscribe((count) => {
      if (count) {
        this.patchState({ count: count.count });
      }
    });
  }

  public readonly increment = this.effect<void>((stream$) =>
    stream$.pipe(
      tap(() => this.patchState((state) => ({ count: state.count + 1 }))),
      withLatestFrom(this.count$),
      switchMap(([, count]) => this.persistenceService.saveCount(count))
    )
  );

  public readonly decrement = this.effect<void>((stream$) =>
    stream$.pipe(
      tap(() => this.patchState((state) => ({ count: state.count - 1 }))),
      withLatestFrom(this.count$),
      switchMap(([, count]) => this.persistenceService.saveCount(count))
    )
  );
}
