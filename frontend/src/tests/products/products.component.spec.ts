import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsService } from 'src/app/shared/service/products.service';

import products from '../../mock/products.mock.json';
import { ProductComponent } from '../../app/components/products/product.component';
import { ProductServiceMock } from '../mock/product.service.mock';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ConfirmDialogService } from 'src/app/shared/service/confirm-dialog.service';

describe('ProductsComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductsService;

  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        NgbPaginationModule,
      ],
      providers: [
        ToastService,
        ConfirmDialogService,
        { provide: ProductsService, useClass: ProductServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    h1 = fixture.nativeElement.querySelector('h3');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products list', () => {
    spyOn(productService, 'getProductList')
    .and
    .callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(productService.getProductList).toHaveBeenCalled();
    expect(component.products).toBeTruthy();
  });

  it('should render title', () => {
    expect(h1.textContent).toContain(component.title);
  });

  it('should display different title', () => {
    const title = 'Test Title';
    component.title = title;
    fixture.detectChanges();

    expect(h1.textContent).toContain(title);
  });

  it('should render table headers', () => {
    const headers: HTMLElement[] = fixture.nativeElement.querySelectorAll('thead tr th');
    expect(headers[0].textContent).toContain('Name');
    expect(headers[1].textContent).toContain('Type');
    expect(headers[2].textContent).toContain('Price');
    expect(headers[3].textContent).toContain('Description');
  });

  it('should render table data', () => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const rows: HTMLTableRowElement[] = fixture.nativeElement.querySelectorAll('tbody tr');

      products.forEach((product, i) => {
        const row = rows[i];
        expect(row.cells[0].textContent).toContain(product.name);
        expect(row.cells[1].textContent).toContain(product.type);
        expect(row.cells[2].textContent).toContain(product.price.toString());
        expect(row.cells[3].textContent).toContain(product.description);
      });
    });
  });

  // TODO: add tests to navigate to product view
});
