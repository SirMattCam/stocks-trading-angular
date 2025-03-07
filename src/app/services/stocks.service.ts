import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConnectivityService } from './connectivity.service';
import { StockInfo, StockTick } from '../models/stock';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  get stockListUrl(): string {
    return environment.serverUrl + 'stocks';
  }

  constructor(private http: HttpClient, private connection: ConnectivityService) {}

  getStockList(): Observable<Array<StockInfo>> {
    return this.http.get(this.stockListUrl).pipe(
      map((x: Array<StockInfo>) => {
        return x.map((s) => new StockInfo(s));
      })
    );
  }


  //MATT: pass this function a stock ticker and a mode (either today or yearly)
  getStockPrices(symbol, mode): Observable<any> {
    //MATT
    return this.http.get(this.stockListUrl +`/${symbol}/price/${mode}`).pipe(
      //MATT: this map doesn't do anything, but is here for example purposes if needed in future
      map((x) => x )
    );
  }

  getStockPriceSubscription(symbol) {
    let priceSubscription = new Subject<StockTick>();
    this.connection.connect().then((client) => {
      client.subscribe('/livestream/' + symbol, (update) => {
        priceSubscription.next(new StockTick(update));
      });
    });

    return priceSubscription;
  }

  unsubscribeStockPrice(symbol: string) {
    this.connection.connect().then((client) => {
      client.unsubscribe('/livestream/' + symbol);
    });
  }
}
