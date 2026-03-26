import type { Meta, StoryObj } from '@storybook/angular';
import {
  Check,
  ChevronDown,
  LUCIDE_ICONS,
  LucideIconProvider,
  X,
} from 'lucide-angular';

import { MultiSelectComponent } from '../app/shared/components/multi-select/multi-select.component';
import { ISelectOption } from '../app/shared/components/select/select.component';

const statusOptions: ISelectOption[] = [
  { value: 'open', label: 'Aberto' },
  { value: 'in_analysis', label: 'Em Análise' },
  { value: 'resolved', label: 'Resolvido' },
  { value: 'closed', label: 'Fechado' },
];

const meta: Meta<MultiSelectComponent> = {
  title: 'Components/MultiSelect',
  component: MultiSelectComponent,
  tags: ['autodocs'],
  decorators: [
    (story) => {
      const result = story();
      result.moduleMetadata = {
        ...result.moduleMetadata,
        providers: [
          {
            provide: LUCIDE_ICONS,
            useValue: new LucideIconProvider({ ChevronDown, Check, X }),
            multi: true,
          },
        ],
      };
      return result;
    },
  ],
};

export default meta;
type Story = StoryObj<MultiSelectComponent>;

export const Default: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Todos os status',
    value: [],
  },
};

export const WithLabel: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Selecione...',
    label: 'Status',
    value: [],
  },
};

export const WithSelection: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Todos os status',
    value: ['open', 'in_analysis'],
  },
};

export const Disabled: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Todos os status',
    disabled: true,
    value: [],
  },
};
