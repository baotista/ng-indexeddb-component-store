import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor(private readonly dbService: NgxIndexedDBService) {
    this.initDbEntry();
  }

  public getCurrentCount(): Observable<{
    tabId: string | null;
    count: number;
  } | null> {
    const tabId = this.getTabId();
    if (tabId) {
      return this.dbService.getByKey('counter', tabId);
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

  private generateTabIdIfNeeded(): void {
    if (!this.getTabId()) {
      this.generateTabId();
    }
  }

  private generateTabId(): void {
    const tabId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('tabId', tabId);
  }

  private initDbEntry(): void {
    this.generateTabIdIfNeeded();
    this.getCurrentCount().subscribe((dbCount) => {
      let newCount = 0;
      if (dbCount) {
        newCount = dbCount.count;
      }
      this.dbService
        .update('counter', {
          tabId: this.getTabId(),
          count: newCount,
        })
        .subscribe(console.log);
    });
  }
}
