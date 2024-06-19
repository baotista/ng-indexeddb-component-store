import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { distinctUntilChanged, skip, switchMap } from 'rxjs';
import { PersistenceService } from '../services/persistence.service';

export type CounterState = {
  count: number;
};

@Injectable()
export class CounterStore extends ComponentStore<CounterState> {
  public readonly count$ = this.select((state) => state.count);

  constructor(private readonly persistenceService: PersistenceService) {
    super({ count: 0 });
    setTimeout(() => {
      this.persistenceService.getCurrentCount().subscribe((count) => {
        if (count) {
          this.patchState({ count: count.count });
        }
      });
    }, 30);
  }

  public readonly watchCount = this.effect<void>(() => {
    return this.count$.pipe(
      skip(1),
      distinctUntilChanged(),
      switchMap((count) => this.persistenceService.saveCount(count))
    );
  });

  public readonly increment = this.updater((state) => ({
    count: state.count + 1,
  }));

  public readonly decrement = this.updater((state) => ({
    count: state.count - 1,
  }));
}
