import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list.component';
import { ProductCreateComponent } from './product-create.component';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from './product.routes';



@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCTS)
  ]
})
export class ProductsModule { }
