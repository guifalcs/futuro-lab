import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AvatarComponent } from '../app/shared/components/avatar/avatar.component';
import { CommonModule } from '@angular/common';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Sirlene Sales',
  },
};

export const SingleName: Story = {
  args: {
    name: 'Guilherme',
  },
};

export const Fallback: Story = {
  args: {},
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <app-avatar size="sm"></app-avatar>
        <app-avatar size="md"></app-avatar>
        <app-avatar size="lg"></app-avatar>
        <app-avatar size="xl"></app-avatar>
      </div>
    `,
  }),
};

export const WithStatusOnline: Story = {
  args: {
    name: 'Sirlene Sales',
    status: 'online',
  },
};

export const WithStatusBusy: Story = {
  args: {
    name: 'Sirlene Sales',
    status: 'busy',
  },
};

export const WithStatusAway: Story = {
  args: {
    name: 'Sirlene Sales',
    status: 'away',
  },
};

export const WithStatusOffline: Story = {
  args: {
    name: 'Sirlene Sales',
    status: 'offline',
  },
};

export const EquipeStatus: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <app-avatar name="Sirlene" status="online"></app-avatar>
        <app-avatar name="João" status="busy"></app-avatar>
        <app-avatar name="Maria" status="away"></app-avatar>
        <app-avatar name="José" status="offline"></app-avatar>
      </div>
    `,
  }),
};