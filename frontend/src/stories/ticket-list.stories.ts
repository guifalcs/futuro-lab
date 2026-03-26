import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  Eye,
  LifeBuoy,
  LUCIDE_ICONS,
  LucideIconProvider,
  Plus,
} from 'lucide-angular';

import { TicketListComponent } from '../app/features/support/ticket-list/ticket-list.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';
import { ITicket, MOCK_TICKETS } from '../app/features/support/data/support-mock';

@Component({
  selector: 'app-ticket-list-story',
  standalone: true,
  imports: [TicketListComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        Eye,
        LifeBuoy,
        Plus,
      }),
      multi: true,
    },
  ],
  template: `
    <app-ticket-list #ticketList></app-ticket-list>
    <app-toast />
  `,
})
class TicketListStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(TicketListComponent) ticketList?: TicketListComponent;

  @Input() tickets: ITicket[] = [...MOCK_TICKETS];

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.ticketList) return;
    this.ticketList.tickets.set(this.tickets);
  }
}

const meta: Meta<TicketListStoryComponent> = {
  title: 'Features/TicketList',
  component: TicketListStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TicketListStoryComponent>;

export const Default: Story = {
  args: {
    tickets: [...MOCK_TICKETS],
  },
};

export const EmptyState: Story = {
  args: {
    tickets: [],
  },
};
