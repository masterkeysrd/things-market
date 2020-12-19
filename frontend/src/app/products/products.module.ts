import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductCreateComponent } from './product-create.component';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from './product.routes';



@NgModule({
  declarations: [ProductComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCTS)
  ]
})
export class ProductsModule { }
