import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ForgotPasswordComponent } from '../app/features/auth/forgot-password/forgot-password.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

@Component({
  selector: 'app-forgot-password-story',
  standalone: true,
  imports: [ForgotPasswordComponent, ToastComponent],
  template: `
    <app-forgot-password #forgotPassword></app-forgot-password>
    <app-toast />
  `,
})
class ForgotPasswordStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(ForgotPasswordComponent)
  forgotPassword?: ForgotPasswordComponent;

  @Input() email = '';
  @Input() emailError = '';
  @Input() loading = false;
  @Input() success = false;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.forgotPassword) return;

    this.forgotPassword.email.set(this.email);
    this.forgotPassword.emailError.set(this.emailError);
    this.forgotPassword.isLoading.set(this.loading);
    this.forgotPassword.isSuccess.set(this.success);
  }
}

const meta: Meta<ForgotPasswordStoryComponent> = {
  title: 'Pages/ForgotPassword',
  component: ForgotPasswordStoryComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;
type Story = StoryObj<ForgotPasswordStoryComponent>;

export const Default: Story = {};

export const WithValidationError: Story = {
  args: {
    emailError: 'E-mail inválido',
  },
};

export const Loading: Story = {
  args: {
    email: 'usuario@email.com',
    loading: true,
  },
};

export const SuccessState: Story = {
  args: {
    email: 'usuario@email.com',
    success: true,
  },
};
