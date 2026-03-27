import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';

export interface IDatepickerDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

let nextId = 0;

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ Calendar, ChevronLeft, ChevronRight }),
      multi: true,
    },
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
})
export class DatepickerComponent {
  private readonly el = inject(ElementRef);
  readonly inputId = `app-datepicker-${++nextId}`;

  placeholder = input<string>('dd/mm/aaaa');
  label = input<string>('');
  error = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  value = model<string>('');

  focused = output<void>();
  blurred = output<void>();

  isOpen = signal(false);
  viewDate = signal(new Date());
  highlightedDate = signal<Date | null>(null);

  hasError = computed(() => this.error().length > 0);
  hasLabel = computed(() => this.label().length > 0);

  readonly weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  currentMonthLabel = computed(() => {
    const date = this.viewDate();
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  });

  displayValue = computed(() => {
    const val = this.value();
    if (!val) return '';
    return val;
  });

  calendarDays = computed<IDatepickerDay[]>(() => {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();
    const today = new Date();
    const selectedDate = this.parseDate(this.value());

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const prevMonthLast = new Date(year, month, 0).getDate();

    const days: IDatepickerDay[] = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLast - i);
      days.push(this.createDay(date, false, today, selectedDate));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      days.push(this.createDay(date, true, today, selectedDate));
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      days.push(this.createDay(date, false, today, selectedDate));
    }

    return days;
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    if (!this.isOpen()) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.open();
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.moveHighlight(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.moveHighlight(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveHighlight(-7);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveHighlight(7);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.highlightedDate()) {
          this.selectDate(this.highlightedDate()!);
        }
        break;
    }
  }

  open(): void {
    if (this.disabled()) return;

    const selected = this.parseDate(this.value());
    if (selected) {
      this.viewDate.set(new Date(selected.getFullYear(), selected.getMonth(), 1));
      this.highlightedDate.set(selected);
    } else {
      const today = new Date();
      this.viewDate.set(new Date(today.getFullYear(), today.getMonth(), 1));
      this.highlightedDate.set(today);
    }

    this.isOpen.set(true);
    this.focused.emit();
  }

  close(): void {
    this.isOpen.set(false);
    this.blurred.emit();
  }

  toggleDropdown(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  prevMonth(): void {
    this.viewDate.update(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(): void {
    this.viewDate.update(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;

    const formatted = this.formatDate(date);
    this.value.set(formatted);
    this.close();
  }

  trackByDay(_index: number, day: IDatepickerDay): string {
    return day.date.toISOString();
  }

  private moveHighlight(offset: number): void {
    const current = this.highlightedDate() ?? new Date();
    const next = new Date(current);
    next.setDate(next.getDate() + offset);

    if (next.getMonth() !== this.viewDate().getMonth() || next.getFullYear() !== this.viewDate().getFullYear()) {
      this.viewDate.set(new Date(next.getFullYear(), next.getMonth(), 1));
    }

    this.highlightedDate.set(next);
  }

  private createDay(date: Date, isCurrentMonth: boolean, today: Date, selectedDate: Date | null): IDatepickerDay {
    return {
      date,
      day: date.getDate(),
      isCurrentMonth,
      isToday: this.isSameDay(date, today),
      isSelected: selectedDate ? this.isSameDay(date, selectedDate) : false,
      isDisabled: this.isDateDisabled(date),
    };
  }

  private isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();

    if (min && date < this.startOfDay(min)) return true;
    if (max && date > this.startOfDay(max)) return true;
    return false;
  }

  private isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private parseDate(value: string): Date | null {
    if (!value) return null;

    const parts = value.split('/');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

    const date = new Date(year, month, day);
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) return null;

    return date;
  }
}
