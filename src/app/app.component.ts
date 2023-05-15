import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'StocksApp';
  stocks: any;

  constructor(private _httpClient: HttpClient) {}
  
  ngOnInit(): void {
    this._httpClient.get(environment.apiURL).subscribe({
      next: response => {
        console.log(response);
        this.stocks = response;
      },
      error: e => console.error(e),
      complete: () => console.log("completed!")
    });
  }
}
