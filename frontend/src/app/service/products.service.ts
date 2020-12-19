import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { GET_PRODUCTS_LIST } from './product.queries';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apollo: Apollo) { }

  getProductList(): Observable<Product[]> {
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCTS_LIST
    }).valueChanges
      .pipe(
        map(response => response.data),
        map(response => response.products)
      );
  }
}
