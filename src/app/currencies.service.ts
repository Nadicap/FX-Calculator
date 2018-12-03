import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import 'rxjs/add/operator/map';
import { RatesInterface } from './rates-interface';

@Injectable()
export class CurrenciesService {

  constructor(private http: Http) {
  }
  public getCurrencies(): Observable<RatesInterface> {
    return this.http
      .get('https://api.exchangeratesapi.io/latest')
      .map((response: Response) => {
        return <RatesInterface>response.json();
      });
  }
  public getRatesFromBaseCurrency(baseCurrency): Observable<RatesInterface> {
    return this.http
      .get('https://api.exchangeratesapi.io/latest?base=' + baseCurrency)
      .map((response: Response) => {
        return <RatesInterface>response.json();
      });
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
