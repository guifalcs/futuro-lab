import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { PropostasListComponent } from '../app/features/comercial/propostas/propostas-list/propostas-list.component';

const meta: Meta<PropostasListComponent> = {
  title: 'Features/Comercial/PropostasList',
  component: PropostasListComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<PropostasListComponent>;

export const Default: Story = {};
