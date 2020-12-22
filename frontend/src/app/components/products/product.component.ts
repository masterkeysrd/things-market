import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/service/products.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ConfirmDialogService } from 'src/app/shared/service/confirm-dialog.service';
import { IPaginate } from 'src/app/shared/models/paginate.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy {

  title = 'Products';
  searchText: '';
  searchInfo = {
    searchText: '',
    page: 1,
    pageSize: 10,
    total: 1
  };

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

  onSearch(): void {
    this.searchInfo = {
      ...this.searchInfo,
      searchText: this.searchText
    };
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
  }

  deleteProduct({id, name}: IProduct): void {
    this.confirmDialog.confirm('Confirm Delete', `Are you sure you want to delete ${name}?`)
      .then((confirmed) => {
        if (confirmed) {
          this.productsService.deleteProduct(id)
            .subscribe(product => this.onDelete(product));
        }
      });
  }

  onDelete(product: IProduct): void {
    this.toast.showSuccess(`Product ${product.name} deleted successfully`);
    this.getProducts();
  }

  onDeleteError(error): void {
    this.toast.showDanger('Error deleting product.');
    console.error(error);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
