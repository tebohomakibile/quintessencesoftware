import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, EMPTY, Subject } from 'rxjs';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-stock-values',
  templateUrl: './stock-values.component.html',
  styleUrls: ['./stock-values.component.scss']
})
export class StockValuesComponent implements OnInit {
  downloadJson: any;

  constructor(private stockService: StocksService, private sanitizer: DomSanitizer) { }

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  selectedStock$ = this.stockService.selectedStock$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  generateDownloadJsonUri() {
    var jsonFile = JSON.stringify(this.selectedStock$);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(jsonFile));
    this.downloadJson = uri;
  }

  ngOnInit(): void {
  }

}
