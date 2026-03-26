import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  UserX,
  UserCheck,
  AlertTriangle,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SelectComponent, ISelectOption } from '../../../shared/components/select/select.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { CardFooterDirective } from '../../../shared/components/card/card-footer.directive';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../shared/components/modal/modal-footer.directive';
import { ToastService } from '../../../core/services/toast.service';
import { ICollaborator, MOCK_COLLABORATORS, MOCK_DEPARTMENTS, MOCK_ROLES } from '../data/team-mock';

@Component({
  selector: 'app-team-edit',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    CardComponent,
    CardHeaderDirective,
    CardFooterDirective,
    AvatarComponent,
    BadgeComponent,
    ModalComponent,
    ModalFooterDirective,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, UserX, UserCheck, AlertTriangle }),
      multi: true,
    },
  ],
  templateUrl: './team-edit.component.html',
  styleUrl: './team-edit.component.scss',
})
export class TeamEditComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);

  readonly departments: ISelectOption[] = MOCK_DEPARTMENTS;
  readonly roles: ISelectOption[] = MOCK_ROLES;

  readonly collaborator = signal<ICollaborator | null>(null);
  readonly notFound = signal(false);

  // Form fields
  readonly name = signal('');
  readonly email = signal('');
  readonly role = signal('');
  readonly department = signal('');

  // Original values for dirty check
  private originalName = '';
  private originalRole = '';
  private originalDepartment = '';

  // Validation errors
  readonly nameError = signal('');
  readonly roleError = signal('');
  readonly departmentError = signal('');

  // State
  readonly submitLoading = signal(false);
  readonly statusModalOpen = signal(false);
  readonly statusModalLoading = signal(false);
  readonly discardModalOpen = signal(false);

  readonly isActive = computed(() => this.collaborator()?.status === 'active');

  readonly isDirty = computed(() =>
    this.name() !== this.originalName ||
    this.role() !== this.originalRole ||
    this.department() !== this.originalDepartment
  );

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCollaborator(id);
    } else {
      this.notFound.set(true);
    }
  }

  private loadCollaborator(id: string): void {
    const found = MOCK_COLLABORATORS.find(c => c.id === id);
    if (!found) {
      this.notFound.set(true);
      return;
    }

    this.collaborator.set(found);

    const roleValue = this.roles.find(r => r.label === found.role)?.value ?? '';
    const deptValue = this.departments.find(d => d.label === found.department)?.value ?? '';

    this.name.set(found.name);
    this.email.set(found.email);
    this.role.set(roleValue);
    this.department.set(deptValue);

    this.originalName = found.name;
    this.originalRole = roleValue;
    this.originalDepartment = deptValue;
  }

  goBack(): void {
    this.router.navigate(['/equipe']);
  }

  onBackClick(): void {
    if (this.isDirty()) {
      this.discardModalOpen.set(true);
    } else {
      this.goBack();
    }
  }

  onCancel(): void {
    if (this.isDirty()) {
      this.discardModalOpen.set(true);
    } else {
      this.goBack();
    }
  }

  closeDiscardModal(): void {
    this.discardModalOpen.set(false);
  }

  confirmDiscard(): void {
    this.discardModalOpen.set(false);
    this.goBack();
  }

  onSubmit(): void {
    this.nameError.set('');
    this.roleError.set('');
    this.departmentError.set('');

    let hasError = false;

    if (!this.name().trim()) {
      this.nameError.set('Nome é obrigatório');
      hasError = true;
    }

    if (!this.role()) {
      this.roleError.set('Cargo é obrigatório');
      hasError = true;
    }

    if (!this.department()) {
      this.departmentError.set('Departamento é obrigatório');
      hasError = true;
    }

    if (hasError) {
      this.toastService.error('Preencha todos os campos obrigatórios corretamente');
      return;
    }

    this.submitLoading.set(true);

    setTimeout(() => {
      this.submitLoading.set(false);
      this.toastService.success('Colaborador atualizado com sucesso');
      this.goBack();
    }, 1500);
  }

  openStatusModal(): void {
    this.statusModalOpen.set(true);
  }

  closeStatusModal(): void {
    this.statusModalOpen.set(false);
  }

  confirmStatusChange(): void {
    const collab = this.collaborator();
    if (!collab) return;

    this.statusModalLoading.set(true);

    setTimeout(() => {
      const isDeactivating = collab.status === 'active';
      const updated: ICollaborator = {
        ...collab,
        status: isDeactivating ? 'inactive' : 'active',
        presence: isDeactivating ? 'offline' : collab.presence,
      };

      // Update in mock array
      const idx = MOCK_COLLABORATORS.findIndex(c => c.id === collab.id);
      if (idx !== -1) {
        MOCK_COLLABORATORS[idx] = updated;
      }

      this.collaborator.set(updated);
      this.statusModalLoading.set(false);
      this.statusModalOpen.set(false);

      this.toastService.success(
        isDeactivating
          ? 'Colaborador desativado com sucesso'
          : 'Colaborador reativado com sucesso'
      );
    }, 1000);
  }
}
