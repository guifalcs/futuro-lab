import { Injectable, signal } from '@angular/core';

export interface IToast {
  id: string;
  variant: 'success' | 'warning' | 'error' | 'info';
  message: string;
  duration: number;
}

const DEFAULT_DURATION = 5000;
const MAX_TOASTS = 5;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<IToast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  success(message: string, duration = DEFAULT_DURATION): void {
    this.add('success', message, duration);
  }

  warning(message: string, duration = DEFAULT_DURATION): void {
    this.add('warning', message, duration);
  }

  error(message: string, duration = DEFAULT_DURATION): void {
    this.add('error', message, duration);
  }

  info(message: string, duration = DEFAULT_DURATION): void {
    this.add('info', message, duration);
  }

  dismiss(id: string): void {
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  private add(variant: IToast['variant'], message: string, duration: number): void {
    const id = crypto.randomUUID();
    this._toasts.update(toasts => {
      const updated = [...toasts, { id, variant, message, duration }];
      return updated.length > MAX_TOASTS ? updated.slice(1) : updated;
    });
  }
}
