import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  ClipboardList,
  CopyPlus,
  FileText,
  Pencil,
  Send,
  User,
  Building2,
  CalendarDays,
  DollarSign,
  ShieldCheck,
  MessageSquare,
  History,
  ArrowRightLeft,
} from 'lucide-angular';

import { CardComponent } from '../../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../../shared/components/card/card-header.directive';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../../shared/components/modal/modal-footer.directive';
import { BadgeComponent, BadgeVariant } from '../../../../shared/components/badge/badge.component';
import { TableComponent, TableColumn } from '../../../../shared/components/table/table.component';
import { TableCellDirective } from '../../../../shared/components/table/table-cell.directive';
import { SelectComponent, ISelectOption } from '../../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { DatepickerComponent } from '../../../../shared/components/datepicker/datepicker.component';
import { PropostaMockService } from '../services/proposta-mock.service';
import { ToastService } from '../../../../core/services/toast.service';
import {
  IPropostaDetalhada,
  IAlteracaoStatus,
  AnaliseCriticaResposta,
  PropostaStatus,
  TRANSICOES_STATUS,
} from '../models/proposta.model';

const STATUS_BADGE_MAP: Record<PropostaStatus, BadgeVariant> = {
  [PropostaStatus.EM_ELABORACAO]: 'neutral',
  [PropostaStatus.AGUARDANDO]: 'warning',
  [PropostaStatus.ACEITA]: 'success',
  [PropostaStatus.RECUSADA]: 'danger',
  [PropostaStatus.CANCELADA]: 'neutral',
};

const ANALISE_LABELS: { key: keyof IPropostaDetalhada['analiseCritica']; label: string }[] = [
  { key: 'aspectoFinanceiro', label: 'O aspecto financeiro será atendido na proposta?' },
  { key: 'questoesLegais', label: 'As questões legais serão atendidas na proposta?' },
  { key: 'estruturaFisica', label: 'A estrutura física atende a esta proposta?' },
  { key: 'subcontratacao', label: 'Se necessário, a subcontratação atenderá a proposta?' },
  { key: 'artNecessaria', label: 'ART é necessária?' },
  { key: 'conclusaoAtende', label: 'Em conclusão, o laboratório atende a esta proposta?' },
];

const RESPOSTA_BADGE: Record<AnaliseCriticaResposta, { variant: BadgeVariant; text: string }> = {
  sim: { variant: 'success', text: 'Sim' },
  nao: { variant: 'danger', text: 'Não' },
  na: { variant: 'neutral', text: 'Não aplicável' },
};

