import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  Pencil,
  Building2,
  Activity,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { IClient, MOCK_CLIENTS } from '../data/client-mock';

const MONTHS_PT = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardHeaderDirective,
    AvatarComponent,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, Pencil, Building2, Activity }),
      multi: true,
    },
  ],
  templateUrl: './client-view.component.html',
  styleUrl: './client-view.component.scss',
})
export class ClientViewComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly client = signal<IClient | null>(null);
  readonly notFound = signal(false);

  readonly formattedDate = computed(() => {
    const c = this.client();
    if (!c) return '';
    const date = new Date(c.clientSince);
    const day = date.getUTCDate();
    const month = MONTHS_PT[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} de ${month} de ${year}`;
  });

  readonly formattedAddress = computed(() => {
    const c = this.client();
    if (!c) return '';
    const addr = c.address;
    const parts = [
      `${addr.street}, ${addr.number}`,
      addr.complement || null,
      addr.neighborhood,
      `${addr.city} — ${addr.state}`,
      addr.zipCode,
    ].filter(Boolean);
    return parts.join(', ');
  });

  readonly taxRegimeVariant = computed(() => {
    const regime = this.client()?.taxRegime;
    if (regime === 'MEI') return 'warning' as const;
    if (regime === 'Lucro Real') return 'danger' as const;
    if (regime === 'Lucro Presumido') return 'info' as const;
    return 'neutral' as const;
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = MOCK_CLIENTS.find(c => c.id === id);
      if (found) {
        this.client.set(found);
      } else {
        this.notFound.set(true);
      }
    } else {
      this.notFound.set(true);
    }
  }

  goBack(): void {
    this.router.navigate(['/clientes']);
  }

  goToEdit(): void {
    const id = this.client()?.id;
    if (id) {
      this.router.navigate(['/clientes', id, 'editar']);
    }
  }
}
