import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  ArrowRight,
  Eye,
  Pencil,
  Save,
  X,
  Plus,
  Trash2,
  FileText,
  Upload,
  ClipboardCheck,
  Package,
} from 'lucide-angular';

import { StepperComponent, IStepperStep } from '../../../../shared/components/stepper/stepper.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CardHeaderDirective } from '../../../../shared/components/card/card-header.directive';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { DatepickerComponent } from '../../../../shared/components/datepicker/datepicker.component';
import { SelectComponent, ISelectOption } from '../../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { BadgeComponent, BadgeVariant } from '../../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CheckboxComponent } from '../../../../shared/components/checkbox/checkbox.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ModalFooterDirective } from '../../../../shared/components/modal/modal-footer.directive';
import { ToastService } from '../../../../core/services/toast.service';
import { PropostaMockService } from '../services/proposta-mock.service';
import { PropostaStatus, IAmostraProposta, IAnexoProposta, IParametroProposta } from '../models/proposta.model';
import {
  CLIENTES_MOCK,
  SOLICITANTES_MOCK,
  MODELOS_PROPOSTA,
  CENTROS_SERVICO,
  ENVIO_OPCOES,
  CICLO_PAGAMENTO,
  TIPO_CONTRATO,
  CONDICOES_PAGAMENTO,
  COBRANCA_NA,
  IClienteMock,
  PARAMETROS_CATALOGO,
  IParametroCatalogo,
  PACOTES_SERVICO,
  LEGISLACOES,
  GRUPOS_ENSAIO,
  MATRIZES,
  TABELAS_PRECO,
  PRESERVACOES,
  RECIPIENTES,
  RESPONSAVEL_COLETA,
  INSTRUCOES_COLETA_OPCOES,
  ANEXOS_MOCK,
} from '../data/proposta-form.data';

type AnaliseCriticaResposta = 'sim' | 'nao' | 'na' | '';

interface IAnaliseCriticaPergunta {
  texto: string;
  resposta: AnaliseCriticaResposta;
}

const STATUS_BADGE_MAP: Record<PropostaStatus, BadgeVariant> = {
  [PropostaStatus.EM_ELABORACAO]: 'neutral',
  [PropostaStatus.AGUARDANDO]: 'warning',
  [PropostaStatus.ACEITA]: 'success',
  [PropostaStatus.RECUSADA]: 'danger',
  [PropostaStatus.CANCELADA]: 'neutral',
};

