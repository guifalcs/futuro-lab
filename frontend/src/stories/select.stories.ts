import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { SelectComponent, ISelectOption } from '../app/shared/components/select/select.component';

const defaultOptions: ISelectOption[] = [
  { value: 'ferias', label: 'Férias' },
  { value: 'rescisao', label: 'Rescisão' },
  { value: 'admissao', label: 'Admissão' },
  { value: 'afastamento', label: 'Afastamento' },
  { value: 'beneficios', label: 'Benefícios' },
];

const manyOptions: ISelectOption[] = [
  { value: 'opcao-01', label: 'Opção 01' },
  { value: 'opcao-02', label: 'Opção 02' },
  { value: 'opcao-03', label: 'Opção 03' },
  { value: 'opcao-04', label: 'Opção 04' },
  { value: 'opcao-05', label: 'Opção 05' },
  { value: 'opcao-06', label: 'Opção 06' },
  { value: 'opcao-07', label: 'Opção 07' },
  { value: 'opcao-08', label: 'Opção 08' },
  { value: 'opcao-09', label: 'Opção 09' },
  { value: 'opcao-10', label: 'Opção 10' },
  { value: 'opcao-11', label: 'Opção 11' },
  { value: 'opcao-12', label: 'Opção 12' },
  { value: 'opcao-13', label: 'Opção 13' },
  { value: 'opcao-14', label: 'Opção 14' },
  { value: 'opcao-15', label: 'Opção 15' },
  { value: 'opcao-16', label: 'Opção 16' },
];

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  args: {
    options: defaultOptions,
    placeholder: 'Selecione...',
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
    template: `<app-select
      [options]="options"
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
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Tipo de solicitação',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Tipo de solicitação',
    placeholder: 'Escolha uma opção...',
  },
};

export const WithSelection: Story = {
  name: 'With Selection (pré-selecionado)',
  args: {
    label: 'Tipo de solicitação',
    value: 'ferias',
  },
};

export const WithError: Story = {
  args: {
    label: 'Tipo de solicitação',
    error: 'Selecione um tipo de solicitação.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Tipo de solicitação',
    value: 'admissao',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Tipo de solicitação',
    required: true,
    placeholder: 'Selecione (obrigatório)...',
  },
};

export const ManyOptions: Story = {
  name: 'Many Options (scroll)',
  args: {
    label: 'Opções',
    options: manyOptions,
  },
};
