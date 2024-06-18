import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor(private readonly dbService: NgxIndexedDBService) {}

  public generateTabIdIfNeeded(): void {
    if (!this.getTabId()) {
      this.generateTabId();
      this.dbService
        .update('counter', {
          tabId: this.getTabId(),
          count: 0,
        })
        .subscribe(console.log);
    }
  }

  public getCurrentCount(): Observable<{
    tabId: string | null;
    count: number;
  } | null> {
    const tabId = this.getTabId();
    if (tabId) {
      return this.dbService.getByIndex('counter', 'tabId', tabId);
    }
    return of(null);
  }

  public saveCount(
    value: number
  ): Observable<{ tabId: string | null; count: number }> {
    return this.dbService.update('counter', {
      id: 1,
      tabId: this.getTabId(),
      count: value,
    });
  }

  public getTabId(): string | null {
    return sessionStorage.getItem('tabId');
  }

  private generateTabId(): void {
    const tabId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('tabId', tabId);
  }
}
