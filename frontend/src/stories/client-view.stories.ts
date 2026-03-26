import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { ActivatedRoute } from '@angular/router';
import {
  Activity,
  ArrowLeft,
  Building2,
  LUCIDE_ICONS,
  LucideIconProvider,
  Pencil,
} from 'lucide-angular';

import { ClientViewComponent } from '../app/features/clients/client-view/client-view.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

function mockActivatedRoute(id: string): Partial<ActivatedRoute> {
  return {
    snapshot: {
      paramMap: {
        get: (key: string) => (key === 'id' ? id : null),
        has: () => true,
        getAll: () => [],
        keys: [],
      },
    } as unknown as ActivatedRoute['snapshot'],
  };
}

@Component({
  selector: 'app-client-view-story',
  standalone: true,
  imports: [ClientViewComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, Pencil, Building2, Activity }),
      multi: true,
    },
  ],
  template: `
    <app-client-view></app-client-view>
    <app-toast />
  `,
})
class ClientViewStoryComponent {}

const meta: Meta<ClientViewStoryComponent> = {
  title: 'Features/ClientView',
  component: ClientViewStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ClientViewStoryComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('1') },
      ],
    },
  }),
};

export const MEIClient: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('8') },
      ],
    },
  }),
};

export const InactiveClient: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('7') },
      ],
    },
  }),
};

export const WithoutNotes: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('4') },
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
