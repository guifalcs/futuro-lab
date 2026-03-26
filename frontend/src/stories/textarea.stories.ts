import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { TextareaComponent } from '../app/shared/components/textarea/textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both'],
    },
  },
  args: {
    placeholder: '',
    label: '',
    error: '',
    disabled: false,
    required: false,
    value: '',
    rows: 4,
    maxLength: null,
    resize: 'vertical',
    focused: fn(),
    blurred: fn(),
  },
  render: (args) => ({
    props: args,
    template: `<app-textarea
      [placeholder]="placeholder"
      [label]="label"
      [error]="error"
      [disabled]="disabled"
      [required]="required"
      [value]="value"
      [rows]="rows"
      [maxLength]="maxLength"
      [resize]="resize"
      (focused)="focused()"
      (blurred)="blurred()"
    />`,
  }),
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Observações',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Mensagem',
    placeholder: 'Digite sua mensagem...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Descrição',
    value: 'Texto já preenchido para demonstrar o componente.',
  },
};

export const Required: Story = {
  args: {
    label: 'Justificativa',
    required: true,
    placeholder: 'Campo obrigatório',
  },
};

export const WithError: Story = {
  args: {
    label: 'Descrição',
    value: 'Texto incompleto',
    error: 'A descrição precisa ter mais detalhes.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Observações',
    value: 'Campo desabilitado',
    disabled: true,
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Comentários',
    maxLength: 200,
    value: 'Texto parcial para visualizar o contador.',
  },
};

export const OverLimit: Story = {
  args: {
    label: 'Comentários',
    maxLength: 50,
    value:
      'Este texto ultrapassa o limite definido para destacar o contador em vermelho.',
  },
};

export const NoResize: Story = {
  args: {
    label: 'Observações',
    resize: 'none',
  },
};

export const Tall: Story = {
  args: {
    label: 'Histórico',
    rows: 8,
  },
};
