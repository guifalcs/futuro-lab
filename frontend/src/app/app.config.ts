import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AlertTriangle,
  Eye,
  LUCIDE_ICONS,
  LucideIconProvider,
  Pencil,
  UserCheck,
  UserPlus,
  UserX,
  Users,
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        AlertTriangle,
        Eye,
        Pencil,
        UserCheck,
        UserPlus,
        UserX,
        Users,
      }),
      multi: true,
    },
  ],
};
