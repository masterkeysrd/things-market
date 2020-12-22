import { Component, HostBinding, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent {

  @HostBinding('class.ngb-toasts') toastClass: boolean;

  constructor(public toastService: ToastService) { }

  isTemplate(toast: any): boolean {
     return toast.textOrTpl instanceof TemplateRef;
  }

}
