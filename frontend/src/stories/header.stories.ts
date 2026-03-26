import type { Meta, StoryObj } from '@storybook/angular';

import { HeaderComponent, INavItem } from '../app/layouts/header/header.component';

// ── Meta ───────────────────────────────────────────────────────────────────────

const defaultNavItems: INavItem[] = [
  { label: 'Dashboard', route: '/dashboard' },
  { label: 'Tarefas', route: '/tarefas' },
  { label: 'Clientes', route: '/clientes' },
  { label: 'Equipe', route: '/equipe' },
];

const meta: Meta<HeaderComponent> = {
  title: 'Layouts/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    userName: 'João Silva',
    userAvatar: '',
    navItems: defaultNavItems,
    activeRoute: '',
    logoSrc: 'assets/images/logo.webp',
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Padrão',
};

export const WithActiveRoute: Story = {
  name: 'Com rota ativa',
  args: {
    activeRoute: '/tarefas',
  },
};

export const WithAvatarImage: Story = {
  name: 'Com imagem de avatar',
  args: {
    activeRoute: '/dashboard',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
  },
};

export const UserMenuOpen: Story = {
  name: 'Menu do usuário aberto',
  args: {
    activeRoute: '/dashboard',
  },
  play: async ({ canvasElement }) => {
    const userBtn = canvasElement.querySelector('.header__user-btn') as HTMLButtonElement;
    userBtn?.click();
  },
};
