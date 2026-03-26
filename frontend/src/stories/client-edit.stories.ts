import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { ActivatedRoute } from '@angular/router';
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  Building2,
  LUCIDE_ICONS,
  LucideIconProvider,
} from 'lucide-angular';

import { ClientEditComponent } from '../app/features/clients/client-edit/client-edit.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

function mockActivatedRoute(id: string): Partial<ActivatedRoute> {
  return {
    snapshot: {
      paramMap: {
        get: (key: string) => key === 'id' ? id : null,
        has: () => true,
        getAll: () => [],
        keys: [],
      },
    } as unknown as ActivatedRoute['snapshot'],
  };
}

@Component({
  selector: 'app-client-edit-story',
  standalone: true,
  imports: [ClientEditComponent, ToastComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ ArrowLeft, Building2, Ban, AlertTriangle }),
      multi: true,
    },
  ],
  template: `
    <app-client-edit #clientEdit></app-client-edit>
    <app-toast />
  `,
})
class ClientEditStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(ClientEditComponent) clientEdit?: ClientEditComponent;

  @Input() withErrors = false;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.clientEdit) return;

    if (this.withErrors) {
      this.clientEdit.companyNameError.set('Razão social é obrigatória');
      this.clientEdit.tradeNameError.set('Nome fantasia é obrigatório');
      this.clientEdit.taxRegimeError.set('Regime tributário é obrigatório');
      this.clientEdit.emailError.set('E-mail é obrigatório');
      this.clientEdit.responsibleError.set('Responsável é obrigatório');
    }
  }
}

const meta: Meta<ClientEditStoryComponent> = {
  title: 'Features/ClientEdit',
  component: ClientEditStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ClientEditStoryComponent>;

export const Default: Story = {
  args: {
    withErrors: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('1') },
      ],
    },
  }),
};

export const InactiveClient: Story = {
  args: {
    withErrors: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('7') },
      ],
    },
  }),
};

export const WithValidationErrors: Story = {
  args: {
    withErrors: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute('1') },
      ],
    },
  }),
};

export const NotFound: Story = {
  args: {
    withErrors: false,
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
