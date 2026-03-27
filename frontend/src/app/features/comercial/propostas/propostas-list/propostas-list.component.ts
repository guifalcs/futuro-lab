import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  Plus,
  Pencil,
  Eye,
  Copy,
  FileDown,
  RefreshCw,
  ChevronDown,
  ArrowRightLeft,
} from 'lucide-angular';

import { TableComponent, TableColumn } from '../../../../shared/components/table/table.component';
import { TableCellDirective } from '../../../../shared/components/table/table-cell.directive';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BadgeComponent, BadgeVariant } from '../../../../shared/components/badge/badge.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../../shared/components/modal/modal-footer.directive';
import { SelectComponent, ISelectOption } from '../../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { DatepickerComponent } from '../../../../shared/components/datepicker/datepicker.component';
import { PropostaMockService } from '../services/proposta-mock.service';
import { PropostaExportService } from '../services/proposta-export.service';
import { IProposta, PropostaStatus, TRANSICOES_STATUS } from '../models/proposta.model';
import { ToastService } from '../../../../core/services/toast.service';

const STATUS_BADGE_MAP: Record<PropostaStatus, BadgeVariant> = {
  [PropostaStatus.EM_ELABORACAO]: 'neutral',
  [PropostaStatus.AGUARDANDO]: 'warning',
  [PropostaStatus.ACEITA]: 'success',
  [PropostaStatus.RECUSADA]: 'danger',
  [PropostaStatus.CANCELADA]: 'neutral',
};

@Component({
  selector: 'app-propostas-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    LucideAngularModule,
    TableComponent,
    TableCellDirective,
    ButtonComponent,
    BadgeComponent,
    ModalComponent,
    ModalFooterDirective,
    SelectComponent,
    TextareaComponent,
    DatepickerComponent,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        Plus,
        Pencil,
        Eye,
        Copy,
        FileDown,
        RefreshCw,
        ChevronDown,
        ArrowRightLeft,
      }),
      multi: true,
    },
  ],
  templateUrl: './propostas-list.component.html',
  styleUrl: './propostas-list.component.scss',
})
export class PropostasListComponent {
  private readonly propostaMockService = inject(PropostaMockService);
  private readonly exportService = inject(PropostaExportService);
  private readonly toast = inject(ToastService);
  readonly router = inject(Router);

  readonly columns: TableColumn[] = [
    { key: 'id', label: 'ID', width: '80px', align: 'center' },
    { key: 'status', label: 'Status', width: '140px', align: 'center' },
    { key: 'responsavel', label: 'Responsável', width: '160px' },
    { key: 'numeroProposta', label: 'Nº Proposta', width: '160px' },
    { key: 'versao', label: 'Versão', width: '80px', align: 'center' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'cnpjCliente', label: 'CNPJ Cliente', width: '170px' },
    { key: 'totalReais', label: 'Total R$', width: '120px', align: 'right' },
    { key: 'dataCriacao', label: 'Data Criação', width: '130px', align: 'center' },
    { key: 'dataValidade', label: 'Validade', width: '130px', align: 'center' },
  ];

  readonly propostas = signal<IProposta[]>([]);
  readonly selectedRows = signal<number[]>([]);
  readonly exportDropdownOpen = signal(false);

  // ── Modal: Criar Revisão ─────────────────────────────────
  readonly revisaoModalOpen = signal(false);
  readonly revisaoProposta = signal<IProposta | null>(null);

  // ── Modal: Copiar Proposta ───────────────────────────────
  readonly copiarModalOpen = signal(false);
  readonly copiarProposta = signal<IProposta | null>(null);
  readonly copiarClienteCnpj = signal('');
  readonly clienteOptions = computed<ISelectOption[]>(() =>
    this.propostaMockService.listarClientes().map((c) => ({ value: c.cnpj, label: c.nome })),
  );

