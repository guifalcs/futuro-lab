import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { PasswordInputComponent } from '../app/shared/components/password-input/password-input.component';

const meta: Meta<PasswordInputComponent> = {
  title: 'Components/PasswordInput',
  component: PasswordInputComponent,
  tags: ['autodocs'],
  argTypes: {
    showStrength: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    minLength: { control: 'number' },
  },
  args: {
    placeholder: '',
    label: 'Senha',
    error: '',
    disabled: false,
    required: false,
    value: '',
    showStrength: true,
    minLength: 8,
    strengthChange: fn(),
    focused: fn(),
    blurred: fn(),
  },
  render: (args) => ({
    props: args,
    template: `<app-password-input
      [placeholder]="placeholder"
      [label]="label"
      [error]="error"
      [disabled]="disabled"
      [required]="required"
      [value]="value"
      [showStrength]="showStrength"
      [minLength]="minLength"
      (strengthChange)="strengthChange($event)"
      (focused)="focused()"
      (blurred)="blurred()"
    />`,
  }),
};

export default meta;
type Story = StoryObj<PasswordInputComponent>;

export const Default: Story = {
  args: {},
};

export const WithValueWeak: Story = {
  name: 'With Value (Fraca)',
  args: {
    value: 'abc',
  },
};

export const WithValueMedium: Story = {
  name: 'With Value (Média)',
  args: {
    value: 'Abcdef1',
  },
};

export const WithValueStrong: Story = {
  name: 'With Value (Forte)',
  args: {
    value: 'Abcdef1!',
  },
};

export const WithError: Story = {
  args: {
    value: 'senha123',
    error: 'Senha incorreta. Tente novamente.',
  },
};

export const Disabled: Story = {
  args: {
    value: 'senhasecreta',
    disabled: true,
  },
};

export const WithoutStrengthIndicator: Story = {
  name: 'Sem Indicador de Força',
  args: {
    showStrength: false,
    placeholder: 'Digite sua senha',
  },
};

export const CustomMinLength: Story = {
  name: 'Comprimento Mínimo Customizado (12)',
  args: {
    minLength: 12,
    value: 'Abcdef1!',
  },
};
