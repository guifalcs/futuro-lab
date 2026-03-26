import type { Meta, StoryObj } from '@storybook/angular';

import { CheckboxComponent } from '../app/shared/components/checkbox/checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  args: {
    checked: false,
    label: 'Aceitar termos de uso',
    description: '',
    disabled: false,
    indeterminate: false,
    error: '',
  },
  render: (args) => ({
    props: args,
    template: `<app-checkbox
      [checked]="checked"
      [label]="label"
      [description]="description"
      [disabled]="disabled"
      [indeterminate]="indeterminate"
      [error]="error"
      (checkedChange)="checked = $event"
    />`,
  }),
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Notificações por e-mail',
    description: 'Receba alertas quando uma tarefa for atribuída a você',
  },
};

export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithError: Story = {
  args: {
    error: 'Você precisa aceitar os termos',
  },
};

export const Group: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <app-checkbox label="No Prazo" />
        <app-checkbox label="Próximo do Vencimento" />
        <app-checkbox label="Atrasada" />
      </div>
    `,
  }),
};
