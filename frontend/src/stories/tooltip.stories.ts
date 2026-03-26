import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import {
  Info,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';

import { ButtonComponent } from '../app/shared/components/button/button.component';
import { TooltipDirective } from '../app/shared/components/tooltip/tooltip.directive';

const meta: Meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TooltipDirective, ButtonComponent, LucideAngularModule],
      providers: [
        {
          provide: LUCIDE_ICONS,
          useValue: new LucideIconProvider({ Info }),
          multi: true,
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
        <div style="display:flex;justify-content:center;align-items:center;height:200px;">
          ${story}
        </div>
      `,
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Top: Story = {
  render: () => ({
    template: `<app-button appTooltip="Tooltip em cima">Hover</app-button>`,
  }),
};

export const Bottom: Story = {
  render: () => ({
    template: `<app-button appTooltip="Tooltip embaixo" tooltipPosition="bottom">Hover</app-button>`,
  }),
};

export const Left: Story = {
  render: () => ({
    template: `<app-button appTooltip="Tooltip à esquerda" tooltipPosition="left">Hover</app-button>`,
  }),
};

export const Right: Story = {
  render: () => ({
    template: `<app-button appTooltip="Tooltip à direita" tooltipPosition="right">Hover</app-button>`,
  }),
};

export const LongText: Story = {
  render: () => ({
    template: `
      <app-button
        appTooltip="Este tooltip tem um texto bem longo para testar quebra de linha e largura máxima no layout."
      >Hover</app-button>
    `,
  }),
};

export const WithDelay: Story = {
  render: () => ({
    template: `<app-button appTooltip="Tooltip com delay" [tooltipDelay]="800">Hover</app-button>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<app-button appTooltip="Tooltip desabilitado" [tooltipDisabled]="true">Hover</app-button>`,
  }),
};

export const OnIcon: Story = {
  render: () => ({
    template: `
      <app-button variant="secondary" appTooltip="Mais informações">
        <span style="display:flex;align-items:center;gap:6px;">
          <lucide-angular name="info" [size]="16"></lucide-angular>
          <span>Info</span>
        </span>
      </app-button>
    `,
  }),
};
