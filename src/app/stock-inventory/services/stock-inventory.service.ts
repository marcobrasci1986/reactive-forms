import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Item, Product} from '../models/product.interface';
import {catchError, map} from 'rxjs/operators';

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

  checkBranchId(id: string): Observable<boolean> {
    const params = new HttpParams();
    const searchParams = params.set('id', id);

    return this.http.get('http://localhost:3000/branches', {params: searchParams}).pipe(
      map((response: any[]) => {
        console.log('response: ', response);
        return !!response.length;
      }),
      catchError((error: any) => Observable.throw(error.json()))
    );
  }
}
