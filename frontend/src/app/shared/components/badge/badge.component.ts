import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  variant = input<BadgeVariant>('neutral');
  size = input<BadgeSize>('md');
  text = input<string>('');

  classes = computed(() => ({
    badge: true,
    [`badge--${this.variant()}`]: true,
    [`badge--${this.size()}`]: true,
  }));
}
