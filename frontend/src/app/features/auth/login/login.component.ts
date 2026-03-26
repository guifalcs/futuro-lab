import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, PasswordInputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  email = signal('');
  password = signal('');
  emailError = signal('');
  passwordError = signal('');
  isLoading = signal(false);

  onSubmit(): void {
    this.emailError.set('');
    this.passwordError.set('');

    const email = this.email().trim();
    const password = this.password();
    let hasError = false;

    if (!email) {
      this.emailError.set('E-mail é obrigatório');
      hasError = true;
    } else if (!this.isValidEmail(email)) {
      this.emailError.set('E-mail inválido');
      hasError = true;
    }

    if (!password) {
      this.passwordError.set('Senha é obrigatória');
      hasError = true;
    }

    if (hasError) return;

    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.toastService.error('Credenciais inválidas');
    }, 1500);
  }

  onForgotPassword(): void {
    this.router.navigate(['/login/forgot-password']);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
