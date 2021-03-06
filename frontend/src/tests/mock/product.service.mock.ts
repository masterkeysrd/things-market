import { Observable, of } from 'rxjs';
import products from '../../mock/products.mock.json';
import { IProduct } from '../../app/shared/models/product.model';
import { IPaginate } from '../../app/shared/models/paginate.model';

export class ProductServiceMock {

  getProductList(): Observable<IPaginate<IProduct>> {
    return of({
      page: 1,
      pages: 1,
      total: 10,
      hasNext: false,
      hasPre: false,
      objects: products
    });
  }
}
