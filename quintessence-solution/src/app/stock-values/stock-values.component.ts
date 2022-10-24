import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Subject } from 'rxjs';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-stock-values',
  templateUrl: './stock-values.component.html',
  styleUrls: ['./stock-values.component.scss']
})
export class StockValuesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
