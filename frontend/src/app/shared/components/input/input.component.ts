import { Component, input, output, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type InputType = 'text' | 'email' | 'number' | 'tel' | 'url' | 'search';

let nextId = 0;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  readonly inputId = `app-input-${++nextId}`;
  type = input<InputType>('text');
  placeholder = input<string>('');
  label = input<string>('');
  error = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  maxLength = input<number | null>(null);
  value = model<string>('');

  focused = output<void>();
  blurred = output<void>();

  hasError = computed(() => this.error().length > 0);
  hasLabel = computed(() => this.label().length > 0);

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }
}
