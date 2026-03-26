import type { Meta, StoryObj } from '@storybook/angular';

import { FooterComponent } from '../app/layouts/footer/footer.component';

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta: Meta<FooterComponent> = {
  title: 'Layouts/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<FooterComponent>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Padrão',
  args: {},
};

export const WithVersion: Story = {
  name: 'Com versão',
  args: {
    version: '1.0.0',
  },
};

export const CustomCompanyName: Story = {
  name: 'Nome customizado',
  args: {
    companyName: 'Minha Empresa LTDA',
    version: '2.3.1',
  },
};
