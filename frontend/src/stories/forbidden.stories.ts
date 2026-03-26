import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { ForbiddenComponent } from '../app/features/error/forbidden/forbidden.component';

const meta: Meta<ForbiddenComponent> = {
  title: 'Pages/Error/Forbidden',
  component: ForbiddenComponent,
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
type Story = StoryObj<ForbiddenComponent>;

export const Default: Story = {};
