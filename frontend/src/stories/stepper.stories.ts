import type { Meta, StoryObj } from '@storybook/angular';
import { StepperComponent } from '../app/shared/components/stepper/stepper.component';

const meta: Meta<StepperComponent> = {
  title: 'Shared/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StepperComponent>;

export const FirstStep: Story = {
  args: {
    steps: [
      { label: 'Dados da Proposta' },
      { label: 'Análise Crítica' },
      { label: 'Serviços', disabled: true },
      { label: 'Revisão', disabled: true },
    ],
    currentStep: 0,
  },
};

export const SecondStep: Story = {
  args: {
    steps: [
      { label: 'Dados da Proposta' },
      { label: 'Análise Crítica' },
      { label: 'Serviços', disabled: true },
      { label: 'Revisão', disabled: true },
    ],
    currentStep: 1,
  },
};

export const AllCompleted: Story = {
  args: {
    steps: [
      { label: 'Identificação' },
      { label: 'Detalhes' },
      { label: 'Confirmação' },
    ],
    currentStep: 2,
  },
};
