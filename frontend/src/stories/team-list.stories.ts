import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  AlertTriangle,
  Construction,
  Eye,
  LUCIDE_ICONS,
  LucideIconProvider,
  Pencil,
  UserCheck,
  UserPlus,
  UserX,
  Users,
} from 'lucide-angular';

import { TeamListComponent } from '../app/features/team/team-list/team-list.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';
import { MOCK_COLLABORATORS, ICollaborator } from '../app/features/team/data/team-mock';

@Component({
  selector: 'app-team-list-story',
  standalone: true,
  imports: [TeamListComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        AlertTriangle,
        Construction,
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
  template: `
    <app-team-list #teamList></app-team-list>
    <app-toast />
  `,
})
class TeamListStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(TeamListComponent) teamList?: TeamListComponent;

  @Input() collaborators: ICollaborator[] = [...MOCK_COLLABORATORS];
  @Input() modalOpen = false;
  @Input() modalCollaborator: ICollaborator | null = null;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.teamList) return;

    this.teamList.collaborators.set(this.collaborators);

    if (this.modalOpen && this.modalCollaborator) {
      this.teamList.selectedCollaborator.set(this.modalCollaborator);
      this.teamList.statusModalOpen.set(true);
    }
  }
}

const meta: Meta<TeamListStoryComponent> = {
  title: 'Features/TeamList',
  component: TeamListStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TeamListStoryComponent>;

export const Default: Story = {
  args: {
    collaborators: [...MOCK_COLLABORATORS],
  },
};

export const EmptyState: Story = {
  args: {
    collaborators: [],
  },
};

export const WithDeactivationModalOpen: Story = {
  args: {
    collaborators: [...MOCK_COLLABORATORS],
    modalOpen: true,
    modalCollaborator: MOCK_COLLABORATORS[0],
  },
};
