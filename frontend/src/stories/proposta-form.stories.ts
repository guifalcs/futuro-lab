import type { Meta, StoryObj } from '@storybook/angular';
import { PropostaFormComponent } from '../app/features/comercial/propostas/proposta-form/proposta-form.component';

const meta: Meta<PropostaFormComponent> = {
  title: 'Features/Comercial/PropostaForm',
  component: PropostaFormComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<PropostaFormComponent>;

export const Default: Story = {};
