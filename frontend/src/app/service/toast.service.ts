import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(message: string, delay: number = 2000) {
    this.show(message, { classname: 'bg-success text-light', delay });
  }

  showDanger(message: string, delay: number = 2000) {
    this.show(message, { classname: 'bg-danger text-light', delay });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
