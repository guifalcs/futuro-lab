import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { ToastComponent } from '../app/shared/components/toast/toast.component';
import { ToastService } from '../app/core/services/toast.service';
import { ButtonComponent } from '../app/shared/components/button/button.component';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [ToastComponent, ButtonComponent],
  template: `
    <div style="display: flex; gap: 8px; flex-wrap: wrap; padding: 16px;">
      <app-button variant="default" (clicked)="success()">Success</app-button>
      <app-button variant="secondary" (clicked)="warning()">Warning</app-button>
      <app-button variant="destructive" (clicked)="error()">Error</app-button>
      <app-button variant="outline" (clicked)="info()">Info</app-button>
      <app-button variant="default" (clicked)="multiple()">Disparar Múltiplos</app-button>
    </div>
    <app-toast />
  `,
})
class ToastDemoComponent {
  private readonly toast = inject(ToastService);

  success(): void {
    this.toast.success('Operação realizada com sucesso!');
  }

  warning(): void {
    this.toast.warning('Atenção: verifique os dados antes de continuar.');
  }

  error(): void {
    this.toast.error('Erro ao processar a solicitação. Tente novamente.');
  }

  info(): void {
    this.toast.info('Nova atualização disponível no sistema.');
  }

  multiple(): void {
    this.toast.success('Primeiro toast: tudo certo!');
    setTimeout(() => this.toast.warning('Segundo toast: atenção necessária.'), 200);
    setTimeout(() => this.toast.info('Terceiro toast: informação adicional.'), 400);
  }
}

const meta: Meta<ToastDemoComponent> = {
  title: 'Components/Toast',
  component: ToastDemoComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<ToastDemoComponent>;

export const Default: Story = {
  name: 'Interativo (clique nos botões)',
};

export const SuccessVariant: Story = {
  name: 'Variante: Success',
  render: () => ({
    template: `
      <div style="position: relative; height: 120px;">
        <div style="
          position: absolute;
          bottom: 16px;
          right: 16px;
          display: flex;
          flex-direction: column-reverse;
          gap: 8px;
        ">
          <div style="
            display: flex;
            align-items: center;
            gap: 12px;
            width: 360px;
            padding: 12px 16px;
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-left: 3px solid #16A34A;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05);
          ">
            <span style="color: #16A34A; display: flex;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </span>
            <span style="flex: 1; font-size: 14px; color: #111827;">Operação realizada com sucesso!</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => ({
    template: `
      <div style="position: relative; height: 280px;">
        <div style="
          position: absolute;
          bottom: 16px;
          right: 16px;
          display: flex;
          flex-direction: column-reverse;
          gap: 8px;
        ">
          <div style="display:flex;align-items:center;gap:12px;width:360px;padding:12px 16px;background:#FFFFFF;border:1px solid #E5E7EB;border-left:3px solid #16A34A;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.07);">
            <span style="color:#16A34A;display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>
            <span style="flex:1;font-size:14px;color:#111827;">Operação realizada com sucesso!</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;width:360px;padding:12px 16px;background:#FFFFFF;border:1px solid #E5E7EB;border-left:3px solid #CA8A04;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.07);">
            <span style="color:#CA8A04;display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg></span>
            <span style="flex:1;font-size:14px;color:#111827;">Atenção: verifique os dados antes de continuar.</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;width:360px;padding:12px 16px;background:#FFFFFF;border:1px solid #E5E7EB;border-left:3px solid #DC2626;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.07);">
            <span style="color:#DC2626;display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg></span>
            <span style="flex:1;font-size:14px;color:#111827;">Erro ao processar a solicitação. Tente novamente.</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;width:360px;padding:12px 16px;background:#FFFFFF;border:1px solid #E5E7EB;border-left:3px solid #2563EB;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.07);">
            <span style="color:#2563EB;display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg></span>
            <span style="flex:1;font-size:14px;color:#111827;">Nova atualização disponível no sistema.</span>
          </div>
        </div>
      </div>
    `,
  }),
};
