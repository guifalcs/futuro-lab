import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, model, signal } from '@angular/core';
import {
  Check,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  Minus,
} from 'lucide-angular';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ Check, Minus }),
      multi: true,
    },
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  private static idCounter = 0;
  readonly inputId = `app-checkbox-${++CheckboxComponent.idCounter}`;
  checked = model<boolean>(false);
  label = input<string>('');
  description = input<string>('');
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false);
  error = input<string>('');

  isIndeterminate = signal(false);

  hasLabel = computed(() => this.label().length > 0);
  hasDescription = computed(() => this.description().length > 0);
  hasError = computed(() => this.error().length > 0);

  constructor() {
    effect(() => {
      this.isIndeterminate.set(this.indeterminate());
    });
  }

  toggle(): void {
    if (this.disabled()) return;

    if (this.isIndeterminate()) {
      this.isIndeterminate.set(false);
      this.checked.set(true);
      return;
    }

    this.checked.update((value) => !value);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      event.preventDefault();
      this.toggle();
    }
  }
}
