import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { ActivatedRoute } from '@angular/router';
import {
  AlertTriangle,
  ArrowLeft,
  LUCIDE_ICONS,
  LucideIconProvider,
  UserCheck,
  UserX,
} from 'lucide-angular';

import { TeamEditComponent } from '../app/features/team/team-edit/team-edit.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

function mockActivatedRoute(id: string): Partial<ActivatedRoute> {
  return {
    snapshot: { paramMap: { get: (key: string) => key === 'id' ? id : null, has: () => true, getAll: () => [], keys: [] } } as unknown as ActivatedRoute['snapshot'],
  };
}

@Component({
  selector: 'app-team-edit-story',
  standalone: true,
  imports: [TeamEditComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, UserX, UserCheck, AlertTriangle }),
      multi: true,
    },
  ],
  template: `
    <app-team-edit #teamEdit></app-team-edit>
    <app-toast />
  `,
})
class TeamEditStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(TeamEditComponent) teamEdit?: TeamEditComponent;

  @Input() withErrors = false;
  @Input() loading = false;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.teamEdit) return;

    if (this.withErrors) {
      this.teamEdit.nameError.set('Nome é obrigatório');
      this.teamEdit.roleError.set('Cargo é obrigatório');
      this.teamEdit.departmentError.set('Departamento é obrigatório');
    }

    if (this.loading) {
      this.teamEdit.submitLoading.set(true);
    }
  }
}

const meta: Meta<TeamEditStoryComponent> = {
  title: 'Features/TeamEdit',
  component: TeamEditStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TeamEditStoryComponent>;

export const Default: Story = {
  args: {
    withErrors: false,
    loading: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('2') },
      ],
    },
  }),
};

export const WithValidationErrors: Story = {
  args: {
    withErrors: true,
    loading: false,
  },
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
  args: {
    withErrors: false,
    loading: false,
  },
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
  args: {
    withErrors: false,
    loading: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('999') },
      ],
    },
  }),
};
