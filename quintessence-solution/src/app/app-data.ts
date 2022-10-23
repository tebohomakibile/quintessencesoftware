import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { StockValues } from './Interfaces/StockValues';
import { Stocks } from './Interfaces/Stocks';
import { StocksData } from './data/Stocks';
import { StockValuesData } from './data/StockValues';

export class AppData implements InMemoryDbService {

    constructor(){}
    createDb(): { stocks: Stocks[], stockValues: StockValues[] } {
        const stocks = StocksData.stocks;
        const stockValues = StockValuesData.stockValues;
        return { stocks, stockValues };
    }
}