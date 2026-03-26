import { Component, computed, contentChild, DestroyRef, effect, ElementRef, HostListener, inject, input, output, untracked } from '@angular/core';
import { NgClass } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, X, AlertTriangle, UserCheck } from 'lucide-angular';
import { ButtonComponent } from '../button/button.component';
import { ModalFooterDirective } from './modal-footer.directive';

export type ModalSize = 'sm' | 'md' | 'lg';

const FOCUSABLE_SELECTORS = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, LucideAngularModule, ButtonComponent],
  viewProviders: [
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider({ X, AlertTriangle, UserCheck }), multi: true },
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  isOpen = input<boolean>(false);
  title = input<string>('');
  size = input<ModalSize>('md');
  closeOnOverlay = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  showCloseButton = input<boolean>(true);

  closed = output<void>();

  footerContent = contentChild(ModalFooterDirective);
  hasFooter = computed(() => !!this.footerContent());

  constructor() {
    effect(() => {
      const open = this.isOpen();
      untracked(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
          setTimeout(() => {
            const focusableEls = this.el.nativeElement.querySelectorAll(FOCUSABLE_SELECTORS) as NodeListOf<HTMLElement>;
            if (focusableEls.length > 0) {
              focusableEls[0].focus();
            }
          }, 0);
        }
      });
    });

    this.destroyRef.onDestroy(() => {
      document.body.style.overflow = '';
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen() && this.closeOnEscape()) {
      this.close();
    }
  }

  onOverlayClick(event: MouseEvent | KeyboardEvent): void {
    if (event.target === event.currentTarget && this.closeOnOverlay()) {
      this.close();
    }
  }

  trapFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableEls = Array.from(
      this.el.nativeElement.querySelectorAll(FOCUSABLE_SELECTORS) as NodeListOf<HTMLElement>
    );

    if (focusableEls.length === 0) {
      event.preventDefault();
      return;
    }

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }
  }

  close(): void {
    this.closed.emit();
  }
}
