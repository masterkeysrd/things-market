import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmDialogComponent } from '../../app/components/widgets/confirm-dialog/confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModalModule],
      declarations: [ConfirmDialogComponent],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
