import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { ModalComponent } from '../app/shared/components/modal/modal.component';
import { ModalFooterDirective } from '../app/shared/components/modal/modal-footer.directive';
import { ButtonComponent } from '../app/shared/components/button/button.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  args: {
    isOpen: false,
    title: 'Título do Modal',
    size: 'md',
    closeOnOverlay: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  name: 'Default (clique para abrir)',
  render: () => {
    const isOpen = signal(false);
    return {
      props: { isOpen, open: () => isOpen.set(true), close: () => isOpen.set(false) },
      moduleMetadata: {
        imports: [ButtonComponent],
      },
      template: `
        <div>
          <app-button variant="default" (clicked)="open()">Abrir Modal</app-button>

          <app-modal
            [isOpen]="isOpen()"
            title="Título do Modal"
            (closed)="close()"
          >
            <p style="margin: 0; color: #4B5563; font-size: 14px; line-height: 1.5;">
              Este é o conteúdo principal do modal. Pode conter qualquer elemento como texto,
              formulários, tabelas ou outros componentes.
            </p>
          </app-modal>
        </div>
      `,
    };
  },
};

export const WithFooter: Story = {
  name: 'With Footer (Cancelar e Confirmar)',
  render: () => {
    const isOpen = signal(false);
    return {
      props: { isOpen, open: () => isOpen.set(true), close: () => isOpen.set(false) },
      moduleMetadata: {
        imports: [ButtonComponent, ModalFooterDirective],
      },
      template: `
        <div>
          <app-button variant="default" (clicked)="open()">Abrir Modal</app-button>

          <app-modal
            [isOpen]="isOpen()"
            title="Editar Informações"
            (closed)="close()"
          >
            <p style="margin: 0; color: #4B5563; font-size: 14px; line-height: 1.5;">
              Preencha os campos abaixo para atualizar as informações do registro.
            </p>

            <div appModalFooter style="display: contents;">
              <app-button variant="outline" (clicked)="close()">Cancelar</app-button>
              <app-button variant="default" (clicked)="close()">Confirmar</app-button>
            </div>
          </app-modal>
        </div>
      `,
    };
  },
};

export const Small: Story = {
  name: 'Small (sm)',
  render: () => {
    const isOpen = signal(false);
    return {
      props: { isOpen, open: () => isOpen.set(true), close: () => isOpen.set(false) },
      moduleMetadata: {
        imports: [ButtonComponent],
      },
      template: `
        <div>
          <app-button variant="default" (clicked)="open()">Abrir Modal Pequeno</app-button>

          <app-modal
            [isOpen]="isOpen()"
            title="Modal Pequeno"
            size="sm"
            (closed)="close()"
          >
            <p style="margin: 0; color: #4B5563; font-size: 14px; line-height: 1.5;">
              Modal com largura máxima de 400px.
            </p>
          </app-modal>
        </div>
      `,
    };
  },
};

export const Large: Story = {
  name: 'Large (lg)',
  render: () => {
    const isOpen = signal(false);
    return {
      props: { isOpen, open: () => isOpen.set(true), close: () => isOpen.set(false) },
      moduleMetadata: {
        imports: [ButtonComponent],
      },
      template: `
        <div>
          <app-button variant="default" (clicked)="open()">Abrir Modal Grande</app-button>

          <app-modal
            [isOpen]="isOpen()"
            title="Modal Grande"
            size="lg"
            (closed)="close()"
          >
            <p style="margin: 0; color: #4B5563; font-size: 14px; line-height: 1.5;">
              Modal com largura máxima de 640px. Ideal para formulários maiores, tabelas
              ou conteúdo que precisa de mais espaço horizontal.
            </p>
          </app-modal>
        </div>
      `,
    };
  },
};

export const WithoutCloseButton: Story = {
  name: 'Without Close Button (sem fechar por overlay/escape)',
  render: () => {
    const isOpen = signal(false);
    return {
      props: { isOpen, open: () => isOpen.set(true), close: () => isOpen.set(false) },
      moduleMetadata: {
        imports: [ButtonComponent, ModalFooterDirective],
      },
      template: `
        <div>
          <app-button variant="default" (clicked)="open()">Abrir Modal</app-button>

          <app-modal
            [isOpen]="isOpen()"
            title="Sem Botão Fechar"
            [showCloseButton]="false"
            [closeOnOverlay]="false"
            [closeOnEscape]="false"
            (closed)="close()"
          >
            <p style="margin: 0; color: #4B5563; font-size: 14px; line-height: 1.5;">
              Este modal não tem botão X no header e não fecha ao clicar no overlay ou pressionar Escape.
              A única saída é via ações no footer.
            </p>

            <div appModalFooter style="display: contents;">
              <app-button variant="default" (clicked)="close()">Entendido</app-button>
            </div>
          </app-modal>
        </div>
      `,
    };
  },
};

export const DeleteConfirmation: Story = {
  name: 'Confirmação de Exclusão (contextual)',
  render: () => {
    const isOpen = signal(false);
    return {
      props: { isOpen, open: () => isOpen.set(true), close: () => isOpen.set(false) },
      moduleMetadata: {
        imports: [ButtonComponent, ModalFooterDirective],
      },
      template: `
        <div>
          <app-button variant="destructive" (clicked)="open()">Excluir Registro</app-button>

          <app-modal
            [isOpen]="isOpen()"
            title="Confirmar Exclusão"
            size="sm"
            (closed)="close()"
          >
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 500;">
                Tem certeza que deseja excluir este registro?
              </p>
              <p style="margin: 0; color: #6B7280; font-size: 14px; line-height: 1.5;">
                Esta ação não pode ser desfeita. O registro será removido permanentemente
                do sistema e não poderá ser recuperado.
              </p>
            </div>

            <div appModalFooter style="display: contents;">
              <app-button variant="outline" (clicked)="close()">Cancelar</app-button>
              <app-button variant="destructive" (clicked)="close()">Excluir</app-button>
            </div>
          </app-modal>
        </div>
      `,
    };
  },
};
