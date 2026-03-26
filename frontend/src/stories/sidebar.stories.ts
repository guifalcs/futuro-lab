import { Component, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { ISidebarItem, SidebarComponent } from '../app/shared/components/sidebar/sidebar.component';
import { AvatarComponent } from '../app/shared/components/avatar/avatar.component';

// ── Shared data ────────────────────────────────────────────────────────────────

const NAV_ITEMS: ISidebarItem[] = [
  { icon: 'house', label: 'Dashboard', route: '/dashboard' },
  { icon: 'users', label: 'Clientes', route: '/clients' },
  { icon: 'file-text', label: 'Demandas', route: '/tasks' },
  { icon: 'chart-bar', label: 'Relatórios', route: '/reports' },
  { icon: 'bell', label: 'Notificações', route: '/notifications' },
  { icon: 'settings', label: 'Configurações', route: '/settings' },
];

const NAV_ITEMS_WITH_BADGES: ISidebarItem[] = [
  { icon: 'house', label: 'Dashboard', route: '/dashboard' },
  { icon: 'users', label: 'Clientes', route: '/clients' },
  { icon: 'file-text', label: 'Demandas', route: '/tasks', badge: '12' },
  { icon: 'chart-bar', label: 'Relatórios', route: '/reports' },
  { icon: 'bell', label: 'Notificações', route: '/notifications', badge: '3' },
  { icon: 'settings', label: 'Configurações', route: '/settings' },
];

// ── Meta ───────────────────────────────────────────────────────────────────────

import { moduleMetadata } from '@storybook/angular';

const meta: Meta<SidebarComponent> = {
  decorators: [
    moduleMetadata({
      imports: [AvatarComponent],
    }),
  ],
  title: 'Components/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<SidebarComponent>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Expanded: Story = {
  name: 'Expandida (padrão)',
  render: () => ({
    props: {
      items: NAV_ITEMS,
      collapsed: false,
      activeRoute: '',
    },
    template: `
      <div style="height: 100vh; position: relative;">
        <app-sidebar [items]="items" [collapsed]="collapsed" [activeRoute]="activeRoute">
          <div sidebar-logo>
            <span style="font-size:15px;font-weight:600;color:#111827;white-space:nowrap;">Menu</span>
          </div>
          <div sidebar-footer>
            <div style="display:flex;align-items:center;gap:10px;padding:4px;">
              <app-avatar name="Ana Gonçalves" size="sm" status="online"></app-avatar>
              <div style="overflow:hidden;">
                <p style="margin:0;font-size:13px;font-weight:500;color:#111827;white-space:nowrap;">Ana Gonçalves</p>
                <p style="margin:0;font-size:12px;color:#9CA3AF;white-space:nowrap;">ana&#64;status.com.br</p>
              </div>
            </div>
          </div>
        </app-sidebar>
        <div style="margin-left: 260px; padding: 32px; color: #9CA3AF; font-family: Inter, sans-serif; font-size: 14px;">
          Conteúdo da página
        </div>
      </div>
    `,
  }),
};

export const Collapsed: Story = {
  name: 'Colapsada',
  render: () => ({
    props: {
      items: NAV_ITEMS,
      collapsed: true,
      activeRoute: '',
    },
    template: `
      <div style="height: 100vh; position: relative;">
        <app-sidebar [items]="items" [collapsed]="collapsed" [activeRoute]="activeRoute">
          <div sidebar-logo>
            <span style="font-size:15px;font-weight:600;color:#111827;white-space:nowrap;">Menu</span>
          </div>
          <div sidebar-footer>
            <div style="display:flex;align-items:center;gap:10px;padding:4px;">
              <app-avatar name="Ana Gonçalves" size="sm" status="online"></app-avatar>
              <div style="overflow:hidden;">
                <p style="margin:0;font-size:13px;font-weight:500;color:#111827;white-space:nowrap;">Ana Gonçalves</p>
                <p style="margin:0;font-size:12px;color:#9CA3AF;white-space:nowrap;">ana&#64;status.com.br</p>
              </div>
            </div>
          </div>
        </app-sidebar>
        <div style="margin-left: 64px; padding: 32px; color: #9CA3AF; font-family: Inter, sans-serif; font-size: 14px;">
          Conteúdo da página
        </div>
      </div>
    `,
  }),
};

export const WithActiveRoute: Story = {
  name: 'Com rota ativa',
  render: () => ({
    props: {
      items: NAV_ITEMS,
      collapsed: false,
      activeRoute: '/tasks',
    },
    template: `
      <div style="height: 100vh; position: relative;">
        <app-sidebar [items]="items" [collapsed]="collapsed" [activeRoute]="activeRoute">
          <div sidebar-logo>
            <span style="font-size:15px;font-weight:600;color:#111827;white-space:nowrap;">Menu</span>
          </div>
          <div sidebar-footer>
            <div style="display:flex;align-items:center;gap:10px;padding:4px;">
              <app-avatar name="Ana Gonçalves" size="sm" status="online"></app-avatar>
              <div style="overflow:hidden;">
                <p style="margin:0;font-size:13px;font-weight:500;color:#111827;white-space:nowrap;">Ana Gonçalves</p>
                <p style="margin:0;font-size:12px;color:#9CA3AF;white-space:nowrap;">ana&#64;status.com.br</p>
              </div>
            </div>
          </div>
        </app-sidebar>
        <div style="margin-left: 260px; padding: 32px; color: #9CA3AF; font-family: Inter, sans-serif; font-size: 14px;">
          Rota ativa: /tasks (item "Demandas" destacado)
        </div>
      </div>
    `,
  }),
};

export const WithBadges: Story = {
  name: 'Com badges',
  render: () => ({
    props: {
      items: NAV_ITEMS_WITH_BADGES,
      collapsed: false,
      activeRoute: '/tasks',
    },
    template: `
      <div style="height: 100vh; position: relative;">
        <app-sidebar [items]="items" [collapsed]="collapsed" [activeRoute]="activeRoute">
          <div sidebar-logo>
            <span style="font-size:15px;font-weight:600;color:#111827;white-space:nowrap;">Menu</span>
          </div>
          <div sidebar-footer>
            <div style="display:flex;align-items:center;gap:10px;padding:4px;">
              <app-avatar name="Ana Gonçalves" size="sm" status="online"></app-avatar>
              <div style="overflow:hidden;">
                <p style="margin:0;font-size:13px;font-weight:500;color:#111827;white-space:nowrap;">Ana Gonçalves</p>
                <p style="margin:0;font-size:12px;color:#9CA3AF;white-space:nowrap;">ana&#64;status.com.br</p>
              </div>
            </div>
          </div>
        </app-sidebar>
        <div style="margin-left: 260px; padding: 32px; color: #9CA3AF; font-family: Inter, sans-serif; font-size: 14px;">
          Demandas: 12 pendentes · Notificações: 3 não lidas
        </div>
      </div>
    `,
  }),
};

export const CollapsedWithBadges: Story = {
  name: 'Colapsada com badges (dots)',
  render: () => ({
    props: {
      items: NAV_ITEMS_WITH_BADGES,
      collapsed: true,
      activeRoute: '/tasks',
    },
    template: `
      <div style="height: 100vh; position: relative;">
        <app-sidebar [items]="items" [collapsed]="collapsed" [activeRoute]="activeRoute">
          <div sidebar-logo>
            <span style="font-size:15px;font-weight:600;color:#111827;white-space:nowrap;">Menu</span>
          </div>
          <div sidebar-footer>
            <div style="display:flex;align-items:center;gap:10px;padding:4px;">
              <app-avatar name="Ana Gonçalves" size="sm" status="online"></app-avatar>
              <div style="overflow:hidden;">
                <p style="margin:0;font-size:13px;font-weight:500;color:#111827;white-space:nowrap;">Ana Gonçalves</p>
                <p style="margin:0;font-size:12px;color:#9CA3AF;white-space:nowrap;">ana&#64;status.com.br</p>
              </div>
            </div>
          </div>
        </app-sidebar>
        <div style="margin-left: 64px; padding: 32px; color: #9CA3AF; font-family: Inter, sans-serif; font-size: 14px;">
          Badges aparecem como dots no canto superior direito dos ícones
        </div>
      </div>
    `,
  }),
};

// ── Interactive story ──────────────────────────────────────────────────────────

@Component({
  selector: 'app-sidebar-interactive-demo',
  standalone: true,
  imports: [SidebarComponent, AvatarComponent],
  template: `
    <div style="height: 100vh; position: relative;">
      <app-sidebar
        [items]="items"
        [(collapsed)]="collapsed"
        [activeRoute]="activeRoute()"
        (itemClick)="onItemClick($event)"
      >
        <div sidebar-logo>
          <span style="font-size:15px;font-weight:600;color:#111827;white-space:nowrap;">Menu</span>
        </div>
        <div sidebar-footer>
          <div style="display:flex;align-items:center;gap:10px;padding:4px;">
            <app-avatar name="Ana Gonçalves" size="sm" status="online"></app-avatar>
            <div style="overflow:hidden;">
              <p style="margin:0;font-size:13px;font-weight:500;color:#111827;white-space:nowrap;">Ana Gonçalves</p>
              <p style="margin:0;font-size:12px;color:#9CA3AF;white-space:nowrap;">ana&#64;status.com.br</p>
            </div>
          </div>
        </div>
      </app-sidebar>
      <div [style.margin-left]="collapsed() ? '64px' : '260px'" style="padding: 32px; transition: margin-left 200ms ease; font-family: Inter, sans-serif;">
        <p style="font-size: 14px; color: #9CA3AF; margin: 0 0 8px;">
          Clique no botão de toggle para colapsar/expandir. Clique em um item para ativá-lo.
        </p>
        <p style="font-size: 13px; color: #6B7280; margin: 0;">
          Rota ativa: <strong>{{ activeRoute() || 'nenhuma' }}</strong>
        </p>
      </div>
    </div>
  `,
})
class SidebarInteractiveDemoComponent {
  readonly items = NAV_ITEMS_WITH_BADGES;
  collapsed = signal(false);
  activeRoute = signal('/dashboard');

  onItemClick(item: ISidebarItem): void {
    this.activeRoute.set(item.route);
  }
}

export const Interactive: Story = {
  name: 'Interativa (toggle + item click)',
  render: () => ({
    component: SidebarInteractiveDemoComponent,
    template: `<app-sidebar-interactive-demo />`,
    moduleMetadata: {
      imports: [SidebarInteractiveDemoComponent],
    },
  }),
};

// ── Mobile story ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-sidebar-mobile-demo',
  standalone: true,
  imports: [SidebarComponent, AvatarComponent],
  template: `
    <div style="width: 390px; height: 844px; position: relative; overflow: hidden; border: 1px solid #E5E7EB; border-radius: 12px; background: #F9FAFB;">
      <div style="position:absolute;top:0;left:0;right:0;height:56px;background:white;border-bottom:1px solid #E5E7EB;display:flex;align-items:center;padding:0 16px;gap:12px;z-index:10;">
        <button
          (click)="mobileOpen.set(true)"
          style="width:36px;height:36px;border:none;background:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#6B7280;"
          type="button"
          aria-label="Abrir menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
        <span style="font-size:15px;font-weight:600;color:#111827;">Menu</span>
      </div>

      <app-sidebar
        [items]="items"
        [collapsed]="false"
        [activeRoute]="activeRoute()"
        [(mobileOpen)]="mobileOpen"
        (itemClick)="onItemClick($event)"
      >
        <div sidebar-logo>
          <span style="font-size:15px;font-weight:600;color:#111827;white-space:nowrap;">Menu</span>
        </div>
        <div sidebar-footer>
          <div style="display:flex;align-items:center;gap:10px;padding:4px;">
            <app-avatar name="Ana Gonçalves" size="sm" status="online"></app-avatar>
            <div style="overflow:hidden;">
              <p style="margin:0;font-size:13px;font-weight:500;color:#111827;white-space:nowrap;">Ana Gonçalves</p>
              <p style="margin:0;font-size:12px;color:#9CA3AF;white-space:nowrap;">ana&#64;status.com.br</p>
            </div>
          </div>
        </div>
      </app-sidebar>

      <div style="padding: 80px 16px 16px; font-family: Inter, sans-serif;">
        <p style="font-size: 14px; color: #9CA3AF; margin: 0 0 8px;">
          Toque no ícone de hambúrguer para abrir a sidebar.
        </p>
        <p style="font-size: 13px; color: #6B7280; margin: 0;">
          Rota ativa: <strong>{{ activeRoute() || 'nenhuma' }}</strong>
        </p>
      </div>
    </div>
  `,
})
class SidebarMobileDemoComponent {
  readonly items = NAV_ITEMS_WITH_BADGES;
  mobileOpen = signal(true);
  activeRoute = signal('/dashboard');

  onItemClick(item: ISidebarItem): void {
    this.activeRoute.set(item.route);
  }
}

export const MobileOpen: Story = {
  name: 'Mobile (overlay + slide)',
  render: () => ({
    component: SidebarMobileDemoComponent,
    template: `<app-sidebar-mobile-demo />`,
    moduleMetadata: {
      imports: [SidebarMobileDemoComponent],
    },
  }),
  parameters: {
    layout: 'centered',
  },
};
