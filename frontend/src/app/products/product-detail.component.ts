import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.route.data.subscribe(({product}) => {
      this.product = product;
    });
  }

  previousState(): void {
    window.history.back();
  }

}
