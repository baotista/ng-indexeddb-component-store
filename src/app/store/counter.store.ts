import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {map, skip, switchMap} from 'rxjs';
import {PersistenceService} from '../services/persistence.service';

export type CounterState = {
  count: number;
};

@Injectable()
export class CounterStore extends ComponentStore<CounterState> {
  public readonly count$ = this.select((state) => state.count);

  constructor(private readonly persistenceService: PersistenceService) {
    super({count: 0});
    persistenceService.getCurrentCount().pipe(
      map((count) => count?.count || 0),
    ).subscribe((dbCount) => {
      this.patchState({ count: dbCount });
    });
  }

  public readonly watchCount = this.effect<void>(() => {
    return this.count$.pipe(
      skip(1),
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
