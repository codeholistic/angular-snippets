import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private readonly apiUrl = 'https://codeholistic.com/api';
  private readonly cacheSize = 1;
  private destroy$ = new Subject<void>();

  private _data: BehaviorSubject<Data[]> = new BehaviorSubject<Data[]>([]);
  public data: Observable<Data[]> = this._data.asObservable();

  constructor(private http: HttpClient, @Inject('ENVIRONMENT') private environment: any) { }

  public getData(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/data`).pipe(
      takeUntil(this.destroy$),
      map(data => {
        this._data.next(data);
        return data;
      }),
      shareReplay(this.cacheSize) // cache previous emissions
    );
  }

  public patchData(data: Data): void {
    this.http.patch<Data>(`${this.apiUrl}/data`, data)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(updatedData => {
          const currentValue = this._data.value;
          const newValue = currentValue.map(d => {
            if (d.id === updatedData.id) {
              return updatedData;
            }
            return d;
          });
          this._data.next(newValue);
          return of(updatedData);
        })
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
