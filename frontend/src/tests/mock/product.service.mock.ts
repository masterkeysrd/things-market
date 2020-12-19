import { Observable, of } from 'rxjs';
import products from '../../mock/products.mock.json';
import { Product } from "src/app/models/product.model";

export class ProductServiceMock {

  getProductList(): Observable<Product[]> {
    return of(products as Product[]);
  }
}
