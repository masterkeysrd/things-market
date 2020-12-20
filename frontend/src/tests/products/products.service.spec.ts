import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import mockProduct from '../../mock/product.mock.json';
import mockProducts from '../../mock/products.mock.json';

import { IProduct } from 'src/app/models/product.model';
import { GET_PRODUCT, GET_PRODUCTS_LIST } from 'src/app/service/product.queries';

import { ProductsService } from '../../app/service/products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule]
    });
    service = TestBed.inject(ProductsService);
    controller = TestBed.inject(ApolloTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get product with correct id', () => {
    const expected = <IProduct>mockProduct;
    service.getProduct(expected.id)
      .subscribe((actual) => {
        expect(expected).toEqual(actual);
      });

    const op = controller.expectOne(GET_PRODUCT);
    expect(op.operation.operationName).toEqual('GetProductById');
    expect(op.operation.variables.id).toEqual(expected.id);

    op.flush({
      data: {
        product: mockProduct
      }
    });
  });

  it('should get product with null id', () => {
    service.getProduct(null)
      .subscribe(product => {
        expect(product).toBeFalsy();
      });

    const op = controller.expectOne(GET_PRODUCT);
    expect(op.operation.operationName).toEqual('GetProductById');
    expect(op.operation.variables.id).toBeFalsy();

    op.flush({
      data: {
        product: null
      }
    });
  });

  it('should get product with empty id', () => {
    service.getProduct("")
      .subscribe(product => {
        expect(product).toBeFalsy();
      });

    const op = controller.expectOne(GET_PRODUCT);
    expect(op.operation.operationName).toEqual('GetProductById');
    expect(op.operation.variables.id).toBeFalsy();

    op.flush({
      data: {
        product: null
      }
    });
  });

  it('should get products list', () => {
    service.getProductList().subscribe((products: IProduct[]) => {
      expect(products).toBeTruthy();
    });

    const op = controller.expectOne(GET_PRODUCTS_LIST);

    op.flush({
       data: {
          products: mockProducts
        }
      });

    expect(op.operation.operationName).toEqual('GetProductsList');
  });

  afterEach(() => {
    controller.verify();
  });
});
