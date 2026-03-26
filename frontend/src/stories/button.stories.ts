import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { ButtonComponent } from '../app/shared/components/button/button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    clicked: fn(),
  },
  render: (args) => ({
    props: args,
    template: `<app-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [type]="type"
      (clicked)="clicked($event)"
    >Botão</app-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// Variantes
export const Default: Story = {
  args: { variant: 'default', size: 'md' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
};

export const Outline: Story = {
  args: { variant: 'outline', size: 'md' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', size: 'md' },
};

// Estados
export const Disabled: Story = {
  args: { variant: 'default', size: 'md', disabled: true },
};

export const Loading: Story = {
  args: { variant: 'default', size: 'md', loading: true },
};

// Tamanhos
export const Small: Story = {
  args: { variant: 'default', size: 'sm' },
};

export const Medium: Story = {
  args: { variant: 'default', size: 'md' },
};

export const Large: Story = {
  args: { variant: 'default', size: 'lg' },
};

// Icon
export const Icon: Story = {
  args: { variant: 'default', size: 'icon' },
  render: (args) => ({
    props: args,
    template: `<app-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [type]="type"
      (clicked)="clicked($event)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </app-button>`,
  }),
};

// Todas as variantes lado a lado
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <app-button variant="default">Default</app-button>
        <app-button variant="secondary">Secondary</app-button>
        <app-button variant="outline">Outline</app-button>
        <app-button variant="ghost">Ghost</app-button>
        <app-button variant="destructive">Destructive</app-button>
      </div>
    `,
  }),
};

// Todos os tamanhos lado a lado
export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <app-button variant="default" size="sm">Small</app-button>
        <app-button variant="default" size="md">Medium</app-button>
        <app-button variant="default" size="lg">Large</app-button>
        <app-button variant="default" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </app-button>
      </div>
    `,
  }),
};
