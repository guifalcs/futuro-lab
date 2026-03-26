import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  AlertTriangle,
  Ban,
  Building2,
  Eye,
  LUCIDE_ICONS,
  LucideIconProvider,
  Pencil,
  Plus,
} from 'lucide-angular';

import { ClientListComponent } from '../app/features/clients/client-list/client-list.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';
import { IClient, MOCK_CLIENTS } from '../app/features/clients/data/client-mock';

@Component({
  selector: 'app-client-list-story',
  standalone: true,
  imports: [ClientListComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        AlertTriangle,
        Ban,
        Building2,
        Eye,
        Pencil,
        Plus,
      }),
      multi: true,
    },
  ],
  template: `
    <app-client-list #clientList></app-client-list>
    <app-toast />
  `,
})
class ClientListStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(ClientListComponent) clientList?: ClientListComponent;

  @Input() clients: IClient[] = [...MOCK_CLIENTS];
  @Input() modalOpen = false;
  @Input() modalClient: IClient | null = null;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.clientList) return;

    this.clientList.clients.set(this.clients);

    if (this.modalOpen && this.modalClient) {
      this.clientList.selectedClient.set(this.modalClient);
      this.clientList.statusModalOpen.set(true);
    }
  }
}

const meta: Meta<ClientListStoryComponent> = {
  title: 'Features/ClientList',
  component: ClientListStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ClientListStoryComponent>;

export const Default: Story = {
  args: {
    clients: [...MOCK_CLIENTS],
  },
};

export const EmptyState: Story = {
  args: {
    clients: [],
  },
};

export const WithDeactivationModal: Story = {
  args: {
    clients: [...MOCK_CLIENTS],
    modalOpen: true,
    modalClient: MOCK_CLIENTS[0],
  },
};
