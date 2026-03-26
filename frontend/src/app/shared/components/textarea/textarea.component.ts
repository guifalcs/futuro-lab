import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output } from '@angular/core';

export type TextareaResize = 'none' | 'vertical' | 'both';

let nextId = 0;

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  readonly inputId = `app-textarea-${++nextId}`;
  placeholder = input<string>('');
  label = input<string>('');
  error = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  value = model<string>('');
  rows = input<number>(4);
  maxLength = input<number | null>(null);
  resize = input<TextareaResize>('vertical');

  focused = output<void>();
  blurred = output<void>();

  hasError = computed(() => this.error().length > 0);
  hasLabel = computed(() => this.label().length > 0);
  charCount = computed(() => this.value().length);
  isOverLimit = computed(() => this.maxLength() !== null && this.charCount() > this.maxLength()!);

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }
}
