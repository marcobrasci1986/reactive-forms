import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Item, Product} from '../models/product.interface';
import {catchError} from 'rxjs/operators';

@Injectable()
export class StockInventoryService {
  constructor(
    private http: HttpClient
  ) {
  }

  getCartItems(): Observable<Item[]> {
    return this.http
      .get('http://localhost:3000/cart')
      .pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get('http://localhost:3000/products')
      .pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
}
