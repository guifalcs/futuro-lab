import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { ActivatedRoute } from '@angular/router';
import {
  Activity,
  ArrowLeft,
  LUCIDE_ICONS,
  LucideIconProvider,
  Pencil,
  UserX,
} from 'lucide-angular';

import { TeamViewComponent } from '../app/features/team/team-view/team-view.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

function mockActivatedRoute(id: string): Partial<ActivatedRoute> {
  return {
    snapshot: { paramMap: { get: (key: string) => key === 'id' ? id : null, has: () => true, getAll: () => [], keys: [] } } as unknown as ActivatedRoute['snapshot'],
  };
}

@Component({
  selector: 'app-team-view-story',
  standalone: true,
  imports: [TeamViewComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, Pencil, UserX, Activity }),
      multi: true,
    },
  ],
  template: `
    <app-team-view></app-team-view>
    <app-toast />
  `,
})
class TeamViewStoryComponent {}

const meta: Meta<TeamViewStoryComponent> = {
  title: 'Features/TeamView',
  component: TeamViewStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TeamViewStoryComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('2') },
      ],
    },
  }),
};

export const InactiveCollaborator: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('8') },
      ],
    },
  }),
};

export const NotFound: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('999') },
      ],
    },
  }),
};
