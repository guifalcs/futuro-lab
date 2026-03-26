import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'perfil',
        data: {
          sidebarItems: [
            { icon: 'user', label: 'Meu Perfil', route: '/perfil' },
            { icon: 'lock', label: 'Alterar Senha', route: '/perfil/senha' },
            { icon: 'bell', label: 'Notificações', route: '/perfil/notificacoes' },
            { icon: 'settings', label: 'Configurações', route: '/perfil/configuracoes' }
          ]
        },
        children: [
          {
            path: '',
            loadComponent: () => import('../../features/profile/profile.component').then(m => m.ProfileComponent)
          },
          {
            path: 'senha',
            loadComponent: () => import('../../features/profile/change-password/change-password.component').then(m => m.ChangePasswordComponent)
          },
          {
            path: 'notificacoes',
            loadComponent: () => import('../../features/profile/notifications/notifications-placeholder.component').then(m => m.NotificationsPlaceholderComponent)
          },
          {
            path: 'configuracoes',
            loadComponent: () => import('../../features/profile/settings/settings-placeholder.component').then(m => m.SettingsPlaceholderComponent)
          }
        ]
      },
      {
        path: 'suporte',
        data: {
          sidebarItems: [
            { icon: 'life-buoy', label: 'Meus Tickets', route: '/suporte' },
            { icon: 'plus', label: 'Novo Ticket', route: '/suporte/novo' }
          ]
        },
        children: [
          {
            path: '',
            loadComponent: () => import('../../features/support/ticket-list/ticket-list.component').then(m => m.TicketListComponent)
          },
          {
            path: 'novo',
            loadComponent: () => import('../../features/support/ticket-create/ticket-create.component').then(m => m.TicketCreateComponent)
          },
          {
            path: ':id',
            loadComponent: () => import('../../features/support/ticket-view/ticket-view.component').then(m => m.TicketViewComponent)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'perfil',
        pathMatch: 'full'
      }
    ]
  }
];
