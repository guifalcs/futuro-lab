import { Component, computed, contentChildren, effect, input, model, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Inbox, Check, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Eye, Pencil, UserX, UserCheck } from 'lucide-angular';
import { TableCellDirective } from './table-cell.directive';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgTemplateOutlet, LucideAngularModule],
  providers: [
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider({ Inbox, Check, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Eye, Pencil, UserX, UserCheck }), multi: true },
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  columns = input<TableColumn[]>([]);
  data = input<Record<string, unknown>[]>([]);
  selectable = input<boolean>(false);
  selectedRows = input<number[]>([]);
  emptyMessage = input<string>('Nenhum registro encontrado');
  loading = input<boolean>(false);
  paginated = input<boolean>(false);
  pageSize = model<number>(10);
  pageSizeOptions = input<number[]>([5, 10, 20, 50]);
  currentPage = model<number>(1);

  rowClick = output<{ row: Record<string, unknown>; index: number }>();
  rowDoubleClick = output<{ row: Record<string, unknown>; index: number }>();
  selectionChange = output<number[]>();
  pageChange = output<number>();
  pageSizeChange = output<number>();

  cellTemplates = contentChildren(TableCellDirective);

  readonly skeletonRows = [0, 1, 2, 3, 4];

  totalItems = computed(() => this.data().length);

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()) || 1);

  paginatedData = computed(() => {
    if (!this.paginated()) return this.data();
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.data().slice(start, start + this.pageSize());
  });

  pageStart = computed(() => {
    if (this.totalItems() === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  pageEnd = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalItems()));

  canGoPrev = computed(() => this.currentPage() > 1);

  canGoNext = computed(() => this.currentPage() < this.totalPages());

  constructor() {
    effect(() => {
      this.data();
      this.currentPage.set(1);
    }, { allowSignalWrites: true });
  }

  templateMap = computed(() => {
    const map = new Map<string, TemplateRef<unknown>>();
    for (const t of this.cellTemplates()) {
      map.set(t.key(), t.templateRef);
    }
    return map;
  });

  totalCols = computed(() => this.columns().length + (this.selectable() ? 1 : 0));

  allSelected = computed(
    () => this.data().length > 0 && this.selectedRows().length === this.data().length,
  );

  someSelected = computed(() => this.selectedRows().length > 0 && !this.allSelected());

  isSelected(index: number): boolean {
    return this.selectedRows().includes(index);
  }

  getTemplate(key: string): TemplateRef<unknown> | undefined {
    return this.templateMap().get(key);
  }

  onRowClick(row: Record<string, unknown>, index: number): void {
    this.rowClick.emit({ row, index });
    if (this.selectable()) {
      const current = this.selectedRows();
      if (current.includes(index)) {
        this.selectionChange.emit(current.filter((i) => i !== index));
      } else {
        this.selectionChange.emit([...current, index]);
      }
    }
  }

  onRowDoubleClick(row: Record<string, unknown>, index: number): void {
    this.rowDoubleClick.emit({ row, index });
  }

  toggleAll(event: MouseEvent): void {
    event.stopPropagation();
    if (this.allSelected()) {
      this.selectionChange.emit([]);
    } else {
      this.selectionChange.emit(this.data().map((_, i) => i));
    }
  }

  toggleRow(event: MouseEvent, index: number): void {
    event.stopPropagation();
    const current = this.selectedRows();
    if (current.includes(index)) {
      this.selectionChange.emit(current.filter((i) => i !== index));
    } else {
      this.selectionChange.emit([...current, index]);
    }
  }

  onPageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(value);
    this.currentPage.set(1);
    this.pageSizeChange.emit(value);
  }

  goToFirst(): void {
    this.currentPage.set(1);
    this.pageChange.emit(1);
  }

  goToPrev(): void {
    const page = this.currentPage() - 1;
    this.currentPage.set(page);
    this.pageChange.emit(page);
  }

  goToNext(): void {
    const page = this.currentPage() + 1;
    this.currentPage.set(page);
    this.pageChange.emit(page);
  }

  goToLast(): void {
    const page = this.totalPages();
    this.currentPage.set(page);
    this.pageChange.emit(page);
  }
}
