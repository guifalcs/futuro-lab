import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { InputComponent } from '../app/shared/components/input/input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'number', 'tel', 'url', 'search'],
    },
  },
  // Defaults explícitos garantem que todos os props estão sempre no context do template
  args: {
    type: 'text',
    placeholder: '',
    label: '',
    error: '',
    disabled: false,
    required: false,
    value: '',
    focused: fn(),
    blurred: fn(),
  },
  render: (args) => ({
    props: args,
    template: `<app-input
      [type]="type"
      [placeholder]="placeholder"
      [label]="label"
      [error]="error"
      [disabled]="disabled"
      [required]="required"
      [value]="value"
      (focused)="focused()"
      (blurred)="blurred()"
    />`,
  }),
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Nome completo',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'email@exemplo.com',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Campo obrigatório',
    placeholder: 'Preenchimento obrigatório',
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'email@exemplo.com',
    type: 'email',
    value: 'email-invalido',
    error: 'Informe um e-mail válido.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    value: 'Valor somente leitura',
    disabled: true,
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Buscar...',
  },
};
