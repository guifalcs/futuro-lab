import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../../features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'tarefas',
        loadComponent: () => import('../../features/tarefas/tarefas.component').then(m => m.TarefasComponent)
      },
      {
        path: 'clientes',
        data: {
          sidebarItems: [
            { icon: 'building-2', label: 'Todos os Clientes', route: '/clientes' },
            { icon: 'plus', label: 'Novo Cliente', route: '/clientes/novo' }
          ]
        },
        children: [
          {
            path: '',
            loadComponent: () => import('../../features/clients/client-list/client-list.component').then(m => m.ClientListComponent)
          },
          {
            path: 'novo',
            loadComponent: () => import('../../features/clients/client-create/client-create.component').then(m => m.ClientCreateComponent)
          },
          {
            path: ':id',
            loadComponent: () => import('../../features/clients/client-view/client-view.component').then(m => m.ClientViewComponent)
          },
          {
            path: ':id/editar',
            loadComponent: () => import('../../features/clients/client-edit/client-edit.component').then(m => m.ClientEditComponent)
          }
        ]
      },
      {
        path: 'equipe',
        data: {
          sidebarItems: [
            { icon: 'users', label: 'Todos os Colaboradores', route: '/equipe' },
            { icon: 'user-plus', label: 'Novo Colaborador', route: '/equipe/novo' }
          ]
        },
        children: [
          {
            path: '',
            loadComponent: () => import('../../features/team/team-list/team-list.component').then(m => m.TeamListComponent)
          },
          {
            path: 'novo',
            loadComponent: () => import('../../features/team/team-create/team-create.component').then(m => m.TeamCreateComponent)
          },
          {
            path: ':id',
            loadComponent: () => import('../../features/team/team-view/team-view.component').then(m => m.TeamViewComponent)
          },
          {
            path: ':id/editar',
            loadComponent: () => import('../../features/team/team-edit/team-edit.component').then(m => m.TeamEditComponent)
          }
        ]
      },
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
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
