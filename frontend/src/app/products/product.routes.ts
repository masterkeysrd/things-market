import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from "@angular/router";
import { Observable, of } from "rxjs";
import { take } from "rxjs/operators";
import { IProduct } from "../models/product.model";
import { ProductsService } from "../service/products.service";
import { ProductCreateComponent } from "./product-create.component";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductComponent } from "./product.component";


@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<IProduct> {
  constructor(private service: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    const { id } = route.params;

    if (id) {
      return this.service.getProduct(id)
        .pipe(
          take(1)
        );
    }

    return of({})
  }
};

export const PRODUCTS: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: ':id/view',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolve
    }
  },
  {
    path: 'create',
    component: ProductCreateComponent,
    resolve: {
      product: ProductResolve
    }
  },
  {
    path: ':id/edit',
    component: ProductCreateComponent,
    resolve: {
      product: ProductResolve
    }
  },
];
