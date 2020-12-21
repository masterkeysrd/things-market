import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  title = 'Products';
  products: Observable<IProduct[]>;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products =
      this.productsService
        .getProductList();
  }

}
