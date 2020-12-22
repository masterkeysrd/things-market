import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ProductsService } from '../service/products.service';
import { ToastService } from '../service/toast.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { IPaginate } from '../models/paginate.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy {

  title = 'Products';
  searchText: "";
  searchInfo = {
    searchText: "",
    page: 1,
    pageSize: 10,
    total: 1
  }

  subscription: Subscription;
  products: IPaginate<IProduct>;

  constructor(
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.getProducts();
  }

  onSearch() {
    this.searchInfo = {
      ...this.searchInfo,
      searchText: this.searchText
    }
    this.getProducts();
  }

  getProducts(): void {
    this.subscription =
      this.productsService
        .getProductList(this.searchInfo.searchText, this.searchInfo.page, this.searchInfo.pageSize)
        .subscribe(products => {
          this.products = products;
          this.searchInfo = {
            ...this.searchInfo,
            page: products.page,
            total: products.total,
          };
        });
  }

  refreshProducts(): void {
    this.getProducts();
    console.log('here!!!');
  }

  deleteProduct(product: IProduct) {
    this.confirmDialog.confirm('Confirm Delete', `Are you sure you want to delete ${product.name}?`)
      .then((confirmed) => {
        if (confirmed) {
          this.productsService.deleteProduct(product.id)
            .subscribe(product => this.onDelete(product));
        }
      })
  }

  onDelete(product: IProduct): void {
    this.toast.showSuccess(`Product ${product.name} deleted successfully`);
    this.getProducts();
  }

  onDeleteError(error): void {
    this.toast.showDanger('Error deleting product.');
    console.error(error);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
