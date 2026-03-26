import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  LifeBuoy,
  Plus,
  Eye,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ISelectOption } from '../../../shared/components/select/select.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TooltipDirective } from '../../../shared/components/tooltip/tooltip.directive';
import { TableComponent, TableColumn } from '../../../shared/components/table/table.component';
import { TableCellDirective } from '../../../shared/components/table/table-cell.directive';
import { ITicket, MOCK_TICKETS } from '../data/support-mock';

const MONTHS_PT = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
];

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    MultiSelectComponent,
    BadgeComponent,
    CardComponent,
    TooltipDirective,
    TableComponent,
    TableCellDirective,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ LifeBuoy, Plus, Eye }),
      multi: true,
    },
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent {
  private readonly router = inject(Router);

  readonly tableColumns: TableColumn[] = [
    { key: 'title', label: 'Título', width: 'auto' },
    { key: 'category', label: 'Categoria', width: '140px' },
    { key: 'priority', label: 'Prioridade', width: '120px' },
    { key: 'module', label: 'Módulo', width: '120px' },
    { key: 'status', label: 'Status', width: '120px' },
    { key: 'actions', label: 'Ações', width: '60px', align: 'center' as const },
  ];

  readonly tickets = signal<ITicket[]>([...MOCK_TICKETS]);

  readonly statusOptions: ISelectOption[] = [
    { value: 'open', label: 'Aberto' },
    { value: 'in_analysis', label: 'Em Análise' },
    { value: 'resolved', label: 'Resolvido' },
    { value: 'closed', label: 'Fechado' },
  ];

  readonly priorityOptions: ISelectOption[] = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'critical', label: 'Crítica' },
  ];

  readonly searchQuery = signal('');
  readonly statusFilter = signal<string[]>([]);
  readonly priorityFilter = signal<string[]>([]);

  readonly filteredTickets = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const statuses = this.statusFilter();
    const priorities = this.priorityFilter();

    return this.tickets().filter(t => {
      if (query && !t.title.toLowerCase().includes(query)) return false;
      if (statuses.length > 0 && !statuses.includes(t.status)) return false;
      if (priorities.length > 0 && !priorities.includes(t.priority)) return false;
      return true;
    });
  });

  readonly filteredTicketsAsRecords = computed(() =>
    this.filteredTickets().map(t => ({ ...t } as Record<string, unknown>))
  );

  readonly totalCount = computed(() => this.tickets().length);
  readonly filteredCount = computed(() => this.filteredTickets().length);

  navigateToNew(): void {
    this.router.navigate(['/suporte/novo']);
  }

  onView(id: string): void {
    this.router.navigate(['/suporte', id]);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = MONTHS_PT[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year} às ${hours}:${minutes}`;
  }

  getCategoryBadge(category: string): { variant: 'danger' | 'info' | 'warning' | 'neutral'; text: string } {
    switch (category) {
      case 'bug': return { variant: 'danger', text: 'Bug' };
      case 'improvement': return { variant: 'info', text: 'Melhoria' };
      case 'question': return { variant: 'warning', text: 'Dúvida' };
      default: return { variant: 'neutral', text: 'Outro' };
    }
  }

  getPriorityBadge(priority: string): { variant: 'neutral' | 'warning' | 'danger'; text: string } {
    switch (priority) {
      case 'low': return { variant: 'neutral', text: 'Baixa' };
      case 'medium': return { variant: 'warning', text: 'Média' };
      case 'high': return { variant: 'danger', text: 'Alta' };
      case 'critical': return { variant: 'danger', text: 'Crítica' };
      default: return { variant: 'neutral', text: priority };
    }
  }

  getStatusBadge(status: string): { variant: 'info' | 'warning' | 'success' | 'neutral'; text: string } {
    switch (status) {
      case 'open': return { variant: 'info', text: 'Aberto' };
      case 'in_analysis': return { variant: 'warning', text: 'Em Análise' };
      case 'resolved': return { variant: 'success', text: 'Resolvido' };
      case 'closed': return { variant: 'neutral', text: 'Fechado' };
      default: return { variant: 'neutral', text: status };
    }
  }

  capitalizeModule(mod: string): string {
    if (!mod) return '';
    return mod.charAt(0).toUpperCase() + mod.slice(1);
  }
}
