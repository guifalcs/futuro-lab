import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { ActivatedRoute } from '@angular/router';
import {
  ArrowLeft,
  LifeBuoy,
  LUCIDE_ICONS,
  LucideIconProvider,
  MessageCircle,
} from 'lucide-angular';

import { TicketViewComponent } from '../app/features/support/ticket-view/ticket-view.component';
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
  selector: 'app-ticket-view-story',
  standalone: true,
  imports: [TicketViewComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, LifeBuoy, MessageCircle }),
      multi: true,
    },
  ],
  template: `
    <app-ticket-view></app-ticket-view>
    <app-toast />
  `,
})
class TicketViewStoryComponent {}

const meta: Meta<TicketViewStoryComponent> = {
  title: 'Features/TicketView',
  component: TicketViewStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TicketViewStoryComponent>;

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

export const ResolvedTicket: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('2') },
      ],
    },
  }),
};
