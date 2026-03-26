import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  X,
  XCircle,
} from 'lucide-angular';

import { IToast, ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ CheckCircle, AlertTriangle, XCircle, Info, X }),
      multi: true,
    },
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnDestroy {
  private readonly toastService = inject(ToastService);

  readonly toasts = this.toastService.toasts;
  readonly leavingIds = signal<Set<string>>(new Set());

  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly knownIds = new Set<string>();

  readonly iconByVariant: Record<IToast['variant'], string> = {
    success: 'check-circle',
    warning: 'alert-triangle',
    error: 'x-circle',
    info: 'info',
  };

  constructor() {
    effect(() => {
      const current = this.toasts();
      current.forEach(toast => {
        if (!this.knownIds.has(toast.id)) {
          this.knownIds.add(toast.id);
          const timer = setTimeout(() => this.startLeave(toast.id), toast.duration);
          this.timers.set(toast.id, timer);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.timers.forEach(timer => clearTimeout(timer));
  }

  dismiss(id: string): void {
    this.startLeave(id);
  }

  isLeaving(id: string): boolean {
    return this.leavingIds().has(id);
  }

  trackById(_index: number, toast: IToast): string {
    return toast.id;
  }

  private startLeave(id: string): void {
    if (this.leavingIds().has(id)) return;

    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }

    this.leavingIds.update(ids => new Set([...ids, id]));

    setTimeout(() => {
      this.leavingIds.update(ids => {
        const next = new Set(ids);
        next.delete(id);
        return next;
      });
      this.knownIds.delete(id);
      this.toastService.dismiss(id);
    }, 210);
  }
}
