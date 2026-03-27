import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  Check,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';

export interface IStepperStep {
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [NgClass, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ Check }),
      multi: true,
    },
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  steps = input.required<IStepperStep[]>();
  currentStep = input<number>(0);

  stepClick = output<number>();

  isCompleted(index: number): boolean {
    return index < this.currentStep();
  }

  isCurrent(index: number): boolean {
    return index === this.currentStep();
  }

  isClickable(index: number): boolean {
    const step = this.steps()[index];
    if (step.disabled) return false;
    return index <= this.currentStep();
  }

  onStepClick(index: number): void {
    if (this.isClickable(index)) {
      this.stepClick.emit(index);
    }
  }
}