@Component({
  selector: 'app-proposta-form',
  standalone: true,
  imports: [
    LucideAngularModule,
    StepperComponent,
    CardComponent,
    CardHeaderDirective,
    InputComponent,
    DatepickerComponent,
    SelectComponent,
    TextareaComponent,
    BadgeComponent,
    ButtonComponent,
    CheckboxComponent,
    ModalComponent,
    ModalFooterDirective,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({
        ArrowLeft, ArrowRight, Eye, Pencil, Save, X,
        Plus, Trash2, FileText, Upload, ClipboardCheck, Package,
      }),
      multi: true,
    },
  ],
  templateUrl: './proposta-form.component.html',
  styleUrl: './proposta-form.component.scss',
})
export class PropostaFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly mockService = inject(PropostaMockService);

  // ── Mode ─────────────────────────────────────────────────
  readonly mode: 'criar' | 'editar';
  readonly propostaId: number | null;
  private initialSnapshot = '';

  // ── Status ───────────────────────────────────────────────
  readonly status = signal<PropostaStatus>(PropostaStatus.EM_ELABORACAO);

  readonly statusOptions: ISelectOption[] = Object.values(PropostaStatus).map((s) => ({
    value: s,
    label: s,
  }));

  readonly statusVariant = computed<BadgeVariant>(
    () => STATUS_BADGE_MAP[this.status()] ?? 'neutral',
  );

  // ── Editability rules ────────────────────────────────────
  readonly clienteDisabled = computed(() =>
    this.mode === 'editar' && this.status() === PropostaStatus.AGUARDANDO,
  );

  readonly solicitanteDisabled = computed(() =>
    this.mode === 'editar' && this.status() === PropostaStatus.AGUARDANDO,
  );

  // ── Dirty check ──────────────────────────────────────────
  readonly confirmModalOpen = signal(false);
  private pendingNavigation: string[] | null = null;

  readonly isDirty = computed(() => {
    if (this.mode === 'criar') return false;
    return this.getCurrentSnapshot() !== this.initialSnapshot;
  });

  // ── Stepper (4 steps active) ─────────────────────────────
  readonly steps: IStepperStep[] = [
    { label: 'Dados da Proposta' },
    { label: 'Anexos' },
    { label: 'Serviços' },
    { label: 'Revisão' },
  ];
  readonly currentStep = signal(0);

  // ── Select options ───────────────────────────────────────
  readonly modeloOptions = MODELOS_PROPOSTA;
  readonly centroOptions = CENTROS_SERVICO;
  readonly envioOptions = ENVIO_OPCOES;
  readonly cicloOptions = CICLO_PAGAMENTO;
  readonly tipoContratoOptions = TIPO_CONTRATO;
  readonly condicoesOptions = CONDICOES_PAGAMENTO;
  readonly cobrancaNaOptions = COBRANCA_NA;
  readonly legislacaoOptions = LEGISLACOES;
  readonly grupoOptions = GRUPOS_ENSAIO;
  readonly matrizOptions = MATRIZES;
  readonly tabelaPrecoOptions = TABELAS_PRECO;
  readonly preservacaoOptions = PRESERVACOES;
  readonly recipienteOptions = RECIPIENTES;
  readonly responsavelColetaOptions = RESPONSAVEL_COLETA;
  readonly instrucoesColetaOpcoes = INSTRUCOES_COLETA_OPCOES;

  readonly solicitanteOptions = computed<ISelectOption[]>(() =>
    SOLICITANTES_MOCK.map((s) => ({ value: s.id, label: `${s.nome} — ${s.empresa}` })),
  );

  readonly clienteOptions = computed<ISelectOption[]>(() =>
    CLIENTES_MOCK.map((c) => ({ value: c.id, label: c.nome })),
  );

  readonly tipoPessoaOptions: ISelectOption[] = [
    { value: 'pj', label: 'Pessoa Jurídica' },
    { value: 'pf', label: 'Pessoa Física' },
  ];

  // ── Step 1: Identificação ────────────────────────────────
  readonly numeroProposta = signal('00000760/2026.0');
  readonly modeloProposta = signal('padrao');
  readonly centroServico = signal('lab-certificar');

  // ── Step 1: Solicitante ──────────────────────────────────
  readonly solicitanteId = signal('');
  readonly envioPara = signal('cliente');
  readonly cobrancaPara = signal('cliente');
  readonly resultadoPara = signal('cliente');
  readonly emailProposta = signal('');
  readonly emailCobranca = signal('');
  readonly emailResultado = signal('');

  readonly solicitanteContatos = computed<ISelectOption[]>(() => {
    const sol = SOLICITANTES_MOCK.find((s) => s.id === this.solicitanteId());
    return sol?.contatos ?? [];
  });

  // ── Step 1: Cliente ──────────────────────────────────────
  readonly clienteNovo = signal(false);
  readonly clienteId = signal('');
  readonly clienteUnidade = signal('');
  readonly tipoPessoa = signal('pj');

  // Novo cliente PJ
  readonly novoRazaoSocial = signal('');
  readonly novoNomeFantasia = signal('');
  readonly novoCnpj = signal('');
  readonly novoEmailPj = signal('');
  readonly novoTelefonePj = signal('');

  // Novo cliente PF
  readonly novoNomePf = signal('');
  readonly novoCpf = signal('');
  readonly novoEmailPf = signal('');
  readonly novoTelefonePf = signal('');

  readonly clienteSelecionado = computed<IClienteMock | undefined>(() =>
    CLIENTES_MOCK.find((c) => c.id === this.clienteId()),
  );

  readonly unidadeOptions = computed<ISelectOption[]>(() =>
    this.clienteSelecionado()?.unidades ?? [],
  );

  readonly clienteContatos = computed<ISelectOption[]>(() =>
    this.clienteSelecionado()?.contatos ?? [],
  );

  // ── Step 1: Prazo e Pagamento ────────────────────────────
  readonly dataCriacao = signal(this.formatDate(new Date()));
  readonly dataValidade = signal(this.formatDate(this.addDays(new Date(), 30)));
  readonly cicloPagamento = signal('faturado');
  readonly tipoContrato = signal('padrao');
  readonly condicaoPagamento = signal('faturado-30');
  readonly cobrancaNa = signal('entrada-amostra');

  // ── Step 1: Observações ──────────────────────────────────
  readonly obsInternas = signal('');
  readonly obsFinanceiras = signal('');

  // ── Análise Crítica (now in modal) ───────────────────────
  readonly analiseCriticaModalOpen = signal(false);
  readonly analiseCritica = signal<IAnaliseCriticaPergunta[]>([
    { texto: 'O aspecto financeiro será atendido na proposta?', resposta: '' },
    { texto: 'As questões legais serão atendidas na proposta?', resposta: '' },
    { texto: 'A estrutura física atende a esta proposta?', resposta: '' },
    { texto: 'Se necessário, a subcontratação atenderá a proposta?', resposta: '' },
    { texto: 'ART é necessária?', resposta: '' },
    { texto: 'Em conclusão, o laboratório atende a esta proposta?', resposta: '' },
  ]);

  readonly analiseCriticaPreenchida = computed(() =>
    this.analiseCritica().every((p) => p.resposta !== ''),
  );

  // ── Step 2: Anexos ───────────────────────────────────────
  readonly anexos = signal<IAnexoProposta[]>([]);
  readonly anexoSelecionadoId = signal<string | null>(null);

  // ── Step 3: Serviços e Parâmetros ────────────────────────
  readonly responsavelColeta = signal('laboratorio');
  readonly instrucoesColeta = signal<string[]>([]);
  readonly amostras = signal<IAmostraProposta[]>([]);
  readonly descontoGlobal = signal(0);
  readonly amostraSelecionadaId = signal<string | null>(null);

  // Amostra modal
  readonly amostraModalOpen = signal(false);
  readonly amostraEditandoId = signal<string | null>(null);
  readonly amostraIdentificacao = signal('');
  readonly amostraMatriz = signal('');
  readonly amostraGrupo = signal('');
  readonly amostraLegislacao = signal('');
  readonly amostraPontoColeta = signal('');
  readonly amostraTabelaPreco = signal('padrao-2026');
  readonly amostraPreservacao = signal('');
  readonly amostraRecipiente = signal('');
  readonly amostraParametrosSelecionados = signal<string[]>([]);

  // Pacote modal
  readonly pacoteModalOpen = signal(false);

  // Parâmetros filtrados por grupo e matriz
  readonly parametrosFiltrados = computed<IParametroCatalogo[]>(() => {
    let params = PARAMETROS_CATALOGO;
    const grupo = this.amostraGrupo();
    const matriz = this.amostraMatriz();
    if (grupo) params = params.filter((p) => p.grupo === grupo);
    if (matriz) params = params.filter((p) => p.matriz === matriz);
    return params;
  });

  // Pacotes disponíveis
  readonly pacotesDisponiveis = PACOTES_SERVICO;

  // Totais
  readonly valorTotalAmostras = computed(() =>
    this.amostras().reduce((sum, a) => sum + a.subtotal, 0),
  );

  readonly valorComDesconto = computed(() => {
    const total = this.valorTotalAmostras();
    const desc = this.descontoGlobal();
    return total - (total * desc / 100);
  });

  // Amostra expandida (detail)
  readonly amostraExpandidaId = signal<string | null>(null);

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.propostaId = idParam ? Number(idParam) : null;
    this.mode = this.propostaId ? 'editar' : 'criar';

    if (this.mode === 'editar' && this.propostaId) {
      this.carregarProposta(this.propostaId);
    }
  }

  // ── Data loading ─────────────────────────────────────────
  private carregarProposta(id: number): void {
    const p = this.mockService.buscarPorId(id);
    if (!p) {
      this.toast.error('Proposta não encontrada.');
      this.router.navigate(['/comercial/propostas']);
      return;
    }

    if (p.status === PropostaStatus.ACEITA) {
      this.toast.info('Proposta aceita não pode ser editada. Use "Criar Revisão".');
      this.router.navigate(['/comercial/propostas', id]);
      return;
    }

    if (p.status === PropostaStatus.CANCELADA) {
      this.toast.info('Proposta cancelada não pode ser editada.');
      this.router.navigate(['/comercial/propostas', id]);
      return;
    }

    this.status.set(p.status);
    this.numeroProposta.set(p.numeroProposta);
    this.modeloProposta.set(p.modeloProposta === 'Modelo Proposta Padrão' ? 'padrao' : 'padrao');
    this.centroServico.set(p.centroServicos === 'Lab Certificar' ? 'lab-certificar' : 'lab-certificar');
    this.dataCriacao.set(this.formatDate(new Date(p.dataCriacao)));
    this.dataValidade.set(this.formatDate(new Date(p.dataValidade)));
    this.cicloPagamento.set(p.cicloPagamento === 'À vista' ? 'avista' : 'faturado');
    this.tipoContrato.set(p.tipoContrato === 'Padrão' ? 'padrao' : 'padrao');
    this.condicaoPagamento.set('faturado-30');
    this.cobrancaNa.set(p.cobrancaNa === 'Entrada da amostra' ? 'entrada-amostra' : 'entrada-amostra');
    this.obsInternas.set(p.observacoesInternas);
    this.obsFinanceiras.set(p.observacoesFinanceiras);

    // Map analise critica
    const acKeys: (keyof typeof p.analiseCritica)[] = [
      'aspectoFinanceiro', 'questoesLegais', 'estruturaFisica',
      'subcontratacao', 'artNecessaria', 'conclusaoAtende',
    ];
    this.analiseCritica.update((perguntas) =>
      perguntas.map((pergunta, i) => ({
        ...pergunta,
        resposta: p.analiseCritica[acKeys[i]] as AnaliseCriticaResposta,
      })),
    );

    // Try to find matching client in mock data
    const clienteMock = CLIENTES_MOCK.find((c) => c.cnpj === p.cnpjCliente);
    if (clienteMock) {
      this.clienteId.set(clienteMock.id);
      const unidade = clienteMock.unidades.find((u) => u.label === p.unidadeCliente);
      if (unidade) this.clienteUnidade.set(unidade.value);
    }

    // Try to find matching solicitante
    const solMock = SOLICITANTES_MOCK.find((s) => s.nome === p.solicitante);
    if (solMock) this.solicitanteId.set(solMock.id);

    // Load anexos (mock)
    this.anexos.set([...ANEXOS_MOCK]);

    // Load amostras if available
    if (p.amostras) this.amostras.set(p.amostras);
    if (p.responsavelColeta) this.responsavelColeta.set(p.responsavelColeta);
    if (p.instrucoesColeta) this.instrucoesColeta.set(p.instrucoesColeta);
    if (p.descontoGlobal) this.descontoGlobal.set(p.descontoGlobal);

    this.initialSnapshot = this.getCurrentSnapshot();
  }

  private getCurrentSnapshot(): string {
    return JSON.stringify({
      status: this.status(),
      modeloProposta: this.modeloProposta(),
      centroServico: this.centroServico(),
      solicitanteId: this.solicitanteId(),
      envioPara: this.envioPara(),
      cobrancaPara: this.cobrancaPara(),
      resultadoPara: this.resultadoPara(),
      emailProposta: this.emailProposta(),
      emailCobranca: this.emailCobranca(),
      emailResultado: this.emailResultado(),
      clienteId: this.clienteId(),
      clienteUnidade: this.clienteUnidade(),
      dataValidade: this.dataValidade(),
      cicloPagamento: this.cicloPagamento(),
      tipoContrato: this.tipoContrato(),
      condicaoPagamento: this.condicaoPagamento(),
      cobrancaNa: this.cobrancaNa(),
      obsInternas: this.obsInternas(),
      obsFinanceiras: this.obsFinanceiras(),
      analiseCritica: this.analiseCritica().map((p) => p.resposta),
      amostras: this.amostras(),
      anexos: this.anexos(),
    });
  }

  // ── Navigation ───────────────────────────────────────────
  goToStep(step: number): void {
    this.currentStep.set(step);
  }

  avancar(): void {
    this.currentStep.update((s) => Math.min(s + 1, 3));
  }

  voltar(): void {
    this.currentStep.update((s) => Math.max(s - 1, 0));
  }

  cancelar(): void {
    if (this.mode === 'editar' && this.isDirty()) {
      this.pendingNavigation = this.propostaId
        ? ['/comercial/propostas', String(this.propostaId)]
        : ['/comercial/propostas'];
      this.confirmModalOpen.set(true);
      return;
    }
    this.navigateBack();
  }

  voltarListagem(): void {
    if (this.mode === 'editar' && this.isDirty()) {
      this.pendingNavigation = ['/comercial/propostas'];
      this.confirmModalOpen.set(true);
      return;
    }
    this.router.navigate(['/comercial/propostas']);
  }

  visualizar(): void {
    if (!this.propostaId) return;
    if (this.isDirty()) {
      this.pendingNavigation = ['/comercial/propostas', String(this.propostaId)];
      this.confirmModalOpen.set(true);
      return;
    }
    this.router.navigate(['/comercial/propostas', this.propostaId]);
  }

  confirmarSaida(): void {
    this.confirmModalOpen.set(false);
    if (this.pendingNavigation) {
      this.router.navigate(this.pendingNavigation);
      this.pendingNavigation = null;
    }
  }

  cancelarSaida(): void {
    this.confirmModalOpen.set(false);
    this.pendingNavigation = null;
  }

  private navigateBack(): void {
    if (this.mode === 'editar' && this.propostaId) {
      this.router.navigate(['/comercial/propostas', this.propostaId]);
    } else {
      this.router.navigate(['/comercial/propostas']);
    }
  }

  salvar(finalizar = false): void {
    const perguntas = this.analiseCritica();
    const ultimaPergunta = perguntas[perguntas.length - 1];

    if (ultimaPergunta.resposta === 'nao') {
      this.toast.warning('A análise crítica indica que o laboratório não atende esta proposta.');
    }

    if (this.mode === 'editar' && this.propostaId) {
      this.mockService.atualizar(this.propostaId, {
        status: finalizar ? PropostaStatus.AGUARDANDO : this.status(),
        dataValidade: this.parseDateBr(this.dataValidade()),
      });
      this.toast.success(finalizar ? 'Proposta finalizada e enviada!' : 'Proposta atualizada com sucesso!');
      this.router.navigate(['/comercial/propostas', this.propostaId]);
    } else {
      this.toast.success(finalizar ? 'Proposta criada e enviada!' : 'Rascunho salvo com sucesso!');
      this.router.navigate(['/comercial/propostas']);
    }
  }

  // ── Análise Crítica helpers ──────────────────────────────
  abrirAnaliseCritica(): void {
    this.analiseCriticaModalOpen.set(true);
  }

  fecharAnaliseCritica(): void {
    this.analiseCriticaModalOpen.set(false);
  }

  setResposta(index: number, valor: AnaliseCriticaResposta): void {
    this.analiseCritica.update((perguntas) =>
      perguntas.map((p, i) => (i === index ? { ...p, resposta: valor } : p)),
    );
  }

  getResposta(index: number): AnaliseCriticaResposta {
    return this.analiseCritica()[index].resposta;
  }

  getStatusVariant(): BadgeVariant {
    return STATUS_BADGE_MAP[this.status()] ?? 'neutral';
  }

  // ── Step 2: Anexos helpers ───────────────────────────────
  adicionarAnexo(): void {
    const id = `a${Date.now()}`;
    const nomes = ['Documento técnico.pdf', 'Relatório ambiental.docx', 'Fotos do local.zip', 'Licença operação.pdf'];
    const tamanhos = ['1,2 MB', '856 KB', '4,7 MB', '2,1 MB'];
    const idx = this.anexos().length % nomes.length;
    this.anexos.update((list) => [
      ...list,
      {
        id,
        nome: nomes[idx],
        tamanho: tamanhos[idx],
        dataUpload: this.formatDate(new Date()),
        versao: 1,
      },
    ]);
    this.toast.success('Anexo adicionado com sucesso!');
  }

  removerAnexo(): void {
    const selId = this.anexoSelecionadoId();
    if (!selId) {
      this.toast.warning('Selecione um anexo para remover.');
      return;
    }
    this.anexos.update((list) => list.filter((a) => a.id !== selId));
    this.anexoSelecionadoId.set(null);
    this.toast.success('Anexo removido.');
  }

  selecionarAnexo(id: string): void {
    this.anexoSelecionadoId.set(this.anexoSelecionadoId() === id ? null : id);
  }

  // ── Step 3: Amostra CRUD ─────────────────────────────────
  abrirNovaAmostra(): void {
    this.amostraEditandoId.set(null);
    this.amostraIdentificacao.set('');
    this.amostraMatriz.set('');
    this.amostraGrupo.set('');
    this.amostraLegislacao.set('');
    this.amostraPontoColeta.set('');
    this.amostraTabelaPreco.set('padrao-2026');
    this.amostraPreservacao.set('');
    this.amostraRecipiente.set('');
    this.amostraParametrosSelecionados.set([]);
    this.amostraModalOpen.set(true);
  }

  abrirEditarAmostra(amostra: IAmostraProposta): void {
    this.amostraEditandoId.set(amostra.id);
    this.amostraIdentificacao.set(amostra.identificacao);
    this.amostraMatriz.set(amostra.matriz);
    this.amostraGrupo.set(amostra.grupo);
    this.amostraLegislacao.set(amostra.legislacao);
    this.amostraPontoColeta.set(amostra.pontoColeta);
    this.amostraTabelaPreco.set(amostra.tabelaPreco);
    this.amostraPreservacao.set(amostra.preservacao);
    this.amostraRecipiente.set(amostra.recipiente);
    this.amostraParametrosSelecionados.set(amostra.parametros.map((p) => p.id));
    this.amostraModalOpen.set(true);
  }

  salvarAmostra(): void {
    if (!this.amostraIdentificacao()) {
      this.toast.warning('Informe a identificação da amostra.');
      return;
    }

    const paramsSelecionados = this.amostraParametrosSelecionados();
    const parametros: IParametroProposta[] = PARAMETROS_CATALOGO
      .filter((p) => paramsSelecionados.includes(p.id))
      .map((p) => ({ id: p.id, nome: p.nome, lq: p.lq, unidade: p.unidade, preco: p.preco }));

    const subtotal = parametros.reduce((sum, p) => sum + p.preco, 0);

    const amostra: IAmostraProposta = {
      id: this.amostraEditandoId() ?? `am${Date.now()}`,
      identificacao: this.amostraIdentificacao(),
      matriz: this.amostraMatriz(),
      grupo: this.amostraGrupo(),
      legislacao: this.amostraLegislacao(),
      pontoColeta: this.amostraPontoColeta(),
      tabelaPreco: this.amostraTabelaPreco(),
      preservacao: this.amostraPreservacao(),
      recipiente: this.amostraRecipiente(),
      parametros,
      subtotal,
    };

    if (this.amostraEditandoId()) {
      this.amostras.update((list) =>
        list.map((a) => (a.id === amostra.id ? amostra : a)),
      );
      this.toast.success('Amostra atualizada!');
    } else {
      this.amostras.update((list) => [...list, amostra]);
      this.toast.success('Amostra adicionada!');
    }

    this.amostraModalOpen.set(false);
  }

  removerAmostra(): void {
    const selId = this.amostraSelecionadaId();
    if (!selId) {
      this.toast.warning('Selecione uma amostra para remover.');
      return;
    }
    this.amostras.update((list) => list.filter((a) => a.id !== selId));
    this.amostraSelecionadaId.set(null);
    if (this.amostraExpandidaId() === selId) this.amostraExpandidaId.set(null);
    this.toast.success('Amostra removida.');
  }

  selecionarAmostra(id: string): void {
    this.amostraSelecionadaId.set(this.amostraSelecionadaId() === id ? null : id);
  }

  toggleExpandirAmostra(id: string): void {
    this.amostraExpandidaId.set(this.amostraExpandidaId() === id ? null : id);
  }

  isParametroSelecionado(paramId: string): boolean {
    return this.amostraParametrosSelecionados().includes(paramId);
  }

  toggleParametro(paramId: string): void {
    this.amostraParametrosSelecionados.update((list) =>
      list.includes(paramId) ? list.filter((id) => id !== paramId) : [...list, paramId],
    );
  }

  // ── Pacotes ──────────────────────────────────────────────
  abrirPacotes(): void {
    this.pacoteModalOpen.set(true);
  }

  aplicarPacote(parametroIds: string[]): void {
    this.amostraParametrosSelecionados.update((current) => {
      const set = new Set([...current, ...parametroIds]);
      return [...set];
    });
    this.pacoteModalOpen.set(false);
    this.toast.success('Pacote aplicado!');
  }

  // ── Instrucoes coleta toggle ─────────────────────────────
  isInstrucaoSelecionada(value: string): boolean {
    return this.instrucoesColeta().includes(value);
  }

  toggleInstrucao(value: string): void {
    this.instrucoesColeta.update((list) =>
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  }

  // ── Helpers para labels ──────────────────────────────────
  getMatrizLabel(value: string): string {
    return MATRIZES.find((m) => m.value === value)?.label ?? value;
  }

  getLegislacaoLabel(value: string): string {
    return LEGISLACOES.find((l) => l.value === value)?.label ?? value;
  }

  getTabelaPrecoLabel(value: string): string {
    return TABELAS_PRECO.find((t) => t.value === value)?.label ?? value;
  }

  getResponsavelColetaLabel(value: string): string {
    return RESPONSAVEL_COLETA.find((r) => r.value === value)?.label ?? value;
  }

  getCondicaoPagamentoLabel(value: string): string {
    return this.condicoesOptions.find((c) => c.value === value)?.label ?? value;
  }

  // ── Utilities ────────────────────────────────────────────
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  private formatDate(date: Date): string {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  }

  private parseDateBr(value: string): Date {
    const [d, m, y] = value.split('/');
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
