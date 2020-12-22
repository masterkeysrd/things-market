import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { IProduct } from '../models/product.model';
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCTS_LIST, UPDATE_PRODUCT } from './product.queries';
import { IPaginate } from '../models/paginate.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private lastQueryInfo = {};
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

  getProductList(searchText: String = "", page: Number = 1, pageSize: Number = 10): Observable<IPaginate<IProduct>> {
    this.lastQueryInfo = { searchText, page, pageSize };
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCTS_LIST,
      variables: this.lastQueryInfo
    }).valueChanges
      .pipe(
        map(response => response.data),
        map(response => response.products)
      );
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: product,
      refetchQueries: [
        { query: GET_PRODUCTS_LIST, variables: this.lastQueryInfo }
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
        { query: GET_PRODUCT, variables: { id: product.id } },
        { query: GET_PRODUCTS_LIST, variables: this.lastQueryInfo }
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
        { query: GET_PRODUCTS_LIST, variables: this.lastQueryInfo }
      ]
    })
      .pipe(
        map(response => response.data),
        map((response: any) => response.deleteProduct),
        map((response: any) => response.product)
      );
  }
}
