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
import {
  Check,
  ChevronDown,
  X,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';
import { ISelectOption } from '../select/select.component';

let nextId = 0;

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ChevronDown, Check, X }),
      multi: true,
    },
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent {
  private readonly el = inject(ElementRef);

  readonly inputId = `app-multi-select-${++nextId}`;

  options = input<ISelectOption[]>([]);
  placeholder = input<string>('Selecione...');
  label = input<string>('');
  disabled = input<boolean>(false);
  value = model<string[]>([]);

  focused = output<void>();
  blurred = output<void>();

  isOpen = signal(false);
  highlightedIndex = signal(-1);

  selectedLabels = computed(() => {
    const vals = this.value();
    return this.options().filter(opt => vals.includes(opt.value));
  });

  hasSelection = computed(() => this.value().length > 0);
  hasLabel = computed(() => this.label().length > 0);

  displayText = computed(() => {
    const selected = this.selectedLabels();
    if (selected.length === 0) return null;
    if (selected.length === 1) return selected[0].label;
    return `${selected.length} selecionados`;
  });

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
          this.highlightedIndex.update(i => (i + 1) % opts.length);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (open) {
          this.highlightedIndex.update(i => (i <= 0 ? opts.length - 1 : i - 1));
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
            this.toggleOption(opts[idx]);
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
    this.highlightedIndex.set(0);
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

  toggleOption(option: ISelectOption): void {
    const current = this.value();
    if (current.includes(option.value)) {
      this.value.set(current.filter(v => v !== option.value));
    } else {
      this.value.set([...current, option.value]);
    }
  }

  removeValue(val: string, event: MouseEvent): void {
    event.stopPropagation();
    this.value.update(current => current.filter(v => v !== val));
  }

  isSelected(val: string): boolean {
    return this.value().includes(val);
  }

  clearAll(event: MouseEvent): void {
    event.stopPropagation();
    this.value.set([]);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }
}
