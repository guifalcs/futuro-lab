import { Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { PasswordInputComponent, PasswordStrength } from '../../../shared/components/password-input/password-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent, CardPadding } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { CardFooterDirective } from '../../../shared/components/card/card-footer.directive';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    PasswordInputComponent,
    ButtonComponent,
    CardComponent,
    CardHeaderDirective,
    CardFooterDirective,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  private readonly toastService = inject(ToastService);

  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');

  currentPasswordError = signal('');
  newPasswordError = signal('');
  confirmPasswordError = signal('');

  newPasswordStrength = signal<PasswordStrength | null>(null);

  isLoading = signal(false);
  isMobile = signal(false);

  cardPadding = computed<CardPadding>(() => (this.isMobile() ? 'sm' : 'md'));

  ngOnInit(): void {
    this.updateLayout();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateLayout();
  }

  onStrengthChange(strength: PasswordStrength): void {
    this.newPasswordStrength.set(strength);
  }

  onSubmit(): void {
    this.currentPasswordError.set('');
    this.newPasswordError.set('');
    this.confirmPasswordError.set('');

    const current = this.currentPassword();
    const next = this.newPassword();
    const confirm = this.confirmPassword();
    let hasError = false;

    if (!current) {
      this.currentPasswordError.set('Senha atual é obrigatória');
      hasError = true;
    }

    if (!next) {
      this.newPasswordError.set('Nova senha é obrigatória');
      hasError = true;
    } else if (this.newPasswordStrength() === 'weak') {
      this.newPasswordError.set('A senha precisa ser mais forte');
      hasError = true;
    }

    if (!confirm) {
      this.confirmPasswordError.set('Confirmação é obrigatória');
      hasError = true;
    } else if (next && confirm !== next) {
      this.confirmPasswordError.set('As senhas não coincidem');
      hasError = true;
    }

    if (hasError) return;

    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      this.currentPassword.set('');
      this.newPassword.set('');
      this.confirmPassword.set('');
      this.newPasswordStrength.set(null);
      this.toastService.success('Senha alterada com sucesso');
    }, 1500);
  }

  private updateLayout(): void {
    this.isMobile.set(window.innerWidth < 768);
  }
}
