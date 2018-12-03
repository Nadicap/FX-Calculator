import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { Http } from '@angular/http';
import { RatesInterface } from './rates-interface';
import { RatesDetailInterface } from './rates-detail-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Foreign Exchange Calculator';
  finalResult: number = 0;
  selectedDefaultCurrency = 'EUR';
  selectedSecondCurrency = '';
  exchangeRatesData = 'Exchange rate';
  rates: RatesInterface;
  currencies: any[];
  firstCurrency: RatesDetailInterface = [];
  secondCurrency: RatesDetailInterface = [];
  constructor(private currenciesService: CurrenciesService, private http: Http) {
    this.getAllCurrencies();
  }
  getAllCurrencies(): void {
    this.currenciesService.getCurrencies().
      subscribe(
        resultArray => {
          this.currencies = resultArray.rates;
          for (let x in this.currencies) {
            const rateDetail = { 'currency': x, 'exchangeRate': this.currencies[x] };
            this.firstCurrency.push(rateDetail);
          }

          const rateDetail = { 'currency': 'EUR', 'exchangeRate': 1 };
          this.firstCurrency.push(rateDetail);
        },
        error => console.log('Error :: ' + error));


    this.currenciesService.getRatesFromBaseCurrency('EUR').
      subscribe(
        resultArray => {
          this.currencies = resultArray.rates;
          for (let x in this.currencies) {
            const rateDetail = { 'currency': x, 'exchangeRate': this.currencies[x] };
            this.secondCurrency.push(rateDetail);
          }
        },
        error => console.log('Error :: ' + error));
  }
  onChange(baseCurrency) {
    this.currencies = [];
    this.secondCurrency = [];
    this.currenciesService.getRatesFromBaseCurrency(baseCurrency).
      subscribe(
        resultArray => {
          this.currencies = resultArray.rates;
          for (let x in this.currencies) {
            const rateDetail = { 'currency': x, 'exchangeRate': this.currencies[x] };
            this.secondCurrency.push(rateDetail);
          }
        },
        error => console.log('Error :: ' + error));
  }

  calculateCurrencies(value, currentValue) {
    this.exchangeRatesData = value.exchangeRate + ' ' + 'Exchange rate';
    const tempResult = value.exchangeRate * currentValue;
    this.finalResult = tempResult;
  }
  swapCurrencies(firstCurrencyValue, secondCurrencyValue) {
    this.currencies = [];
    this.secondCurrency = [];
    this.currenciesService.getRatesFromBaseCurrency(secondCurrencyValue.currency).
      subscribe(
        resultArray => {
          this.currencies = resultArray.rates;
          for (let x in this.currencies) {
            const rateDetail = { 'currency': x, 'exchangeRate': this.currencies[x] };
            this.secondCurrency.push(rateDetail);
          }
          this.selectedDefaultCurrency = secondCurrencyValue.currency;
          this.selectedSecondCurrency = firstCurrencyValue;
        },
        error => console.log('Error :: ' + error));


  }

  refresh(): void {
    window.location.reload();
  }
  ngOnInit(): void { }
}


