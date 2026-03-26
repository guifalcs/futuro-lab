import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  LifeBuoy,
  MessageCircle,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { ITicket, MOCK_TICKETS } from '../data/support-mock';

const MONTHS_PT = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

@Component({
  selector: 'app-ticket-view',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardHeaderDirective,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, LifeBuoy, MessageCircle }),
      multi: true,
    },
  ],
  templateUrl: './ticket-view.component.html',
  styleUrl: './ticket-view.component.scss',
})
export class TicketViewComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly ticket = signal<ITicket | null>(null);
  readonly notFound = signal(false);

  readonly formattedDate = computed(() => {
    const t = this.ticket();
    if (!t) return '';
    const date = new Date(t.createdAt);
    const day = date.getDate();
    const month = MONTHS_PT[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} de ${month} de ${year} às ${hours}:${minutes}`;
  });

  readonly statusBadge = computed(() => {
    const status = this.ticket()?.status;
    switch (status) {
      case 'open': return { variant: 'info' as const, text: 'Aberto' };
      case 'in_analysis': return { variant: 'warning' as const, text: 'Em Análise' };
      case 'resolved': return { variant: 'success' as const, text: 'Resolvido' };
      case 'closed': return { variant: 'neutral' as const, text: 'Fechado' };
      default: return { variant: 'neutral' as const, text: '' };
    }
  });

  readonly categoryBadge = computed(() => {
    const cat = this.ticket()?.category;
    switch (cat) {
      case 'bug': return { variant: 'danger' as const, text: 'Bug' };
      case 'improvement': return { variant: 'info' as const, text: 'Melhoria' };
      case 'question': return { variant: 'warning' as const, text: 'Dúvida' };
      default: return { variant: 'neutral' as const, text: 'Outro' };
    }
  });

  readonly priorityBadge = computed(() => {
    const p = this.ticket()?.priority;
    switch (p) {
      case 'low': return { variant: 'neutral' as const, text: 'Baixa' };
      case 'medium': return { variant: 'warning' as const, text: 'Média' };
      case 'high': return { variant: 'danger' as const, text: 'Alta' };
      case 'critical': return { variant: 'danger' as const, text: 'Crítica' };
      default: return { variant: 'neutral' as const, text: '' };
    }
  });

  readonly capitalizedModule = computed(() => {
    const mod = this.ticket()?.affectedModule;
    if (!mod) return '';
    return mod.charAt(0).toUpperCase() + mod.slice(1);
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = MOCK_TICKETS.find(t => t.id === id);
      if (found) {
        this.ticket.set(found);
      } else {
        this.notFound.set(true);
      }
    } else {
      this.notFound.set(true);
    }
  }

  goBack(): void {
    this.router.navigate(['/suporte']);
  }
}
