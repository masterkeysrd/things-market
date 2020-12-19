import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { Product } from 'src/app/models/product.model';
import { GET_PRODUCTS_LIST } from 'src/app/service/product.queries';

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

  it('get products list', () => {
    service.getProductList().subscribe((products: Product[]) => {
      console.log(products);
      expect(products).toBeTruthy();
    });

    const op = controller.expectOne(GET_PRODUCTS_LIST);

    op.flush({
      data: {
        products: [
          {
            id: '5fdd7e421b5330bc33721f5c',
            name: 'Testing Product',
            type: 'Testing Type',
            description: 'Testing Description'
          }
        ]
      }
    })
  });


  afterEach(() => {
    controller.verify();
  });
});
