import { Observable, of } from 'rxjs';
import products from '../../mock/products.mock.json';
import { IProduct } from "src/app/models/product.model";

export class ProductServiceMock {

  getProductList(): Observable<IProduct[]> {
    return of(<IProduct[]> products);
  }
}
