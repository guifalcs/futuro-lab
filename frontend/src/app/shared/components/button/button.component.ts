import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  variant = input<ButtonVariant>('default');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  type = input<ButtonType>('button');

  clicked = output<MouseEvent>();

  isDisabled = computed(() => this.disabled() || this.loading());

  hostClasses = computed(() => {
    return [
      'btn',
      `btn--${this.variant()}`,
      `btn--${this.size()}`,
      this.isDisabled() ? 'btn--disabled' : '',
      this.loading() ? 'btn--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  onClick(event: MouseEvent): void {
    if (!this.isDisabled()) {
      event.stopPropagation();
      this.clicked.emit(event);
    }
  }
}
