import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct, IProductAttribute } from '../models/product.model';
import { ProductsService } from '../service/products.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.route.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
  }

  updateForm(product: IProduct): void {
    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      type: product.type,
      description: product.description,
      // TODO: update attributes form
      //attributes: product.attributes
    });
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      alert('Please check the form validations messages.')
      return;
    }

    this.isSaving = true;
    const product = this.createFromForm();

    if (product.id) {
      this.subscribeToSaveResponse(this.productService.updateProduct(product))
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
    alert(`Product ${product.name} saved successfully`);
    this.previousState();
  }

  protected onSaveError(errors): void {
    this.isSaving = false;
    console.log(errors)
  }
}
