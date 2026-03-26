import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { ChangePasswordComponent } from '../app/features/profile/change-password/change-password.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

@Component({
  selector: 'app-change-password-story',
  standalone: true,
  imports: [ChangePasswordComponent, ToastComponent],
  template: `
    <app-change-password #changePassword></app-change-password>
    <app-toast />
  `,
})
class ChangePasswordStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(ChangePasswordComponent)
  changePassword?: ChangePasswordComponent;

  @Input() currentPassword = '';
  @Input() newPassword = '';
  @Input() confirmPassword = '';
  @Input() currentPasswordError = '';
  @Input() newPasswordError = '';
  @Input() confirmPasswordError = '';
  @Input() loading = false;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.changePassword) return;

    this.changePassword.currentPassword.set(this.currentPassword);
    this.changePassword.newPassword.set(this.newPassword);
    this.changePassword.confirmPassword.set(this.confirmPassword);
    this.changePassword.currentPasswordError.set(this.currentPasswordError);
    this.changePassword.newPasswordError.set(this.newPasswordError);
    this.changePassword.confirmPasswordError.set(this.confirmPasswordError);
    this.changePassword.isLoading.set(this.loading);
  }
}

const meta: Meta<ChangePasswordStoryComponent> = {
  title: 'Pages/ChangePassword',
  component: ChangePasswordStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ChangePasswordStoryComponent>;

export const Default: Story = {};

export const WithValidationErrors: Story = {
  args: {
    currentPassword: 'SenhaAtual123!',
    newPassword: 'NovaSenha123!',
    confirmPassword: 'NovaSenhaDiferente',
    confirmPasswordError: 'As senhas não coincidem',
  },
};
