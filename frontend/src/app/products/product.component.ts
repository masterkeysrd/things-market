import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ProductsService } from '../service/products.service';
import { ToastService } from '../service/toast.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  title = 'Products';
  products: Observable<IProduct[]>;

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

  getProducts(): void {
    this.products =
      this.productsService
        .getProductList();
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
  }

  onDeleteError(error): void {
    this.toast.showDanger('Error deleting product.');
    console.error(error);
  }
}
