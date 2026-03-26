import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { CardComponent } from '../app/shared/components/card/card.component';
import { CardHeaderDirective } from '../app/shared/components/card/card-header.directive';
import { CardFooterDirective } from '../app/shared/components/card/card-footer.directive';
import { BadgeComponent } from '../app/shared/components/badge/badge.component';
import { ButtonComponent } from '../app/shared/components/button/button.component';
import { Calendar, LucideAngularModule, LucideIconProvider, LUCIDE_ICONS, User } from 'lucide-angular';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    padding: 'md',
    cardClick: fn(),
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CardHeaderDirective, CardFooterDirective],
    },
    template: `
      <app-card [variant]="variant" [padding]="padding" (cardClick)="cardClick()">
        <p style="margin: 0; color: #4B5563; font-size: 14px;">
          Conteúdo principal do card. Pode conter qualquer elemento.
        </p>
      </app-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {},
};

export const WithHeaderAndFooter: Story = {
  name: 'With Header and Footer',
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CardHeaderDirective, CardFooterDirective, ButtonComponent],
    },
    template: `
      <app-card [variant]="variant" [padding]="padding">
        <div appCardHeader style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
          <span style="font-size: 16px; font-weight: 500; color: #111827; margin: 0; min-width: 0;">Título do Card</span>
          <span style="font-size: 12px; color: #9CA3AF; flex-shrink: 0;">Ação</span>
        </div>
        <p style="margin: 0; color: #4B5563; font-size: 14px;">
          Conteúdo principal do card com header e footer visíveis.
        </p>
        <div appCardFooter style="display: flex; justify-content: flex-end; gap: 8px;">
          <app-button variant="outline" size="sm">Cancelar</app-button>
          <app-button variant="default" size="sm">Confirmar</app-button>
        </div>
      </app-card>
    `,
  }),
};

export const Interactive: Story = {
  name: 'Interactive (hover para ver efeito)',
  args: {
    variant: 'interactive',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CardHeaderDirective, CardFooterDirective],
    },
    template: `
      <app-card [variant]="variant" [padding]="padding" (cardClick)="cardClick()">
        <p style="margin: 0; color: #4B5563; font-size: 14px;">
          Passe o mouse sobre este card para ver o efeito de elevação. Clique para disparar o evento <code>cardClick</code>.
        </p>
      </app-card>
    `,
  }),
};

export const Selected: Story = {
  args: {
    variant: 'selected',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CardHeaderDirective, CardFooterDirective],
    },
    template: `
      <app-card [variant]="variant" [padding]="padding">
        <p style="margin: 0; color: #4B5563; font-size: 14px;">
          Este card está no estado selecionado — borda azul e fundo sutil.
        </p>
      </app-card>
    `,
  }),
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CardHeaderDirective, CardFooterDirective],
    },
    template: `
      <app-card [variant]="variant" [padding]="padding">
        <p style="margin: 0; color: #4B5563; font-size: 14px; padding: 16px;">
          Card sem padding — útil para conteúdo que gerencia seu próprio espaçamento (ex: imagens, tabelas).
        </p>
      </app-card>
    `,
  }),
};

export const TaskCard: Story = {
  name: 'Task Card (exemplo contextual)',
  render: () => ({
    moduleMetadata: {
      imports: [CardHeaderDirective, CardFooterDirective, BadgeComponent, ButtonComponent, LucideAngularModule],
      providers: [
        {
          provide: LUCIDE_ICONS,
          useValue: new LucideIconProvider({ User, Calendar }),
          multi: true,
        },
      ],
    },
    template: `
      <div style="max-width: 480px;">
        <app-card variant="interactive" padding="md">
          <div appCardHeader>
            <span style="font-size: 16px; font-weight: 500; color: #111827;">Admissão — João da Silva</span>
            <app-badge variant="warning" size="sm" text="Próximo do Vencimento" />
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="margin: 0; color: #4B5563; font-size: 14px;">
              Processo de admissão com assinatura de contrato e entrega de documentos pendentes.
            </p>
            <div style="display: flex; gap: 16px; font-size: 13px; color: #6B7280; margin-top: 4px;">
              <span style="display: inline-flex; align-items: center; gap: 6px;">
                <lucide-angular name="user" [size]="14" [strokeWidth]="1.75" />
                Maria Souza
              </span>
              <span style="display: inline-flex; align-items: center; gap: 6px;">
                <lucide-angular name="calendar" [size]="14" [strokeWidth]="1.75" />
                Prazo: 25/03/2026
              </span>
            </div>
          </div>

          <div appCardFooter style="display: flex; justify-content: flex-end; gap: 8px;">
            <app-button variant="ghost" size="sm">Ver detalhes</app-button>
            <app-button variant="outline" size="sm">Editar</app-button>
          </div>
        </app-card>
      </div>
    `,
  }),
};
