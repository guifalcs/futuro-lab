import { Component, afterNextRender, computed, effect, inject, signal, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  Building2,
  Ban,
  AlertTriangle,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SelectComponent, ISelectOption } from '../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../shared/components/modal/modal-footer.directive';
import { ToastService } from '../../../core/services/toast.service';
import { IClient, MOCK_CLIENTS, MOCK_TAX_REGIMES } from '../data/client-mock';
import { MOCK_COLLABORATORS } from '../../team/data/team-mock';
import { BRAZILIAN_STATES } from '../../../shared/data/brazilian-states';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    CardComponent,
    CardHeaderDirective,
    BadgeComponent,
    ModalComponent,
    ModalFooterDirective,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, Building2, Ban, AlertTriangle }),
      multi: true,
    },
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss',
})
export class ClientEditComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);

  // Icon data for [img] binding (bypasses child component provider shadowing)
  readonly banIcon = Ban;
  readonly building2Icon = Building2;

  readonly taxRegimeOptions: ISelectOption[] = MOCK_TAX_REGIMES;
  readonly stateOptions: ISelectOption[] = BRAZILIAN_STATES;
  readonly responsibleOptions: ISelectOption[] = MOCK_COLLABORATORS
    .filter(c => c.status === 'active')
    .map(c => ({ value: c.id, label: c.name }));

  readonly client = signal<IClient | null>(null);
  readonly notFound = signal(false);

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

  // Original values for dirty check
  private originalValues: Record<string, string> = {};

  // Validation errors
  readonly companyNameError = signal('');
  readonly tradeNameError = signal('');
  readonly taxRegimeError = signal('');
  readonly emailError = signal('');
  readonly responsibleError = signal('');

  // State
  readonly submitLoading = signal(false);
  readonly statusModalOpen = signal(false);
  readonly statusModalLoading = signal(false);
  readonly discardModalOpen = signal(false);
  readonly cepLoading = signal(false);

  readonly isActive = computed(() => this.client()?.status === 'active');

  private readonly cnpjMaskEffect = effect(() => {
    const raw = this.cnpj();
    const formatted = this.applyCnpjMask(raw);
    if (formatted !== raw) {
      untracked(() => this.cnpj.set(formatted));
    }
  });

  readonly isDirty = computed(() => {
    const o = this.originalValues;
    return (
      this.companyName() !== o['companyName'] ||
      this.tradeName() !== o['tradeName'] ||
      this.stateRegistration() !== o['stateRegistration'] ||
      this.taxRegime() !== o['taxRegime'] ||
      this.mainCnae() !== o['mainCnae'] ||
      this.employeeCount() !== o['employeeCount'] ||
      this.phone() !== o['phone'] ||
      this.whatsapp() !== o['whatsapp'] ||
      this.email() !== o['email'] ||
      this.zipCode() !== o['zipCode'] ||
      this.street() !== o['street'] ||
      this.addressNumber() !== o['addressNumber'] ||
      this.complement() !== o['complement'] ||
      this.neighborhood() !== o['neighborhood'] ||
      this.city() !== o['city'] ||
      this.state() !== o['state'] ||
      this.responsibleId() !== o['responsibleId'] ||
      this.notes() !== o['notes']
    );
  });

  constructor() {
    afterNextRender(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadClient(id);
      } else {
        this.notFound.set(true);
      }
    });
  }

  private loadClient(id: string): void {
    const found = MOCK_CLIENTS.find(c => c.id === id);
    if (!found) {
      this.notFound.set(true);
      return;
    }

    this.client.set(found);

    const regimeValue = this.taxRegimeOptions.find(r => r.label === found.taxRegime)?.value ?? '';

    this.companyName.set(found.companyName);
    this.tradeName.set(found.tradeName);
    this.cnpj.set(found.cnpj);
    this.stateRegistration.set(found.stateRegistration);
    this.taxRegime.set(regimeValue);
    this.mainCnae.set(found.mainCnae);
    this.clientSince.set(this.formatDateBR(found.clientSince));
    this.employeeCount.set(found.employeeCount.toString());
    this.phone.set(found.phone);
    this.whatsapp.set(found.whatsapp);
    this.email.set(found.email);
    this.zipCode.set(found.address.zipCode);
    this.street.set(found.address.street);
    this.addressNumber.set(found.address.number);
    this.complement.set(found.address.complement);
    this.neighborhood.set(found.address.neighborhood);
    this.city.set(found.address.city);
    this.state.set(found.address.state);
    this.responsibleId.set(found.responsibleId);
    this.notes.set(found.notes);

    this.originalValues = {
      companyName: found.companyName,
      tradeName: found.tradeName,
      stateRegistration: found.stateRegistration,
      taxRegime: regimeValue,
      mainCnae: found.mainCnae,
      employeeCount: found.employeeCount.toString(),
      phone: found.phone,
      whatsapp: found.whatsapp,
      email: found.email,
      zipCode: found.address.zipCode,
      street: found.address.street,
      addressNumber: found.address.number,
      complement: found.address.complement,
      neighborhood: found.address.neighborhood,
      city: found.address.city,
      state: found.address.state,
      responsibleId: found.responsibleId,
      notes: found.notes,
    };
  }

  goBack(): void {
    this.router.navigate(['/clientes']);
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

  onCepBlur(): void {
    const cepDigits = this.zipCode().replace(/\D/g, '');
    if (cepDigits.length >= 8) {
      this.cepLoading.set(true);
      setTimeout(() => {
        // Simulated: keep current address data (mock behavior)
        this.cepLoading.set(false);
      }, 500);
    }
  }

  onSubmit(): void {
    this.companyNameError.set('');
    this.tradeNameError.set('');
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
      return;
    }

    this.submitLoading.set(true);

    setTimeout(() => {
      this.submitLoading.set(false);
      this.toastService.success('Cliente atualizado com sucesso');
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
    const current = this.client();
    if (!current) return;

    this.statusModalLoading.set(true);

    setTimeout(() => {
      const isDeactivating = current.status === 'active';
      const updated: IClient = {
        ...current,
        status: isDeactivating ? 'inactive' : 'active',
      };

      const idx = MOCK_CLIENTS.findIndex(c => c.id === current.id);
      if (idx !== -1) {
        MOCK_CLIENTS[idx] = updated;
      }

      this.client.set(updated);
      this.statusModalLoading.set(false);
      this.statusModalOpen.set(false);

      this.toastService.success(
        isDeactivating
          ? 'Cliente desativado com sucesso'
          : 'Cliente reativado com sucesso'
      );
    }, 1000);
  }

  private applyCnpjMask(value: string): string {
    const d = value.replace(/\D/g, '').slice(0, 14);
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
    if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
    if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  }

  private formatDateBR(isoDate: string): string {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  }
}
