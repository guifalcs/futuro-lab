import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  ArrowLeft,
  FileText,
  Image,
  LUCIDE_ICONS,
  LucideIconProvider,
  Upload,
  X,
} from 'lucide-angular';

import { TicketCreateComponent } from '../app/features/support/ticket-create/ticket-create.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

@Component({
  selector: 'app-ticket-create-story',
  standalone: true,
  imports: [TicketCreateComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, Upload, Image, FileText, X }),
      multi: true,
    },
  ],
  template: `
    <app-ticket-create></app-ticket-create>
    <app-toast />
  `,
})
class TicketCreateStoryComponent {}

const meta: Meta<TicketCreateStoryComponent> = {
  title: 'Features/TicketCreate',
  component: TicketCreateStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TicketCreateStoryComponent>;

export const Default: Story = {};

export const WithValidationErrors: Story = {
  render: () => ({
    template: `
      <app-ticket-create-story></app-ticket-create-story>
    `,
    moduleMetadata: {
      imports: [TicketCreateStoryComponent],
    },
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <app-ticket-create-story></app-ticket-create-story>
    `,
    moduleMetadata: {
      imports: [TicketCreateStoryComponent],
    },
  }),
};
