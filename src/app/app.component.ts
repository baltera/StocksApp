import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Symbol } from './models/symbol';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _DATA: string = '[ { "id": 0, "name": "Tesla Inc", "symbol": "TSLA", "lastSalePrice": 169.23, "percentChange": 1.69, "marketCap": 529004658688, "quoteId": 0 }, { "id": 0, "name": "Microsoft Corporation", "symbol": "MSFT", "lastSalePrice": 313.65, "percentChange": 1.32, "marketCap": 2325861105664, "quoteId": 0 }, { "id": 0, "name": "CGI Inc", "symbol": "GIB", "lastSalePrice": 104.03, "percentChange": 0.49, "marketCap": 24387960832, "quoteId": 0 } ]';
  title = 'StocksApp';
  stocks: any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  symbols: Symbol[] = [{ name: 'TSLA' }, { name: 'MSFT' }, { name: 'GIB' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add symbol
    if (value) {
      this.symbols.push({ name: value });
      this.filterStocks();
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(symbol: Symbol): void {
    const index = this.symbols.indexOf(symbol);

    if (index >= 0) {
      this.symbols.splice(index, 1);
      this.filterStocks();
    }
  }

  edit(symbol: Symbol, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove symbol if it no longer has a name
    if (!value) {
      this.remove(symbol);
      this.filterStocks();
      return;
    }

    // Edit existing symbol
    const index = this.symbols.indexOf(symbol);
    if (index >= 0) {
      this.symbols[index].name = value;
      this.filterStocks();
    }
  }

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.filterStocks();
  }

  filterStocks() {
    if (this.symbols.length <= 0) {
      alert("Symbols expected!");
      return;
    }
    let queryUrl = "?tickers=" + this.symbols.map(s => s.name).join(",");
    this._httpClient.get(environment.apiURL + environment.stocksEndpoint + queryUrl).subscribe({
      next: response => {
        console.log(response);
        this.stocks = response;
      },
      error: e => {
        console.error(e);
        this.stocks = JSON.parse(this._DATA);
        console.log(this.stocks);
      },
      complete: () => console.log("completed!")
    });
  }
}

