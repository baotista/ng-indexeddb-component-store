import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {StoredStore} from "./stored-store";

export type CounterState = {
  count: number;
};

@Injectable()
@StoredStore(state => state.count)
export class CounterStore extends ComponentStore<CounterState> {
  public readonly count$ = this.select((state) => state.count);

  constructor() {
    super({count: 0});
  }

  public readonly increment = this.updater((state) => ({
    count: state.count + 1,
  }));

  public readonly decrement = this.updater((state) => ({
    count: state.count - 1,
  }));
}
