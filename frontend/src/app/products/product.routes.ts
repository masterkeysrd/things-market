import { Routes } from "@angular/router";
import { ProductCreateComponent } from "./product-create.component";
import { ProductComponent } from "./product.component";

export const PRODUCTS: Routes = [
  { path: '/', component: ProductComponent },
  { path: 'create', component: ProductCreateComponent},
]