  // ── Modal: Alterar Status ─────────────────────────────
  readonly statusModalOpen = signal(false);
  readonly statusProposta = signal<IProposta | null>(null);
  readonly statusNovoSelecionado = signal('');
  readonly statusMotivo = signal('');
  readonly statusDataAceite = signal('');

  readonly statusTransicoes = computed<ISelectOption[]>(() => {
    const p = this.statusProposta();
    if (!p) return [];
    return TRANSICOES_STATUS[p.status].map((s) => ({ value: s, label: s }));
  });

  readonly statusPrecisaMotivo = computed(() => {
    const s = this.statusNovoSelecionado();
    return s === PropostaStatus.RECUSADA || s === PropostaStatus.CANCELADA;
  });

  readonly statusPrecisaDataAceite = computed(() => {
    return this.statusNovoSelecionado() === PropostaStatus.ACEITA;
  });

  readonly statusFormValido = computed(() => {
    if (!this.statusNovoSelecionado()) return false;
    if (this.statusPrecisaMotivo() && !this.statusMotivo().trim()) return false;
    if (this.statusPrecisaDataAceite() && !this.statusDataAceite()) return false;
    return true;
  });

  readonly podeAlterarStatusSelecionada = computed(() => {
    const indices = this.selectedRows();
    if (indices.length === 0) return false;
    const proposta = this.propostas()[indices[0]];
    return TRANSICOES_STATUS[proposta.status].length > 0;
  });

  readonly tableData = computed<Record<string, unknown>[]>(() =>
    this.propostas().map((p) => ({ ...p } as unknown as Record<string, unknown>)),
  );

  readonly hasSelection = computed(() => this.selectedRows().length > 0);

  constructor() {
    this.propostas.set(this.propostaMockService.listar());
  }

  getStatusVariant(status: string): BadgeVariant {
    return STATUS_BADGE_MAP[status as PropostaStatus] ?? 'neutral';
  }

  onSelectionChange(indices: number[]): void {
    this.selectedRows.set(indices);
  }

  toggleExportDropdown(): void {
    this.exportDropdownOpen.update((v) => !v);
  }

  closeExportDropdown(): void {
    this.exportDropdownOpen.set(false);
  }

  onExport(format: 'excel' | 'pdf'): void {
    this.exportDropdownOpen.set(false);
    const indices = this.selectedRows();
    const lista = indices.length > 0
      ? indices.map((i) => this.propostas()[i])
      : this.propostas();

    const qtd = lista.length;
    this.toast.info(`Exportando ${qtd} proposta${qtd > 1 ? 's' : ''}...`);

    if (format === 'excel') {
      this.exportService.exportExcel(lista);
    } else {
      this.exportService.exportPdf(lista);
    }

    this.toast.success('Exportação concluída!');
  }

  visualizarSelecionada(): void {
    const indices = this.selectedRows();
    if (indices.length === 0) return;
    const proposta = this.propostas()[indices[0]];
    this.router.navigate(['/comercial/propostas', proposta.id]);
  }

  editarSelecionada(): void {
    const indices = this.selectedRows();
    if (indices.length === 0) return;
    const proposta = this.propostas()[indices[0]];
    if (proposta.status === PropostaStatus.ACEITA) {
      this.toast.info('Proposta aceita não pode ser editada. Use "Criar Revisão".');
      return;
    }
    if (proposta.status === PropostaStatus.CANCELADA) {
      this.toast.info('Proposta cancelada não pode ser editada.');
      return;
    }
    this.router.navigate(['/comercial/propostas', proposta.id, 'editar']);
  }

  onRowDoubleClick(event: { row: Record<string, unknown>; index: number }): void {
    const id = event.row['id'] as number;
    this.router.navigate(['/comercial/propostas', id]);
  }

  // ── Criar Revisão ────────────────────────────────────────
  abrirRevisaoModal(): void {
    const indices = this.selectedRows();
    if (indices.length === 0) return;
    this.revisaoProposta.set(this.propostas()[indices[0]]);
    this.revisaoModalOpen.set(true);
  }

