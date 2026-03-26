import { Component, computed, effect, ElementRef, inject, signal, untracked, viewChildren } from '@angular/core';
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
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../shared/components/modal/modal-footer.directive';
import { ToastService } from '../../../core/services/toast.service';
import { MOCK_TAX_REGIMES } from '../data/client-mock';
import { MOCK_COLLABORATORS } from '../../team/data/team-mock';
import { BRAZILIAN_STATES } from '../../../shared/data/brazilian-states';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    CardComponent,
    CardHeaderDirective,
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
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.scss',
})
export class ClientCreateComponent {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  readonly taxRegimeOptions: ISelectOption[] = MOCK_TAX_REGIMES;
  readonly stateOptions: ISelectOption[] = BRAZILIAN_STATES;
  readonly responsibleOptions: ISelectOption[] = MOCK_COLLABORATORS
    .filter(c => c.status === 'active')
    .map(c => ({ value: c.id, label: c.name }));

  // Form fields — Card 1: Dados da Empresa
  readonly companyName = signal('');
  readonly tradeName = signal('');
  readonly cnpj = signal('');
  readonly stateRegistration = signal('');
  readonly taxRegime = signal('');
  readonly mainCnae = signal('');
  readonly clientSince = signal('');
  readonly employeeCount = signal('');

  // Form fields — Card 2: Contato e Endereço
  readonly phone = signal('');
  readonly whatsapp = signal('');
  readonly email = signal('');
  readonly zipCode = signal('');
  readonly street = signal('');
  readonly addressNumber = signal('');
  readonly complement = signal('');
  readonly neighborhood = signal('');
  readonly city = signal('');
  readonly state = signal('');

  // Form fields — Card 3: Vínculo e Observações
  readonly responsibleId = signal('');
  readonly notes = signal('');

  // Validation errors
  readonly companyNameError = signal('');
  readonly tradeNameError = signal('');
  readonly cnpjError = signal('');
  readonly taxRegimeError = signal('');
  readonly emailError = signal('');
  readonly responsibleError = signal('');

  // State
  readonly submitLoading = signal(false);
  readonly discardModalOpen = signal(false);
  readonly cepLoading = signal(false);

  // Query all error-field containers for scrolling
  readonly errorFields = viewChildren<ElementRef>('errorField');

  private readonly cnpjMaskEffect = effect(() => {
    const raw = this.cnpj();
    const formatted = this.applyCnpjMask(raw);
    if (formatted !== raw) {
      untracked(() => this.cnpj.set(formatted));
    }
  });

  readonly isDirty = computed(() =>
    this.companyName() !== '' ||
    this.tradeName() !== '' ||
    this.cnpj() !== '' ||
    this.stateRegistration() !== '' ||
    this.taxRegime() !== '' ||
    this.mainCnae() !== '' ||
    this.clientSince() !== '' ||
    this.employeeCount() !== '' ||
    this.phone() !== '' ||
    this.whatsapp() !== '' ||
    this.email() !== '' ||
    this.zipCode() !== '' ||
    this.street() !== '' ||
    this.addressNumber() !== '' ||
    this.complement() !== '' ||
    this.neighborhood() !== '' ||
    this.city() !== '' ||
    this.state() !== '' ||
    this.responsibleId() !== '' ||
    this.notes() !== ''
  );

  goBack(): void {
    this.router.navigate(['/clientes']);
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

  onCepBlur(): void {
    const cepDigits = this.zipCode().replace(/\D/g, '');
    if (cepDigits.length >= 8) {
      this.cepLoading.set(true);
      setTimeout(() => {
        this.street.set('Rua Exemplo');
        this.neighborhood.set('Centro');
        this.city.set('Ipatinga');
        this.state.set('MG');
        this.cepLoading.set(false);
      }, 500);
    }
  }

  onSubmit(): void {
    this.companyNameError.set('');
    this.tradeNameError.set('');
    this.cnpjError.set('');
    this.taxRegimeError.set('');
    this.emailError.set('');
    this.responsibleError.set('');

    let hasError = false;

    if (!this.companyName().trim()) {
      this.companyNameError.set('Razão social é obrigatória');
      hasError = true;
    }

    if (!this.tradeName().trim()) {
      this.tradeNameError.set('Nome fantasia é obrigatório');
      hasError = true;
    }

    const cnpjDigits = this.cnpj().replace(/\D/g, '');
    if (!this.cnpj().trim()) {
      this.cnpjError.set('CNPJ é obrigatório');
      hasError = true;
    } else if (cnpjDigits.length !== 14) {
      this.cnpjError.set('CNPJ inválido');
      hasError = true;
    }

    if (!this.taxRegime()) {
      this.taxRegimeError.set('Regime tributário é obrigatório');
      hasError = true;
    }

    if (!this.email().trim()) {
      this.emailError.set('E-mail é obrigatório');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())) {
      this.emailError.set('E-mail inválido');
      hasError = true;
    }

    if (!this.responsibleId()) {
      this.responsibleError.set('Responsável é obrigatório');
      hasError = true;
    }

    if (hasError) {
      this.toastService.error('Preencha todos os campos obrigatórios corretamente');
      this.scrollToFirstError();
      return;
    }

    this.submitLoading.set(true);

    setTimeout(() => {
      this.submitLoading.set(false);
      this.toastService.success('Cliente cadastrado com sucesso');
      this.goBack();
    }, 1500);
  }

  private applyCnpjMask(value: string): string {
    const d = value.replace(/\D/g, '').slice(0, 14);
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
    if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
    if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  }

  private scrollToFirstError(): void {
    const errorSignals = [
      this.companyNameError,
      this.tradeNameError,
      this.cnpjError,
      this.taxRegimeError,
      this.emailError,
      this.responsibleError,
    ];

    const fields = this.errorFields();
    for (let i = 0; i < errorSignals.length; i++) {
      if (errorSignals[i]() && fields[i]) {
        fields[i].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  }
}
