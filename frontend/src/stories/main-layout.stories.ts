import { Component, input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { MainLayoutComponent } from '../app/layouts/main-layout/main-layout.component';

interface SidebarItem {
  icon: string;
  label: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: '<div style="display: flex; height: 100%; align-items: center; justify-content: center; color: #9CA3AF; font-size: 1.5rem;">Conteúdo da Página (Router Outlet)</div>'
})
class DummyComponent {}

@Component({
  selector: 'app-main-layout-host',
  standalone: true,
  imports: [MainLayoutComponent],
  template: `<app-main-layout [sidebarItems]="sidebarItems()" [sidebarActiveRoute]="sidebarActiveRoute()"></app-main-layout>`,
})
class MainLayoutHostComponent {
  sidebarItems = input<SidebarItem[]>([]);
  sidebarActiveRoute = input<string>('');
}

const meta: Meta<MainLayoutHostComponent> = {
  title: 'Layouts/MainLayout',
  component: MainLayoutHostComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([{ path: '**', component: DummyComponent }])]
    }),
    moduleMetadata({
      imports: [MainLayoutComponent, MainLayoutHostComponent, DummyComponent]
    })
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    sidebarActiveRoute: '/settings'
  }
};

export default meta;
type Story = StoryObj<MainLayoutHostComponent>;

const mockSidebarItems = [
  { icon: 'settings', label: 'Configurações', route: '/settings' },
  { icon: 'user', label: 'Perfil', route: '/profile' },
  { icon: 'bell', label: 'Notificações', route: '/notifications', badge: '3' },
  { icon: 'shield', label: 'Segurança', route: '/security' }
];

export const WithSidebar: Story = {
  args: {
    sidebarItems: mockSidebarItems
  }
};

export const WithoutSidebar: Story = {
  args: {
    sidebarItems: []
  }
};

export const SidebarCollapsed: Story = {
  args: {
    sidebarItems: mockSidebarItems
  },
  parameters: {
    viewport: { defaultViewport: 'ipad' } // força de forma natural o toggle responsivo se ativado, ou pode-se testar forçando a prop no componente
  }
};
