import { Component } from '@angular/core';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  Building2,
} from 'lucide-angular';

@Component({
  selector: 'app-client-placeholder',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ Building2 }),
      multi: true,
    },
  ],
  template: `
    <div class="placeholder">
      <lucide-angular name="building-2" [size]="48" [strokeWidth]="1.5" class="placeholder__icon" />
      <h2 class="placeholder__title">Em construção</h2>
      <p class="placeholder__text">Esta página será implementada em breve</p>
    </div>
  `,
  styles: `
    @use '../../../shared/styles/variables' as v;

    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;

      &__icon {
        color: v.$text-muted;
      }

      &__title {
        font-family: v.$font-family;
        font-size: 20px;
        font-weight: 600;
        color: v.$text-primary;
        margin: 16px 0 0;
      }

      &__text {
        font-family: v.$font-family;
        font-size: 14px;
        color: v.$text-muted;
        margin: 4px 0 0;
      }
    }
  `,
})
export class ClientPlaceholderComponent {}
