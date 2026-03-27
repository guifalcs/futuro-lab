import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  template: `
    <div class="placeholder-page">
      <h1 class="placeholder-page__title">{{ title }}</h1>
      <p class="placeholder-page__description">Esta página está em construção.</p>
    </div>
  `,
  styles: [`
    @use '../../shared/styles/variables' as v;

    .placeholder-page {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &__title {
        font-family: v.$font-family;
        font-size: 30px;
        font-weight: 700;
        color: v.$text-primary;
        letter-spacing: -0.025em;
        margin: 0;
      }

      &__description {
        font-family: v.$font-family;
        font-size: 14px;
        color: v.$text-muted;
        margin: 0;
      }
    }
  `],
})
export class PlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title: string;

  constructor() {
    this.title = (this.route.snapshot.data as { title?: string }).title ?? 'Página';
  }
}
