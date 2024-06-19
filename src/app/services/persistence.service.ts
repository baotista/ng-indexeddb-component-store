import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';
import { APP_DATA_TTL } from '../config';
import { DBCount } from '../model/db-count';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor(private readonly dbService: NgxIndexedDBService) {
    this.initDbEntry();
  }

  public getCurrentCount(): Observable<DBCount | null> {
    const tabId = this.getTabId();
    if (tabId) {
      return this.dbService.getByKey('counter', tabId);
    }
    return of(null);
  }

  public saveCount(value: number): Observable<DBCount | null> {
    const tabId = this.getTabId();
    if (tabId) {
      return this.dbService.update('counter', {
        tabId: tabId,
        count: value,
        updatedAt: new Date().toISOString(),
      });
    }
    return of(null);
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
      const updatedAt = new Date().toISOString();
      if (dbCount) {
        newCount = this.dbCountIsStillValid(dbCount) ? dbCount.count : 0;
      }
      this.dbService
        .update('counter', {
          tabId: this.getTabId(),
          count: newCount,
          updatedAt,
        })
        .subscribe(console.log);
    });
  }

  private dbCountIsStillValid(dbCount: DBCount): boolean {
    const updatedAt = new Date(dbCount.updatedAt);
    const now = new Date();
    const diff = now.getTime() - updatedAt.getTime();
    return diff < APP_DATA_TTL;
  }
}
