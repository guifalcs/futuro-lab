import { Component, input, output, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type InputType = 'text' | 'email' | 'number' | 'tel' | 'url' | 'search';
export type InputMask = 'cpf' | 'cnpj' | 'telefone' | null;

const MASK_PATTERNS: Record<string, string> = {
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0001-00',
  telefone: '(00) 00000-0000',
};

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
  mask = input<InputMask>(null);
  value = model<string>('');

  focused = output<void>();
  blurred = output<void>();

  hasError = computed(() => this.error().length > 0);
  hasLabel = computed(() => this.label().length > 0);

  effectiveMaxLength = computed(() => {
    const m = this.mask();
    if (m && MASK_PATTERNS[m]) return MASK_PATTERNS[m].length;
    return this.maxLength();
  });

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const m = this.mask();

    if (m && MASK_PATTERNS[m]) {
      const masked = this.applyMask(target.value, MASK_PATTERNS[m]);
      this.value.set(masked);
      target.value = masked;
    } else {
      this.value.set(target.value);
    }
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }

  private applyMask(rawValue: string, pattern: string): string {
    const digits = rawValue.replace(/\D/g, '');
    let result = '';
    let digitIndex = 0;

    for (let i = 0; i < pattern.length && digitIndex < digits.length; i++) {
      if (pattern[i] === '0') {
        result += digits[digitIndex++];
      } else {
        result += pattern[i];
        if (digits[digitIndex] === pattern[i]) {
          digitIndex++;
        }
      }
    }

    return result;
  }
}
