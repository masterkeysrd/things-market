import { of } from 'rxjs';
import mockProduct from '../../mock/product.mock.json';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from '../../app/products/product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ProductComponent } from '../../app/products/product.component';

describe('ProductViewComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const route = ({data: of({ product: mockProduct})});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute, useValue: route
        }
      ]
    })
    .overrideTemplate(ProductComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load data in on init', () => {
    component.ngOnInit();

    expect(component.product).toEqual(mockProduct);
  });
});
