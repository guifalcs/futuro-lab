import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { ProfileComponent } from '../app/features/profile/profile.component';
import { ToastComponent } from '../app/shared/components/toast/toast.component';

@Component({
  selector: 'app-profile-story',
  standalone: true,
  imports: [ProfileComponent, ToastComponent],
  template: `
    <app-profile #profile></app-profile>
    <app-toast />
  `,
})
class ProfileStoryComponent implements AfterViewInit, OnChanges {
  @ViewChild(ProfileComponent)
  profile?: ProfileComponent;

  @Input() fullName = 'Sirlene Sales';
  @Input() nameError = '';
  @Input() loading = false;

  ngAfterViewInit(): void {
    this.applyState();
  }

  ngOnChanges(): void {
    this.applyState();
  }

  private applyState(): void {
    if (!this.profile) return;

    this.profile.fullName.set(this.fullName);
    this.profile.nameError.set(this.nameError);
    this.profile.isLoading.set(this.loading);
  }
}

const meta: Meta<ProfileStoryComponent> = {
  title: 'Pages/Profile',
  component: ProfileStoryComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ProfileStoryComponent>;

export const Default: Story = {};

export const WithValidationError: Story = {
  args: {
    fullName: '',
    nameError: 'Nome é obrigatório',
  },
};
