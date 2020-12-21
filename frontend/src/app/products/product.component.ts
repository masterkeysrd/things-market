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

  deleteProduct(product: IProduct) {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      this.productsService.deleteProduct(product.id)
      .subscribe(product => this.onDelete(product));
    }
  }

  onDelete(product: IProduct): void {
    alert(`Product ${product.name} deleted successfully`);
  }

  onDeleteError(error): void {
    console.log(error);
  }
}
