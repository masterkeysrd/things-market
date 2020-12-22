import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ConfirmDialogService } from 'src/app/shared/service/confirm-dialog.service';

import { ProductCreateComponent } from '../../app/components/products/product-create.component';

describe('CreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;

  const route = ({data: of({id: ''})});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCreateComponent ],
      providers: [
        FormBuilder,
        ToastService,
        {
          provide: ActivatedRoute, useValue: route
        },
        ConfirmDialogService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
