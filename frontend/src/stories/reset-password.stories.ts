import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ResetPasswordComponent } from '../app/features/auth/reset-password/reset-password.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

@Component({
  selector: 'app-reset-password-story',
  standalone: true,
  imports: [ResetPasswordComponent, ToastComponent],
  template: `
    <app-reset-password #resetPassword></app-reset-password>
    <app-toast />
  `,
})
class ResetPasswordStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(ResetPasswordComponent)
  resetPassword?: ResetPasswordComponent;

  @Input() password = '';
  @Input() confirmPassword = '';
  @Input() passwordError = '';
  @Input() confirmPasswordError = '';
  @Input() loading = false;
  @Input() success = false;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.resetPassword) return;

    this.resetPassword.password.set(this.password);
    this.resetPassword.confirmPassword.set(this.confirmPassword);
    this.resetPassword.passwordError.set(this.passwordError);
    this.resetPassword.confirmPasswordError.set(this.confirmPasswordError);
    this.resetPassword.isLoading.set(this.loading);
    this.resetPassword.isSuccess.set(this.success);
  }
}

const meta: Meta<ResetPasswordStoryComponent> = {
  title: 'Pages/ResetPassword',
  component: ResetPasswordStoryComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;
type Story = StoryObj<ResetPasswordStoryComponent>;

export const Default: Story = {};

export const WithValidationErrors: Story = {
  args: {
    passwordError: 'Senha é obrigatória',
    confirmPasswordError: 'Confirmação é obrigatória',
  },
};

export const PasswordsDontMatch: Story = {
  args: {
    password: 'SenhaForte123!',
    confirmPassword: 'SenhaDiferente',
    confirmPasswordError: 'As senhas não coincidem',
  },
};

export const Loading: Story = {
  args: {
    password: 'SenhaForte123!',
    confirmPassword: 'SenhaForte123!',
    loading: true,
  },
};

export const SuccessState: Story = {
  args: {
    success: true,
  },
};
