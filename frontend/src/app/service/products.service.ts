import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { IProduct } from '../models/product.model';
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCTS_LIST, UPDATE_PRODUCT } from './product.queries';

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

  createProduct(product: IProduct): Observable<IProduct> {
    console.log(product);
    return this.apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: product,
      refetchQueries: [
        { query: GET_PRODUCTS_LIST }
      ]
    })
      .pipe(
        map(response => response.data),
        map((response: any) => response.createProduct),
        map((response: any) => response.product)
      );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.apollo.mutate({
      mutation: UPDATE_PRODUCT,
      variables: product,
      refetchQueries: [
        { query: GET_PRODUCTS_LIST },
        { query: GET_PRODUCT, variables: { id: product.id }}
      ]
    })
      .pipe(
        map(response => response.data),
        map((response: any) => response.updateProduct),
        map((response: any) => response.product)
      );
  }

  deleteProduct(id: string): Observable<IProduct> {
    return this.apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id },
      refetchQueries: [
        { query: GET_PRODUCTS_LIST }
      ]
    })
      .pipe(
        map(response => response.data),
        map((response: any) => response.deleteProduct),
        map((response: any) => response.product)
      );
  }
}
