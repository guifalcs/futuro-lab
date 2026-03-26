import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SelectComponent, ISelectOption } from '../../../shared/components/select/select.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { CardFooterDirective } from '../../../shared/components/card/card-footer.directive';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../shared/components/modal/modal-footer.directive';
import { ToastService } from '../../../core/services/toast.service';
import { MOCK_DEPARTMENTS, MOCK_ROLES } from '../data/team-mock';

@Component({
  selector: 'app-team-create',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    CardComponent,
    CardHeaderDirective,
    CardFooterDirective,
    ModalComponent,
    ModalFooterDirective,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft }),
      multi: true,
    },
  ],
  templateUrl: './team-create.component.html',
  styleUrl: './team-create.component.scss',
})
export class TeamCreateComponent {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  readonly departments: ISelectOption[] = MOCK_DEPARTMENTS;
  readonly roles: ISelectOption[] = MOCK_ROLES;

  // Form fields
  readonly name = signal('');
  readonly email = signal('');
  readonly role = signal('');
  readonly department = signal('');

  // Validation errors
  readonly nameError = signal('');
  readonly emailError = signal('');
  readonly roleError = signal('');
  readonly departmentError = signal('');

  // State
  readonly submitLoading = signal(false);
  readonly discardModalOpen = signal(false);

  readonly isDirty = computed(() =>
    this.name() !== '' ||
    this.email() !== '' ||
    this.role() !== '' ||
    this.department() !== ''
  );

  goBack(): void {
    this.router.navigate(['/equipe']);
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
    this.emailError.set('');
    this.roleError.set('');
    this.departmentError.set('');

    let hasError = false;

    if (!this.name().trim()) {
      this.nameError.set('Nome é obrigatório');
      hasError = true;
    }

    if (!this.email().trim()) {
      this.emailError.set('E-mail é obrigatório');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())) {
      this.emailError.set('E-mail inválido');
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
      this.toastService.success('Colaborador cadastrado com sucesso. Um e-mail de convite foi enviado.');
      this.goBack();
    }, 1500);
  }
}
