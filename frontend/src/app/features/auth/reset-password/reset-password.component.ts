import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Lock, CheckCircle } from 'lucide-angular';
import { PasswordInputComponent, PasswordStrength } from '../../../shared/components/password-input/password-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [PasswordInputComponent, ButtonComponent, LucideAngularModule],
  providers: [
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider({ Lock, CheckCircle }), multi: true },
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  password = signal('');
  confirmPassword = signal('');
  passwordError = signal('');
  confirmPasswordError = signal('');
  passwordStrength = signal<PasswordStrength | null>(null);
  isLoading = signal(false);
  isSuccess = signal(false);

  onPasswordStrengthChange(strength: PasswordStrength): void {
    this.passwordStrength.set(strength);
  }

  onSubmit(): void {
    this.passwordError.set('');
    this.confirmPasswordError.set('');

    const password = this.password();
    const confirmPassword = this.confirmPassword();
    let hasError = false;

    if (!password) {
      this.passwordError.set('Senha é obrigatória');
      hasError = true;
    } else if (this.passwordStrength() === 'weak') {
      this.passwordError.set('A senha precisa ser mais forte');
      hasError = true;
    }

    if (!confirmPassword) {
      this.confirmPasswordError.set('Confirmação é obrigatória');
      hasError = true;
    } else if (password && confirmPassword !== password) {
      this.confirmPasswordError.set('As senhas não coincidem');
      hasError = true;
    }

    if (hasError) return;

    this.isLoading.set(true);

    // TODO: Integrar com Supabase Auth — Fluxo de redefinição de senha:
    // 1. O usuário chega aqui após clicar no link de recuperação do e-mail
    // 2. O supabase-js detecta automaticamente os tokens na URL e cria uma sessão
    // 3. O evento PASSWORD_RECOVERY é emitido via onAuthStateChange (tratar no auth service ou app.component)
    // 4. Chamar: supabase.auth.updateUser({ password: novaSenha })
    // 5. Após sucesso, redirecionar para /login
    // 6. Proteger esta rota com auth guard — só acessível para usuários autenticados
    // 7. Tratar erros: sessão expirada, senha fraca rejeitada pelo Supabase, etc.
    setTimeout(() => {
      this.isLoading.set(false);
      this.isSuccess.set(true);
      this.toastService.success('Senha redefinida com sucesso!');
    }, 1500);
  }

  onGoToLogin(): void {
    this.router.navigate(['/login']);
  }
}
