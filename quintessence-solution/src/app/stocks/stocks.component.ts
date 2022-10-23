import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Subject } from 'rxjs';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  constructor(private stockService: StocksService) { }

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  stocks$ = this.stockService.stocks$
  .pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  ngOnInit(): void {
  }

}
