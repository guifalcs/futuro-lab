import type { Meta, StoryObj } from '@storybook/angular';

import { BadgeComponent } from '../app/shared/components/badge/badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  args: {
    variant: 'neutral',
    size: 'md',
    text: 'Badge',
  },
  render: (args) => ({
    props: args,
    template: `<app-badge [variant]="variant" [size]="size" [text]="text" />`,
  }),
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Success: Story = {
  args: {
    variant: 'success',
    text: 'Sucesso',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    text: 'Alerta',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    text: 'Erro',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    text: 'Informação',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    text: 'Neutro',
  },
};

export const SmallSize: Story = {
  name: 'Small Size (sm)',
  args: {
    variant: 'info',
    size: 'sm',
    text: 'Pequeno',
  },
};

export const StatusDeTarefa: Story = {
  name: 'Status de Tarefa',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <app-badge variant="success" size="md" text="No Prazo" />
        <app-badge variant="warning" size="md" text="Próximo do Vencimento" />
        <app-badge variant="danger" size="md" text="Atrasada" />
        <app-badge variant="info" size="md" text="Concluída" />
      </div>
    `,
  }),
};
