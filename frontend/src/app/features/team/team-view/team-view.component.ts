import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  Pencil,
  UserX,
  Activity,
} from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../shared/components/card/card-header.directive';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { ICollaborator, MOCK_COLLABORATORS } from '../data/team-mock';

const MONTHS_PT = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

@Component({
  selector: 'app-team-view',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardHeaderDirective,
    AvatarComponent,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, Pencil, UserX, Activity }),
      multi: true,
    },
  ],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.scss',
})
export class TeamViewComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly collaborator = signal<ICollaborator | null>(null);
  readonly notFound = signal(false);

  readonly formattedDate = computed(() => {
    const collab = this.collaborator();
    if (!collab) return '';
    const date = new Date(collab.createdAt);
    const day = date.getUTCDate();
    const month = MONTHS_PT[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} de ${month} de ${year}`;
  });

  readonly presenceLabel = computed(() => {
    const p = this.collaborator()?.presence;
    if (p === 'online') return 'Online';
    if (p === 'away') return 'Ausente';
    return 'Offline';
  });

  readonly presenceVariant = computed(() => {
    const p = this.collaborator()?.presence;
    if (p === 'online') return 'success' as const;
    if (p === 'away') return 'warning' as const;
    return 'neutral' as const;
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = MOCK_COLLABORATORS.find(c => c.id === id);
      if (found) {
        this.collaborator.set(found);
      } else {
        this.notFound.set(true);
      }
    } else {
      this.notFound.set(true);
    }
  }

  goBack(): void {
    this.router.navigate(['/equipe']);
  }

  goToEdit(): void {
    const id = this.collaborator()?.id;
    if (id) {
      this.router.navigate(['/equipe', id, 'editar']);
    }
  }
}
