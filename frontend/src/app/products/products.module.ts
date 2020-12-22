import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PRODUCTS } from './product.routes';

import { ProductComponent } from './product.component';
import { ProductCreateComponent } from './product-create.component';
import { ProductDetailComponent } from './product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ProductComponent, ProductCreateComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCTS),
    NgbPaginationModule
  ]
})
export class ProductsModule { }
