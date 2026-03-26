import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from '../app/features/error/not-found/not-found.component';

const meta: Meta<NotFoundComponent> = {
  title: 'Pages/Error/NotFound',
  component: NotFoundComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<NotFoundComponent>;

export const Default: Story = {};
