import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


import { GET_PRODUCT, GET_PRODUCTS_LIST } from './product.queries';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apollo: Apollo) { }

  getProduct(id: string): Observable<IProduct> {
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCT,
      variables: { id }
    }).valueChanges
      .pipe(
        map(response => response.data),
        map(response => response.product)
      );
  }

  getProductList(): Observable<IProduct[]> {
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCTS_LIST
    }).valueChanges
      .pipe(
        map(response => response.data),
        map(response => response.products)
      );
  }
}
