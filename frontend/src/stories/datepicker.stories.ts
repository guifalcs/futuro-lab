import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { DatepickerComponent } from '../app/shared/components/datepicker/datepicker.component';

const meta: Meta<DatepickerComponent> = {
  title: 'Components/Datepicker',
  component: DatepickerComponent,
  tags: ['autodocs'],
  args: {
    placeholder: 'dd/mm/aaaa',
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
    template: `<div style="min-height: 400px;">
      <app-datepicker
        [placeholder]="placeholder"
        [label]="label"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [value]="value"
        (focused)="focused()"
        (blurred)="blurred()"
      />
    </div>`,
  }),
};

export default meta;
type Story = StoryObj<DatepickerComponent>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Data de coleta',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Data de coleta',
    value: '15/03/2026',
  },
};

export const Required: Story = {
  args: {
    label: 'Data de recebimento',
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Data de coleta',
    value: '31/02/2026',
    error: 'Informe uma data válida.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Data de coleta',
    value: '10/01/2026',
    disabled: true,
  },
};
