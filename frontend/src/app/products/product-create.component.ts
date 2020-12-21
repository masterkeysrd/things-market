import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../service/products.service';
import { IProduct, IProductAttribute } from '../models/product.model';

import { ToastService } from '../service/toast.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';

@Component({
  selector: 'app-create',
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent implements OnInit {
  isSaving: boolean;

  productForm: FormGroup = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    type: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    attributes: this.fb.array([])
  });
  currentAttributeForm = this.createAttributeForm();

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private route: ActivatedRoute,
    private confirmDialog: ConfirmDialogService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadProduct();
  }

  get attributes(): FormArray {
    return this.productForm.get('attributes') as FormArray;
  }

  loadProduct(): void {
    this.route.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
  }

  addAttributeForm(): void {
    this.attributes.push(this.createAttributeForm());
  }

  deleteAttributeForm(index: number): void {
    if ((this.attributes.at(index).touched ||
      this.attributes.at(index).valid)) {
        this.confirmDialog.confirm('Confirm Delete', 'Are you sure you want to delete this Spec?')
        .then((confirmed) => {
          if (confirmed) {
            this.attributes.removeAt(index);
          }
        });
    } else {
      this.attributes.removeAt(index);
    }
  }

  createAttributeForm() {
    return this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      value: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]]
    })
  }

  updateForm(product: IProduct): void {
    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      type: product.type,
      description: product.description,
    });

    if (product.attributes) {
      product.attributes.forEach(attribute => {
        const form = this.createAttributeForm();
        form.patchValue({
          name: attribute.name,
          value: attribute.value
        });
        this.attributes.push(form)
      });
    }

    if (!product.id) {
      this.addAttributeForm();
    }
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.toast.showDanger('Please check the form validations messages.');
      return;
    }

    this.isSaving = true;
    const product = this.createFromForm();

    if (product.id) {
      this.subscribeToSaveResponse(this.productService.updateProduct(product));
    } else {
      this.subscribeToSaveResponse(this.productService.createProduct(product));
    }
  }

  previousState(): void {
    window.history.back();
  }

  private createFromForm(): IProduct {
    return {
      id: this.productForm.get('id').value,
      name: this.productForm.get('name').value,
      type: this.productForm.get('type').value,
      description: this.productForm.get('description').value,
      attributes: this.createAttributesFromForm()
    }
  }

  private createAttributesFromForm(): IProductAttribute[] {
    return (<FormArray>this.productForm.get('attributes')).controls.map((form: FormGroup) => {
      return {
        name: form.get('name').value,
        value: form.get('value').value
      }
    });
  }

  protected subscribeToSaveResponse(result: Observable<IProduct>): void {
    result.subscribe(product => this.onSave(product), (error) => this.onSaveError(error));
  }

  protected onSave(product: IProduct): void {
    this.isSaving = false;
    this.toast.showSuccess(`Product ${product.name} saved successfully`);
    this.previousState();
  }

  protected onSaveError(errors): void {
    this.isSaving = false;
    this.toast.showDanger('Error saving product.')
    console.error(errors);
  }
}
