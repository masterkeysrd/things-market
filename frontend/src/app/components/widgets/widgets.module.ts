import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { NgbModalModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    ToastComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    NgbModalModule,
  ],
  exports: [
    ToastComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class WidgetsModule { }
