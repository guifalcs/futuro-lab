import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { TableComponent } from '../app/shared/components/table/table.component';
import { TableCellDirective } from '../app/shared/components/table/table-cell.directive';
import { BadgeComponent } from '../app/shared/components/badge/badge.component';

const COLUMNS = [
  { key: 'name', label: 'Nome', width: '200px' },
  { key: 'department', label: 'Departamento' },
  { key: 'role', label: 'Cargo' },
  { key: 'date', label: 'Data de Admissão', align: 'center' as const },
];

const SAMPLE_DATA = [
  { name: 'Ana Souza', department: 'Departamento Pessoal', role: 'Analista', date: '10/01/2024' },
  { name: 'Carlos Lima', department: 'Contabilidade', role: 'Contador', date: '05/03/2023' },
  { name: 'Fernanda Costa', department: 'Departamento Pessoal', role: 'Assistente', date: '22/07/2023' },
  { name: 'Ricardo Alves', department: 'TI', role: 'Desenvolvedor', date: '14/11/2022' },
  { name: 'Juliana Melo', department: 'Contabilidade', role: 'Auditora', date: '01/06/2024' },
];

const meta: Meta<TableComponent> = {
  title: 'Components/Table',
  component: TableComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      columns: COLUMNS,
      data: SAMPLE_DATA,
    },
    template: `
      <app-table [columns]="columns" [data]="data" />
    `,
  }),
};

export const Empty: Story = {
  render: () => ({
    props: { columns: COLUMNS, data: [] },
    template: `<app-table [columns]="columns" [data]="data" />`,
  }),
};

export const Loading: Story = {
  render: () => ({
    props: { columns: COLUMNS, data: [] as Record<string, unknown>[], loading: true },
    template: `<app-table [columns]="columns" [data]="data" [loading]="loading" />`,
  }),
};

export const Selectable: Story = {
  render: () => {
    const selected = signal<number[]>([]);
    return {
      props: {
        columns: COLUMNS,
        data: SAMPLE_DATA,
        selected,
        onSelection: (indices: number[]) => selected.set(indices),
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <app-table
            [columns]="columns"
            [data]="data"
            [selectable]="true"
            [selectedRows]="selected()"
            (selectionChange)="onSelection($event)"
          />
          <p style="font-size: 13px; color: #6B7280; margin: 0;">
            Selecionados: {{ selected().length }} de {{ data.length }} —
            Índices: {{ selected().join(', ') || 'nenhum' }}
          </p>
        </div>
      `,
    };
  },
};

export const CustomColumnTemplate: Story = {
  name: 'Custom Column Template (badge de status)',
  render: () => ({
    props: {
      columns: [
        { key: 'name', label: 'Nome', width: '200px' },
        { key: 'type', label: 'Tipo' },
        { key: 'deadline', label: 'Prazo', align: 'center' as const },
        { key: 'status', label: 'Status', align: 'center' as const },
      ],
      data: [
        { name: 'João da Silva', type: 'Admissão', deadline: '25/03/2026', status: 'warning', statusLabel: 'Próximo' },
        { name: 'Maria Oliveira', type: 'Rescisão', deadline: '20/03/2026', status: 'danger', statusLabel: 'Atrasado' },
        { name: 'Pedro Santos', type: 'Férias', deadline: '10/04/2026', status: 'success', statusLabel: 'No Prazo' },
        { name: 'Lúcia Ferreira', type: 'Admissão', deadline: '30/04/2026', status: 'success', statusLabel: 'No Prazo' },
        { name: 'Roberto Nunes', type: 'Rescisão', deadline: '15/03/2026', status: 'neutral', statusLabel: 'Concluído' },
      ] as Record<string, unknown>[],
    },
    moduleMetadata: {
      imports: [TableCellDirective, BadgeComponent],
    },
    template: `
      <app-table [columns]="columns" [data]="data">
        <ng-template appTableCell="status" let-row>
          <app-badge [variant]="row.status" [text]="row.statusLabel" size="sm" />
        </ng-template>
      </app-table>
    `,
  }),
};

export const ManyRows: Story = {
  name: 'Many Rows (scroll vertical)',
  render: () => {
    const rows = Array.from({ length: 25 }, (_, i) => ({
      name: `Colaborador ${i + 1}`,
      department: i % 2 === 0 ? 'Departamento Pessoal' : 'Contabilidade',
      role: i % 3 === 0 ? 'Analista' : i % 3 === 1 ? 'Assistente' : 'Contador',
      date: `${String((i % 28) + 1).padStart(2, '0')}/0${(i % 9) + 1}/2024`,
    }));
    return {
      props: { columns: COLUMNS, data: rows },
      template: `
        <div style="height: 400px; overflow-y: auto; border-radius: 12px;">
          <app-table [columns]="columns" [data]="data" />
        </div>
      `,
    };
  },
};

export const WithPagination: Story = {
  render: () => {
    const rows = Array.from({ length: 30 }, (_, i) => ({
      name: `Colaborador ${i + 1}`,
      department: ['Departamento Pessoal', 'Contabilidade', 'TI', 'Financeiro'][i % 4],
      role: ['Analista', 'Assistente', 'Contador', 'Desenvolvedor', 'Auditor'][i % 5],
      date: `${String((i % 28) + 1).padStart(2, '0')}/0${(i % 9) + 1}/2024`,
    }));
    return {
      props: {
        columns: COLUMNS,
        data: rows,
      },
      template: `
        <app-table
          [columns]="columns"
          [data]="data"
          [paginated]="true"
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 20, 50]"
        />
      `,
    };
  },
};
