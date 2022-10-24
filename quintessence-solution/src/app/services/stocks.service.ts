import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Stocks } from '../Interfaces/Stocks';
import { StockValues } from '../Interfaces/StockValues';
import { BehaviorSubject, catchError, combineLatest, map, Observable, shareReplay, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient){}

  private stocksUrl = 'api/stocks';
  private stockValuesUrl = 'api/stockValues';

  stocks$ = this.http.get<Stocks[]>(this.stocksUrl)
    .pipe(
      tap(data => console.log('Stocks: ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  stockValues$ = this.http.get<StockValues[]>(this.stockValuesUrl)
    .pipe(
      tap(data => console.log('Stock Values', JSON.stringify(data))),
      catchError(this.handleError)
    );

  private stockSelectedSubject = new BehaviorSubject<number>(0);
  stockSelectedAction$ = this.stockSelectedSubject.asObservable();

  selectedStock$ = combineLatest([
    this.stockValues$,
    this.stockSelectedAction$
  ]).pipe(
    map(([stocks, selectedStockId]) => 
    stocks.filter(stock => stock.stock_id = selectedStockId)),
    shareReplay(1),
    tap(data => console.log('Selcted Value', JSON.stringify(data)))
  );

  selectedStockChanged(selectedStockId: number): void {
    this.stockSelectedSubject.next(selectedStockId);
    console.log(this.stockSelectedSubject);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
