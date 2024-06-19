import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { PersistenceService } from './services/persistence.service';
import { CounterStore } from './store/counter.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  providers: [CounterStore, PersistenceService, NgxIndexedDBService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public counter: Observable<number> = this.counterStore.select(
    (state) => state.count
  );
  constructor(
    private readonly counterStore: CounterStore,
    private readonly persistenceService: PersistenceService
  ) {}

  ngOnInit() {
    this.counterStore.state$.subscribe((state) => {
      console.log(state);
    });
  }

  public increment() {
    this.counterStore.increment();
  }

  public decrement() {
    this.counterStore.decrement();
  }
}
