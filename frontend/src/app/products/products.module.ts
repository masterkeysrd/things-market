import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PRODUCTS } from './product.routes';

import { ProductComponent } from './product.component';
import { ProductCreateComponent } from './product-create.component';
import { ProductDetailComponent } from './product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductComponent, ProductCreateComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCTS)
  ]
})
export class ProductsModule { }