@Component({
  selector: 'app-proposta-view',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    LucideAngularModule,
    CardComponent,
    CardHeaderDirective,
    ButtonComponent,
    BadgeComponent,
    TableComponent,
    TableCellDirective,
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
        ArrowLeft,
        ClipboardList,
        CopyPlus,
        FileText,
        Pencil,
        Send,
        User,
        Building2,
        CalendarDays,
        DollarSign,
        ShieldCheck,
        MessageSquare,
        History,
        ArrowRightLeft,
      }),
      multi: true,
    },
  ],
  templateUrl: './proposta-view.component.html',
  styleUrl: './proposta-view.component.scss',
})
export class PropostaViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly mockService = inject(PropostaMockService);
  private readonly toast = inject(ToastService);

  readonly proposta = signal<IPropostaDetalhada | undefined>(undefined);
  readonly revisaoModalOpen = signal(false);

  // ── Status change ─────────────────────────────────────
  readonly statusModalOpen = signal(false);
  readonly statusNovoSelecionado = signal('');
  readonly statusMotivo = signal('');
  readonly statusDataAceite = signal('');

  readonly transicoesDisponiveis = computed<ISelectOption[]>(() => {
    const p = this.proposta();
    if (!p) return [];
    return TRANSICOES_STATUS[p.status].map((s) => ({ value: s, label: s }));
  });

  readonly podeAlterarStatus = computed(() => this.transicoesDisponiveis().length > 0);

  readonly precisaMotivo = computed(() => {
    const s = this.statusNovoSelecionado();
    return s === PropostaStatus.RECUSADA || s === PropostaStatus.CANCELADA;
  });

  readonly precisaDataAceite = computed(() => {
    return this.statusNovoSelecionado() === PropostaStatus.ACEITA;
  });

  readonly statusFormValido = computed(() => {
    if (!this.statusNovoSelecionado()) return false;
    if (this.precisaMotivo() && !this.statusMotivo().trim()) return false;
    if (this.precisaDataAceite() && !this.statusDataAceite()) return false;
    return true;
  });

  // ── Histórico de Status ───────────────────────────────
  readonly historicoStatusColumns: TableColumn[] = [
    { key: 'data', label: 'Data', width: '150px', align: 'center' },
    { key: 'statusAnterior', label: 'De', width: '140px', align: 'center' },
    { key: 'statusNovo', label: 'Para', width: '140px', align: 'center' },
    { key: 'responsavel', label: 'Responsável' },
    { key: 'motivo', label: 'Motivo' },
  ];

  readonly historicoStatusData = computed<Record<string, unknown>[]>(() => {
    const p = this.proposta();
    if (!p) return [];
    return p.historicoStatus.map((h) => ({ ...h } as unknown as Record<string, unknown>));
  });

  readonly analiseLabels = ANALISE_LABELS;

  readonly versoesColumns: TableColumn[] = [
    { key: 'versao', label: 'Versão', width: '80px', align: 'center' },
    { key: 'data', label: 'Data', width: '130px', align: 'center' },
    { key: 'responsavel', label: 'Responsável' },
    { key: 'status', label: 'Status', width: '140px', align: 'center' },
  ];

  readonly versoesData = computed<Record<string, unknown>[]>(() => {
    const p = this.proposta();
    if (!p) return [];
    return p.versoes.map((v) => ({ ...v } as unknown as Record<string, unknown>));
  });

  readonly analiseAprovada = computed(() => {
    const p = this.proposta();
    if (!p) return false;
    const ac = p.analiseCritica;
    return Object.values(ac).every((v) => v === 'sim' || v === 'na');
  });

  readonly temObservacoes = computed(() => {
    const p = this.proposta();
    if (!p) return false;
    return p.observacoesInternas.length > 0 || p.observacoesFinanceiras.length > 0;
  });

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.proposta.set(this.mockService.buscarPorId(id));
  }

  getStatusVariant(status: string): BadgeVariant {
    return STATUS_BADGE_MAP[status as PropostaStatus] ?? 'neutral';
  }

  getRespostaBadge(resposta: AnaliseCriticaResposta): { variant: BadgeVariant; text: string } {
    return RESPOSTA_BADGE[resposta];
  }

  voltar(): void {
    this.router.navigate(['/comercial/propostas']);
  }

  editar(): void {
    const p = this.proposta();
    if (!p) return;
    if (p.status === PropostaStatus.ACEITA) {
      this.toast.info('Proposta aceita não pode ser editada. Use "Criar Revisão".');
      return;
    }
    if (p.status === PropostaStatus.CANCELADA) {
      this.toast.info('Proposta cancelada não pode ser editada.');
      return;
    }
    this.router.navigate(['/comercial/propostas', p.id, 'editar']);
  }

  abrirRevisaoModal(): void {
    this.revisaoModalOpen.set(true);
  }

  fecharRevisaoModal(): void {
    this.revisaoModalOpen.set(false);
  }

  confirmarRevisao(): void {
    const p = this.proposta();
    if (!p) return;
    const nova = this.mockService.criarRevisao(p.id);
    if (!nova) {
      this.toast.error('Erro ao criar revisão.');
      this.fecharRevisaoModal();
      return;
    }
    this.toast.success(`Revisão v${nova.versao} criada com sucesso`);
    this.fecharRevisaoModal();
    this.router.navigate(['/comercial/propostas', nova.id, 'editar']);
  }

  // ── Alterar Status ──────────────────────────────────────
  abrirStatusModal(): void {
    this.statusNovoSelecionado.set('');
    this.statusMotivo.set('');
    this.statusDataAceite.set('');
    this.statusModalOpen.set(true);
  }

  fecharStatusModal(): void {
    this.statusModalOpen.set(false);
  }

  confirmarAlteracaoStatus(): void {
    const p = this.proposta();
    if (!p || !this.statusFormValido()) return;

    const novoStatus = this.statusNovoSelecionado() as PropostaStatus;
    const motivo = this.precisaMotivo() ? this.statusMotivo().trim() : undefined;
    const dataAceite = this.precisaDataAceite() ? this.parseDateBr(this.statusDataAceite()) : undefined;

    const sucesso = this.mockService.alterarStatus(p.id, novoStatus, motivo, dataAceite);
    if (!sucesso) {
      this.toast.error('Erro ao alterar status.');
      this.fecharStatusModal();
      return;
    }

    this.toast.success(`Status alterado para "${novoStatus}"`);
    this.fecharStatusModal();
    this.proposta.set(this.mockService.buscarPorId(p.id));
  }

  private parseDateBr(value: string): Date {
    const [d, m, y] = value.split('/');
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
}
