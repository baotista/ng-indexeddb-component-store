import {AsyncPipe} from '@angular/common';
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CounterStore} from './store/counter.store';
import {provideComponentStore} from "@ngrx/component-store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  providers: [
    provideComponentStore(CounterStore),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public counter = this.counterStore.count$;

  constructor(
    private readonly counterStore: CounterStore
  ) {}

  public increment() {
    this.counterStore.increment();
  }

  public decrement() {
    this.counterStore.decrement();
  }
}
