import { Component, input, output, model, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Eye, EyeOff, Check, X } from 'lucide-angular';

export type PasswordStrength = 'weak' | 'medium' | 'strong';

let nextId = 0;

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [{ provide: LUCIDE_ICONS, useValue: new LucideIconProvider({ Eye, EyeOff, Check, X }), multi: true }],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  readonly inputId = `app-password-input-${++nextId}`;

  placeholder = input<string>('');
  label = input<string>('Senha');
  error = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  value = model<string>('');
  showStrength = input<boolean>(true);
  minLength = input<number>(8);

  strengthChange = output<PasswordStrength>();
  focused = output<void>();
  blurred = output<void>();

  showPassword = signal(false);
  isFocused = signal(false);

  hasError = computed(() => this.error().length > 0);
  hasLabel = computed(() => this.label().length > 0);

  criteria = computed(() => {
    const v = this.value();
    const min = this.minLength();
    return {
      length: v.length >= min,
      uppercase: /[A-Z]/.test(v),
      number: /[0-9]/.test(v),
      special: /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(v),
    };
  });

  strength = computed<PasswordStrength | null>(() => {
    const v = this.value();
    if (!v) return null;
    const c = this.criteria();
    const count = [c.length, c.uppercase, c.number, c.special].filter(Boolean).length;
    if (count === 4) return 'strong';
    if (count >= 2) return 'medium';
    return 'weak';
  });

  strengthLabel = computed(() => {
    switch (this.strength()) {
      case 'strong': return 'Forte';
      case 'medium': return 'Média';
      case 'weak': return 'Fraca';
      default: return '';
    }
  });

  filledSegments = computed(() => {
    switch (this.strength()) {
      case 'strong': return 3;
      case 'medium': return 2;
      case 'weak': return 1;
      default: return 0;
    }
  });

  showCriteria = computed(() => this.isFocused() || this.value().length > 0);

  constructor() {
    effect(() => {
      const s = this.strength();
      if (s !== null) {
        this.strengthChange.emit(s);
      }
    });
  }

  toggleVisibility(): void {
    this.showPassword.update(v => !v);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }

  onFocus(): void {
    this.isFocused.set(true);
    this.focused.emit();
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.blurred.emit();
  }
}