  fecharRevisaoModal(): void {
    this.revisaoModalOpen.set(false);
    this.revisaoProposta.set(null);
  }

  confirmarRevisao(): void {
    const proposta = this.revisaoProposta();
    if (!proposta) return;
    const nova = this.propostaMockService.criarRevisao(proposta.id);
    if (!nova) {
      this.toast.error('Erro ao criar revisão.');
      this.fecharRevisaoModal();
      return;
    }
    this.toast.success(`Revisão v${nova.versao} criada com sucesso`);
    this.fecharRevisaoModal();
    this.propostas.set(this.propostaMockService.listar());
    this.selectedRows.set([]);
    this.router.navigate(['/comercial/propostas', nova.id, 'editar']);
  }

  // ── Copiar Proposta ──────────────────────────────────────
  abrirCopiarModal(): void {
    const indices = this.selectedRows();
    if (indices.length === 0) return;
    const proposta = this.propostas()[indices[0]];
    this.copiarProposta.set(proposta);
    this.copiarClienteCnpj.set(proposta.cnpjCliente);
    this.copiarModalOpen.set(true);
  }

  fecharCopiarModal(): void {
    this.copiarModalOpen.set(false);
    this.copiarProposta.set(null);
    this.copiarClienteCnpj.set('');
  }

  confirmarCopia(): void {
    const proposta = this.copiarProposta();
    if (!proposta) return;
    const clienteCnpj = this.copiarClienteCnpj() !== proposta.cnpjCliente
      ? this.copiarClienteCnpj()
      : undefined;
    const nova = this.propostaMockService.copiarProposta(proposta.id, clienteCnpj);
    if (!nova) {
      this.toast.error('Erro ao copiar proposta.');
      this.fecharCopiarModal();
      return;
    }
    this.toast.success(`Proposta ${nova.numeroProposta} criada a partir de ${proposta.numeroProposta}`);
    this.fecharCopiarModal();
    this.propostas.set(this.propostaMockService.listar());
    this.selectedRows.set([]);
    this.router.navigate(['/comercial/propostas', nova.id, 'editar']);
  }

  // ── Alterar Status ────────────────────────────────────
  abrirStatusModal(): void {
    const indices = this.selectedRows();
    if (indices.length === 0) return;
    const proposta = this.propostas()[indices[0]];
    if (TRANSICOES_STATUS[proposta.status].length === 0) {
      this.toast.info('Este status não permite transições.');
      return;
    }
    this.statusProposta.set(proposta);
    this.statusNovoSelecionado.set('');
    this.statusMotivo.set('');
    this.statusDataAceite.set('');
    this.statusModalOpen.set(true);
  }

  fecharStatusModal(): void {
    this.statusModalOpen.set(false);
    this.statusProposta.set(null);
  }

  confirmarAlteracaoStatus(): void {
    const proposta = this.statusProposta();
    if (!proposta || !this.statusFormValido()) return;

    const novoStatus = this.statusNovoSelecionado() as PropostaStatus;
    const motivo = this.statusPrecisaMotivo() ? this.statusMotivo().trim() : undefined;
    const dataAceite = this.statusPrecisaDataAceite() ? this.parseDateBr(this.statusDataAceite()) : undefined;

    const sucesso = this.propostaMockService.alterarStatus(proposta.id, novoStatus, motivo, dataAceite);
    if (!sucesso) {
      this.toast.error('Erro ao alterar status.');
      this.fecharStatusModal();
      return;
    }

    this.toast.success(`Status de ${proposta.numeroProposta} alterado para "${novoStatus}"`);
    this.fecharStatusModal();
    this.propostas.set(this.propostaMockService.listar());
    this.selectedRows.set([]);
  }

  private parseDateBr(value: string): Date {
    const [d, m, y] = value.split('/');
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
}
