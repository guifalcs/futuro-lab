import { Component } from '@angular/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Settings } from 'lucide-angular';

@Component({
  selector: 'app-settings-placeholder',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ Settings }),
      multi: true,
    },
  ],
  templateUrl: './settings-placeholder.component.html',
  styleUrl: './settings-placeholder.component.scss',
})
export class SettingsPlaceholderComponent {}
