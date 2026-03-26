import { Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { SelectComponent, ISelectOption } from '../../shared/components/select/select.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent, CardPadding } from '../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../shared/components/card/card-header.directive';
import { CardFooterDirective } from '../../shared/components/card/card-footer.directive';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    InputComponent,
    SelectComponent,
    ButtonComponent,
    CardComponent,
    CardHeaderDirective,
    CardFooterDirective,
    AvatarComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly toastService = inject(ToastService);

  fullName = signal('Sirlene Sales');
  email = signal('sirlene@statuscontabilidade.com.br');
  roleId = signal('gestora');
  departmentId = signal('departamento-pessoal');
  nameError = signal('');
  isLoading = signal(false);
  isMobile = signal(false);

  roleOptions = signal<ISelectOption[]>([
    { value: 'gestora', label: 'Gestora' },
    { value: 'coordenadora', label: 'Coordenadora' },
    { value: 'assistente', label: 'Assistente' },
  ]);

  departmentOptions = signal<ISelectOption[]>([
    { value: 'departamento-pessoal', label: 'Departamento Pessoal' },
    { value: 'contabil', label: 'Contábil' },
    { value: 'fiscal', label: 'Fiscal' },
  ]);

  cardPadding = computed<CardPadding>(() => (this.isMobile() ? 'sm' : 'md'));
  avatarSize = computed<'lg' | 'xl'>(() => (this.isMobile() ? 'lg' : 'xl'));

  ngOnInit(): void {
    this.updateLayout();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateLayout();
  }

  onSave(): void {
    this.nameError.set('');

    const name = this.fullName().trim();
    if (!name) {
      this.nameError.set('Nome é obrigatório');
      return;
    }

    this.fullName.set(name);
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      this.toastService.success('Perfil atualizado com sucesso');
    }, 1500);
  }

  private updateLayout(): void {
    this.isMobile.set(window.innerWidth < 768);
  }
}
