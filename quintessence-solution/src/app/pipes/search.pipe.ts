import { Pipe, PipeTransform } from '@angular/core';
import { Stocks } from '../Interfaces/Stocks';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(stocks: Stocks[], searchValue: string): Stocks[] {
    if(!stocks || !searchValue) {
      return stocks;
    }

    return stocks.filter(stock => 
      stock.stock.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
}
 