import { Component } from '@angular/core';
import { Bell, LucideAngularModule, LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';

@Component({
  selector: 'app-notifications-placeholder',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ Bell }),
      multi: true,
    },
  ],
  templateUrl: './notifications-placeholder.component.html',
  styleUrl: './notifications-placeholder.component.scss',
})
export class NotificationsPlaceholderComponent {}
