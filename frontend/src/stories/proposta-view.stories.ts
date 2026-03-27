import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { PropostaViewComponent } from '../app/features/comercial/propostas/proposta-view/proposta-view.component';
import { PropostaMockService } from '../app/features/comercial/propostas/services/proposta-mock.service';

const meta: Meta<PropostaViewComponent> = {
  title: 'Features/Comercial/PropostaView',
  component: PropostaViewComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', component: PropostaViewComponent }]),
        PropostaMockService,
      ],
    }),
    moduleMetadata({
      imports: [PropostaViewComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<PropostaViewComponent>;

export const Default: Story = {
  name: 'Proposta Encontrada',
  render: () => ({
    template: `<app-proposta-view />`,
  }),
};
