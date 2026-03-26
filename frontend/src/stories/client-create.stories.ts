import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { ActivatedRoute } from '@angular/router';
import {
  ArrowLeft,
  LUCIDE_ICONS,
  LucideIconProvider,
} from 'lucide-angular';

import { ClientCreateComponent } from '../app/features/clients/client-create/client-create.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

@Component({
  selector: 'app-client-create-story',
  standalone: true,
  imports: [ClientCreateComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft }),
      multi: true,
    },
  ],
  template: `
    <app-client-create></app-client-create>
    <app-toast />
  `,
})
class ClientCreateStoryComponent {}

const meta: Meta<ClientCreateStoryComponent> = {
  title: 'Features/ClientCreate',
  component: ClientCreateStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ClientCreateStoryComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null, has: () => false, getAll: () => [], keys: [] } } },
        },
      ],
    },
  }),
};

export const WithValidationErrors: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null, has: () => false, getAll: () => [], keys: [] } } },
        },
      ],
    },
  }),
};

export const Loading: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null, has: () => false, getAll: () => [], keys: [] } } },
        },
      ],
    },
  }),
};
