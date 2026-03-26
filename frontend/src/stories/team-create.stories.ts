import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  ArrowLeft,
  LUCIDE_ICONS,
  LucideIconProvider,
} from 'lucide-angular';

import { TeamCreateComponent } from '../app/features/team/team-create/team-create.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

@Component({
  selector: 'app-team-create-story',
  standalone: true,
  imports: [TeamCreateComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft }),
      multi: true,
    },
  ],
  template: `
    <app-team-create #teamCreate></app-team-create>
    <app-toast />
  `,
})
class TeamCreateStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(TeamCreateComponent) teamCreate?: TeamCreateComponent;

  @Input() withErrors = false;
  @Input() loading = false;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.teamCreate) return;

    if (this.withErrors) {
      this.teamCreate.nameError.set('Nome é obrigatório');
      this.teamCreate.emailError.set('E-mail é obrigatório');
      this.teamCreate.roleError.set('Cargo é obrigatório');
      this.teamCreate.departmentError.set('Departamento é obrigatório');
    }

    if (this.loading) {
      this.teamCreate.submitLoading.set(true);
    }
  }
}

const meta: Meta<TeamCreateStoryComponent> = {
  title: 'Features/TeamCreate',
  component: TeamCreateStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TeamCreateStoryComponent>;

export const Default: Story = {
  args: {
    withErrors: false,
    loading: false,
  },
};

export const WithValidationErrors: Story = {
  args: {
    withErrors: true,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    withErrors: false,
    loading: true,
  },
};
