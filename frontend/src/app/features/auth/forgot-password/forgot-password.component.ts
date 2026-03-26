import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowLeft, Mail, CheckCircle } from 'lucide-angular';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [InputComponent, ButtonComponent, LucideAngularModule],
  providers: [
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider({ ArrowLeft, Mail, CheckCircle }), multi: true },
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  email = signal('');
  emailError = signal('');
  isLoading = signal(false);
  isSuccess = signal(false);

  sentEmail = computed(() => this.email());

  onSubmit(): void {
    this.emailError.set('');

    const email = this.email().trim();

    if (!email) {
      this.emailError.set('E-mail é obrigatório');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.emailError.set('E-mail inválido');
      return;
    }

    this.isLoading.set(true);

    // TODO: Integrar com Supabase Auth — Fluxo de recuperação de senha:
    // 1. Chamar: supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login/reset-password` })
    // 2. O redirectTo DEVE ser URL absoluta e estar na lista de Redirect URLs no dashboard Supabase
    // 3. O Supabase envia e-mail com link de recuperação ao usuário
    // 4. Ao clicar no link, o Supabase redireciona para /login/reset-password com tokens na URL
    // 5. O supabase-js detecta os tokens e emite evento PASSWORD_RECOVERY via onAuthStateChange
    // 6. Tratar erros: e-mail não encontrado, rate limit (2/hora no plano free), etc.
    setTimeout(() => {
      this.isLoading.set(false);
      this.isSuccess.set(true);
      this.toastService.success('Link de recuperação enviado!');
    }, 1500);
  }

  onBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  onResendEmail(): void {
    this.isSuccess.set(false);
    this.emailError.set('');
    this.isLoading.set(false);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
