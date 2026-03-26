import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Check,
  ChevronDown,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';

export interface ISelectOption {
  value: string;
  label: string;
}

let nextId = 0;

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ChevronDown, Check }),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  private readonly el = inject(ElementRef);

  readonly inputId = `app-select-${++nextId}`;

  options = input<ISelectOption[]>([]);
  placeholder = input<string>('Selecione...');
  label = input<string>('');
  error = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  clearable = input<boolean>(false);
  value = model<string>('');

  focused = output<void>();
  blurred = output<void>();

  isOpen = signal(false);
  highlightedIndex = signal(-1);

  selectedLabel = computed<string | null>(() => {
    const found = this.options().find((opt) => opt.value === this.value());
    return found ? found.label : null;
  });

  activeDescendantId = computed<string | null>(() => {
    const idx = this.highlightedIndex();
    if (!this.isOpen() || idx < 0) return null;
    return `${this.inputId}-option-${idx}`;
  });

  hasError = computed(() => this.error().length > 0);
  hasLabel = computed(() => this.label().length > 0);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const opts = this.options();
    const open = this.isOpen();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!open) {
          this.openDropdown();
        } else {
          this.highlightedIndex.update((i) => (i + 1) % opts.length);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (open) {
          this.highlightedIndex.update((i) =>
            i <= 0 ? opts.length - 1 : i - 1,
          );
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!open) {
          this.openDropdown();
        } else {
          const idx = this.highlightedIndex();
          if (idx >= 0 && idx < opts.length) {
            this.selectOption(opts[idx]);
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        break;
    }
  }

  private openDropdown(): void {
    const opts = this.options();
    const currentIndex = opts.findIndex((opt) => opt.value === this.value());
    this.highlightedIndex.set(currentIndex >= 0 ? currentIndex : 0);
    this.isOpen.set(true);
  }

  toggleDropdown(): void {
    if (this.disabled()) return;
    if (this.isOpen()) {
      this.isOpen.set(false);
    } else {
      this.openDropdown();
    }
  }

  selectOption(option: ISelectOption): void {
    if (this.clearable() && option.value === this.value()) {
      this.value.set('');
    } else {
      this.value.set(option.value);
    }
    this.isOpen.set(false);
    this.blurred.emit();
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }
}
