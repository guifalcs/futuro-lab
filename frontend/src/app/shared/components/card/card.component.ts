import { Component, computed, contentChild, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { CardHeaderDirective } from './card-header.directive';
import { CardFooterDirective } from './card-footer.directive';

export type CardVariant = 'default' | 'interactive' | 'selected';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  variant = input<CardVariant>('default');
  padding = input<CardPadding>('md');

  cardClick = output<void>();

  headerContent = contentChild(CardHeaderDirective);
  footerContent = contentChild(CardFooterDirective);


  hasHeader = computed(() => !!this.headerContent());
  hasFooter = computed(() => !!this.footerContent());

  classes = computed(() => ({
    card: true,
    [`card--${this.variant()}`]: true,
    [`card--padding-${this.padding()}`]: true,
  }));

  onClick(): void {
    if (this.variant() === 'interactive') {
      this.cardClick.emit();
    }
  }
}
