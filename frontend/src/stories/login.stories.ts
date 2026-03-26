import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { LoginComponent } from '../app/features/auth/login/login.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

const meta: Meta<LoginComponent> = {
  title: 'Pages/Login',
  component: LoginComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ToastComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <app-login></app-login>
      <app-toast />
    `,
  }),
};

export default meta;
type Story = StoryObj<LoginComponent>;

export const Default: Story = {};

export const WithValidationErrors: Story = {
  render: (args) => ({
    props: {
      ...args,
      onInit: (component: LoginComponent) => {
        component.emailError.set('E-mail inválido');
        component.passwordError.set('Senha é obrigatória');
      },
    },
    template: `
      <div>
        <app-login></app-login>
        <app-toast />
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: (args) => ({
    props: {
      ...args,
      onInit: (component: LoginComponent) => {
        component.email.set('usuario@email.com');
        component.password.set('senha123');
        component.isLoading.set(true);
      },
    },
    template: `
      <div>
        <app-login></app-login>
        <app-toast />
      </div>
    `,
  }),
};
