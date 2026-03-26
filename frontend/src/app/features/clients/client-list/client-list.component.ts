import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  Building2,
  Plus,
  Eye,
  Pencil,
  AlertTriangle,
  Ban,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ISelectOption } from '../../../shared/components/select/select.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../shared/components/modal/modal-footer.directive';
import { TooltipDirective } from '../../../shared/components/tooltip/tooltip.directive';
import { TableComponent, TableColumn } from '../../../shared/components/table/table.component';
import { TableCellDirective } from '../../../shared/components/table/table-cell.directive';
import { ToastService } from '../../../core/services/toast.service';
import { IClient, MOCK_CLIENTS, MOCK_TAX_REGIMES } from '../data/client-mock';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    MultiSelectComponent,
    BadgeComponent,
    CardComponent,
    AvatarComponent,
    ModalComponent,
    ModalFooterDirective,
    TooltipDirective,
    TableComponent,
    TableCellDirective,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        Building2,
        Plus,
        Eye,
        Pencil,
        AlertTriangle,
        Ban,
      }),
      multi: true,
    },
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  // Icon data exposed for [img] binding (bypasses table provider shadowing)
  readonly banIcon = Ban;
  readonly building2Icon = Building2;

  readonly tableColumns: TableColumn[] = [
    { key: 'client', label: 'Cliente', width: 'auto' },
    { key: 'taxRegime', label: 'Regime Tributário', width: 'auto' },
    { key: 'responsible', label: 'Responsável', width: 'auto' },
    { key: 'employeeCount', label: 'Funcionários', width: '100px', align: 'center' as const },
    { key: 'status', label: 'Status', width: '100px' },
    { key: 'actions', label: 'Ações', width: '120px', align: 'center' as const },
  ];

  readonly clients = signal<IClient[]>([...MOCK_CLIENTS]);
  readonly taxRegimeOptions: ISelectOption[] = MOCK_TAX_REGIMES;
  readonly statusOptions: ISelectOption[] = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
  ];

  readonly searchQuery = signal('');
  readonly taxRegimeFilter = signal<string[]>([]);
  readonly statusFilter = signal<string[]>([]);

  readonly filteredClients = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const regimes = this.taxRegimeFilter();
    const statuses = this.statusFilter();

    return this.clients().filter(c => {
      if (query && !c.tradeName.toLowerCase().includes(query) && !c.cnpj.includes(query)) {
        return false;
      }
      if (regimes.length > 0 && !regimes.some(r => c.taxRegime === this.getTaxRegimeLabel(r))) {
        return false;
      }
      if (statuses.length > 0 && !statuses.includes(c.status)) {
        return false;
      }
      return true;
    });
  });

  readonly filteredClientsAsRecords = computed(() =>
    this.filteredClients().map(c => ({ ...c } as Record<string, unknown>))
  );

  readonly totalCount = computed(() => this.clients().length);
  readonly filteredCount = computed(() => this.filteredClients().length);

  // Modal state
  readonly statusModalOpen = signal(false);
  readonly selectedClient = signal<IClient | null>(null);
  readonly statusModalLoading = signal(false);

  readonly isDeactivating = computed(() => this.selectedClient()?.status === 'active');

  navigateToNew(): void {
    this.router.navigate(['/clientes/novo']);
  }

  onView(id: string): void {
    this.router.navigate(['/clientes', id]);
  }

  onEdit(id: string): void {
    this.router.navigate(['/clientes', id, 'editar']);
  }

  openStatusModal(client: IClient): void {
    this.selectedClient.set(client);
    this.statusModalOpen.set(true);
  }

  openStatusModalFromRow(row: Record<string, unknown>): void {
    const client = this.clients().find(c => c.id === row['id']);
    if (client) {
      this.openStatusModal(client);
    }
  }

  closeStatusModal(): void {
    this.statusModalOpen.set(false);
    setTimeout(() => this.selectedClient.set(null), 200);
  }

  confirmStatusChange(): void {
    const client = this.selectedClient();
    if (!client) return;

    this.statusModalLoading.set(true);

    setTimeout(() => {
      const isDeactivating = client.status === 'active';
      this.clients.update(list =>
        list.map(c =>
          c.id === client.id
            ? { ...c, status: isDeactivating ? 'inactive' as const : 'active' as const }
            : c
        )
      );

      this.statusModalLoading.set(false);
      this.statusModalOpen.set(false);
      this.selectedClient.set(null);

      this.toastService.success(
        isDeactivating
          ? 'Cliente desativado com sucesso'
          : 'Cliente reativado com sucesso'
      );
    }, 1000);
  }

  getTaxRegimeBadgeVariant(regime: string): 'info' | 'warning' | 'neutral' | 'success' {
    switch (regime) {
      case 'Simples Nacional': return 'info';
      case 'Lucro Presumido': return 'warning';
      case 'Lucro Real': return 'neutral';
      case 'MEI': return 'success';
      default: return 'neutral';
    }
  }

  private getTaxRegimeLabel(value: string): string {
    const found = this.taxRegimeOptions.find(r => r.value === value);
    return found ? found.label : '';
  }
}
