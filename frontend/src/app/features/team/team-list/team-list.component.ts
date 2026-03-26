import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  Users,
  UserPlus,
  UserX,
  UserCheck,
  Eye,
  Pencil,
  AlertTriangle,
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
import { ICollaborator, MOCK_COLLABORATORS, MOCK_DEPARTMENTS } from '../data/team-mock';

@Component({
  selector: 'app-team-list',
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
        Users,
        UserPlus,
        UserX,
        UserCheck,
        Eye,
        Pencil,
        AlertTriangle,
      }),
      multi: true,
    },
  ],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss',
})
export class TeamListComponent {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  readonly tableColumns: TableColumn[] = [
    { key: 'collaborator', label: 'Colaborador', width: 'auto' },
    { key: 'role', label: 'Cargo', width: 'auto' },
    { key: 'department', label: 'Departamento', width: 'auto' },
    { key: 'profile', label: 'Perfil', width: '130px' },
    { key: 'status', label: 'Status', width: '100px' },
    { key: 'actions', label: 'Ações', width: '120px', align: 'center' as const },
  ];

  readonly collaborators = signal<ICollaborator[]>([...MOCK_COLLABORATORS]);
  readonly departments: ISelectOption[] = MOCK_DEPARTMENTS;
  readonly statusOptions: ISelectOption[] = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
  ];
  readonly presenceOptions: ISelectOption[] = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'away', label: 'Ausente' },
  ];

  readonly searchQuery = signal('');
  readonly departmentFilter = signal<string[]>([]);
  readonly statusFilter = signal<string[]>([]);
  readonly presenceFilter = signal<string[]>([]);

  readonly filteredCollaborators = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const depts = this.departmentFilter();
    const statuses = this.statusFilter();
    const presences = this.presenceFilter();

    return this.collaborators().filter(c => {
      if (query && !c.name.toLowerCase().includes(query) && !c.email.toLowerCase().includes(query)) {
        return false;
      }
      if (depts.length > 0 && !depts.some(d => c.department === this.getDepartmentLabel(d))) {
        return false;
      }
      if (statuses.length > 0 && !statuses.includes(c.status)) {
        return false;
      }
      if (presences.length > 0 && !presences.includes(c.presence)) {
        return false;
      }
      return true;
    });
  });

  readonly filteredCollaboratorsAsRecords = computed(() =>
    this.filteredCollaborators().map(c => ({ ...c } as Record<string, unknown>))
  );

  readonly totalCount = computed(() => this.collaborators().length);
  readonly filteredCount = computed(() => this.filteredCollaborators().length);

  // Modal state
  readonly statusModalOpen = signal(false);
  readonly selectedCollaborator = signal<ICollaborator | null>(null);
  readonly statusModalLoading = signal(false);

  readonly isDeactivating = computed(() => this.selectedCollaborator()?.status === 'active');

  navigateToNew(): void {
    this.router.navigate(['/equipe/novo']);
  }

  onView(id: string): void {
    this.router.navigate(['/equipe', id]);
  }

  onEdit(id: string): void {
    this.router.navigate(['/equipe', id, 'editar']);
  }

  openStatusModal(collaborator: ICollaborator): void {
    this.selectedCollaborator.set(collaborator);
    this.statusModalOpen.set(true);
  }

  openStatusModalFromRow(row: Record<string, unknown>): void {
    const collaborator = this.collaborators().find(c => c.id === row['id']);
    if (collaborator) {
      this.openStatusModal(collaborator);
    }
  }

  closeStatusModal(): void {
    this.statusModalOpen.set(false);
    setTimeout(() => this.selectedCollaborator.set(null), 200);
  }

  confirmStatusChange(): void {
    const collaborator = this.selectedCollaborator();
    if (!collaborator) return;

    this.statusModalLoading.set(true);

    setTimeout(() => {
      const isDeactivating = collaborator.status === 'active';
      this.collaborators.update(list =>
        list.map(c =>
          c.id === collaborator.id
            ? {
                ...c,
                status: isDeactivating ? 'inactive' as const : 'active' as const,
                presence: isDeactivating ? 'offline' as const : c.presence,
              }
            : c
        )
      );

      this.statusModalLoading.set(false);
      this.statusModalOpen.set(false);
      this.selectedCollaborator.set(null);

      this.toastService.success(
        isDeactivating
          ? 'Colaborador desativado com sucesso'
          : 'Colaborador reativado com sucesso'
      );
    }, 1000);
  }

  private getDepartmentLabel(value: string): string {
    const found = this.departments.find(d => d.value === value);
    return found ? found.label : '';
  }
}
