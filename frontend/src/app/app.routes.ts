import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/main-layout/main-layout.routes').then(m => m.MAIN_LAYOUT_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./features/error/forbidden/forbidden.component').then(m => m.ForbiddenComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./features/error/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
