import { Injectable } from '@angular/core';
import {
  IProposta,
  IPropostaDetalhada,
  IAlteracaoStatus,
  IAnaliseCritica,
  AnaliseCriticaResposta,
  PropostaStatus,
  TRANSICOES_STATUS,
} from '../models/proposta.model';

const CLIENTES = [
  { nome: 'Usiminas S.A.', cnpj: '60.894.730/0001-05', fantasia: 'Usiminas', email: 'contato@usiminas.com.br', telefone: '(31) 3499-8000', unidade: 'Usina de Ipatinga' },
  { nome: 'Prefeitura Municipal de Betim', cnpj: '18.715.383/0001-40', fantasia: 'Pref. Betim', email: 'meioambiente@betim.mg.gov.br', telefone: '(31) 3539-4000', unidade: 'Sede Administrativa' },
  { nome: 'Construtora Barbosa Mello S.A.', cnpj: '17.199.928/0001-58', fantasia: 'Barbosa Mello', email: 'ambiental@barbosa-mello.com.br', telefone: '(31) 3298-7000', unidade: 'Sede BH' },
  { nome: 'Vallourec Tubos do Brasil S.A.', cnpj: '22.424.527/0001-10', fantasia: 'Vallourec', email: 'hse@vallourec.com', telefone: '(31) 3869-9000', unidade: 'Fábrica Belo Horizonte' },
  { nome: 'Hospital Lifecenter', cnpj: '04.138.881/0001-44', fantasia: 'Lifecenter', email: 'engenharia@lifecenter.com.br', telefone: '(31) 3269-9000', unidade: 'Unidade Santo Agostinho' },
  { nome: 'Arcelor Mittal Brasil S.A.', cnpj: '17.469.701/0001-77', fantasia: 'ArcelorMittal', email: 'ambiental@arcelormittal.com.br', telefone: '(31) 3219-1000', unidade: 'Usina Monlevade' },
  { nome: 'MRV Engenharia e Participações S.A.', cnpj: '08.343.492/0001-20', fantasia: 'MRV', email: 'ambiental@mrv.com.br', telefone: '(31) 3514-7000', unidade: 'Sede BH' },
  { nome: 'Prefeitura Municipal de Contagem', cnpj: '18.715.508/0001-31', fantasia: 'Pref. Contagem', email: 'meioambiente@contagem.mg.gov.br', telefone: '(31) 3352-5000', unidade: 'Sede' },
  { nome: 'COPASA - Cia de Saneamento de MG', cnpj: '17.281.106/0001-03', fantasia: 'COPASA', email: 'qualidade@copasa.com.br', telefone: '(31) 3250-1000', unidade: 'Sede Belo Horizonte' },
  { nome: 'CEMIG Geração e Transmissão S.A.', cnpj: '06.981.176/0001-58', fantasia: 'CEMIG', email: 'meioambiente@cemig.com.br', telefone: '(31) 3506-5000', unidade: 'Sede BH' },
  { nome: 'Gerdau Açominas S.A.', cnpj: '01.258.634/0001-41', fantasia: 'Gerdau', email: 'ambiental@gerdau.com.br', telefone: '(31) 3749-1000', unidade: 'Usina Ouro Branco' },
  { nome: 'Iveco Latin America Ltda', cnpj: '01.844.555/0001-63', fantasia: 'Iveco', email: 'ambiental@iveco.com', telefone: '(31) 3519-2000', unidade: 'Fábrica Sete Lagoas' },
  { nome: 'Holcim Brasil S.A.', cnpj: '62.258.884/0001-36', fantasia: 'Holcim', email: 'hse@holcim.com', telefone: '(31) 3299-5000', unidade: 'Fábrica Pedro Leopoldo' },
  { nome: 'Hospital Mater Dei', cnpj: '17.214.233/0001-00', fantasia: 'Mater Dei', email: 'engenharia@materdei.com.br', telefone: '(31) 3339-9000', unidade: 'Unidade Contorno' },
  { nome: 'Prefeitura Municipal de Nova Lima', cnpj: '18.715.599/0001-50', fantasia: 'Pref. Nova Lima', email: 'meioambiente@novalima.mg.gov.br', telefone: '(31) 3541-1800', unidade: 'Sede' },
];

const RESPONSAVEIS = ['Baroncio Cabral', 'Maria Julia', 'Tainá Fernandes', 'Vanusa Galdino'];

const CONDICOES = [
  'A VISTA - no momento da Coleta ou retirada do Relatório de Ensaio',
  'Faturado 15 dias',
  'Faturado 30 dias',
  'Faturado 45 dias',
];

const ANALISE_OPCOES: AnaliseCriticaResposta[] = ['sim', 'sim', 'sim', 'sim', 'nao', 'na'];

const STATUS_DISTRIBUICAO: PropostaStatus[] = [
  PropostaStatus.AGUARDANDO,
  PropostaStatus.AGUARDANDO,
  PropostaStatus.AGUARDANDO,
  PropostaStatus.AGUARDANDO,
  PropostaStatus.EM_ELABORACAO,
  PropostaStatus.EM_ELABORACAO,
  PropostaStatus.ACEITA,
  PropostaStatus.ACEITA,
  PropostaStatus.RECUSADA,
  PropostaStatus.CANCELADA,
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function gerarPropostas(): IProposta[] {
  const rng = seededRandom(42);
  const propostas: IProposta[] = [];

  for (let i = 1; i <= 50; i++) {
    const cliente = CLIENTES[Math.floor(rng() * CLIENTES.length)];
    const responsavel = RESPONSAVEIS[Math.floor(rng() * RESPONSAVEIS.length)];
    const status = STATUS_DISTRIBUICAO[Math.floor(rng() * STATUS_DISTRIBUICAO.length)];
    const dia = Math.floor(rng() * 26) + 1;
    const versao = rng() > 0.75 ? 1 : 0;
    const total = Math.round((rng() * 4977.5 + 22.5) * 100) / 100;
    const validadeDia = Math.min(dia + 30, 30);

    const dataCriacao = new Date(2026, 2, dia);
    const dataValidade = new Date(2026, 3, validadeDia);

    propostas.push({
      id: 1000 + i,
      status,
      responsavel,
      numeroProposta: `PROP-${String(2026).slice(2)}${String(3).padStart(2, '0')}-${String(i).padStart(4, '0')}`,
      versao,
      cliente: cliente.nome,
      cnpjCliente: cliente.cnpj,
      totalReais: total,
      dataCriacao,
      dataValidade,
      identificacao: `Análise ambiental - ${cliente.nome.split(' ')[0]}`,
    });
  }

  return propostas;
}

@Injectable({
  providedIn: 'root',
})
export class PropostaMockService {
  private readonly propostas: IProposta[] = gerarPropostas();
  private readonly historicoStatusMap = new Map<number, IAlteracaoStatus[]>();
  private readonly rng = seededRandom(99);
  private nextId = 1051;
  private nextSeq = 51;

  listar(): IProposta[] {
    return this.propostas;
  }

  atualizar(id: number, dados: Partial<IProposta>): boolean {
    const index = this.propostas.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.propostas[index] = { ...this.propostas[index], ...dados };
    return true;
  }

  buscarPorId(id: number): IPropostaDetalhada | undefined {
    const proposta = this.propostas.find((p) => p.id === id);
    if (!proposta) return undefined;

    const cliente = CLIENTES.find((c) => c.cnpj === proposta.cnpjCliente) ?? CLIENTES[0];
    const rng = seededRandom(id);

    const analise: IAnaliseCritica = {
      aspectoFinanceiro: ANALISE_OPCOES[Math.floor(rng() * ANALISE_OPCOES.length)],
      questoesLegais: ANALISE_OPCOES[Math.floor(rng() * ANALISE_OPCOES.length)],
      estruturaFisica: ANALISE_OPCOES[Math.floor(rng() * ANALISE_OPCOES.length)],
      subcontratacao: ANALISE_OPCOES[Math.floor(rng() * ANALISE_OPCOES.length)],
      artNecessaria: ANALISE_OPCOES[Math.floor(rng() * ANALISE_OPCOES.length)],
      conclusaoAtende: ANALISE_OPCOES[Math.floor(rng() * 4)] as AnaliseCriticaResposta, // mostly 'sim'
    };

    const condicao = CONDICOES[Math.floor(rng() * CONDICOES.length)];
    const emailDomain = cliente.email.split('@')[1];

    return {
      ...proposta,
      modeloProposta: 'Modelo Proposta Padrão',
      centroServicos: 'Lab Certificar',
      nomeFantasiaCliente: cliente.fantasia,
      emailCliente: cliente.email,
      telefoneCliente: cliente.telefone,
      unidadeCliente: cliente.unidade,
      solicitante: proposta.responsavel,
      envioPropostaPara: 'Cliente',
      cobrancaPara: 'Cliente',
      resultadoPara: 'Cliente',
      emailProposta: `contato@${emailDomain}`,
      emailCobranca: `financeiro@${emailDomain}`,
      emailResultado: `ambiental@${emailDomain}`,
      prazoLiberacaoDias: 15,
      cicloPagamento: condicao.startsWith('A VISTA') ? 'À vista' : 'Faturado',
      tipoContrato: 'Padrão',
      condicoesPagamento: condicao,
      cobrancaNa: 'Entrada da amostra',
      exibicaoPrecos: 'Valor total COM Outros custos',
      analiseCritica: analise,
      observacoesInternas: rng() > 0.5 ? 'Cliente com histórico de pontualidade. Priorizar atendimento.' : '',
      observacoesFinanceiras: rng() > 0.5 ? 'Verificar limite de crédito antes de faturar.' : '',
      versoes: [
        {
          versao: proposta.versao,
          data: proposta.dataCriacao,
          responsavel: proposta.responsavel,
          status: proposta.status,
        },
      ],
      historicoStatus: this.historicoStatusMap.get(id) ?? [],
      responsavelColeta: 'laboratorio',
      instrucoesColeta: [],
      amostras: [],
      anexos: [],
      valorTotal: proposta.totalReais,
      descontoGlobal: 0,
    };
  }

  gerarNumeroProposta(): string {
    const seq = this.nextSeq++;
    return `PROP-${String(2026).slice(2)}${String(3).padStart(2, '0')}-${String(seq).padStart(4, '0')}`;
  }

  criarRevisao(propostaId: number): IPropostaDetalhada | undefined {
    const original = this.buscarPorId(propostaId);
    if (!original) return undefined;

    const novaVersao = original.versao + 1;
    const novoId = this.nextId++;

    // Parse base number: "PROP-2603-0001" → keep base, change version
    const baseNumero = original.numeroProposta;

    const novaProposta: IProposta = {
      id: novoId,
      status: PropostaStatus.EM_ELABORACAO,
      responsavel: original.responsavel,
      numeroProposta: baseNumero,
      versao: novaVersao,
      cliente: original.cliente,
      cnpjCliente: original.cnpjCliente,
      totalReais: original.totalReais,
      dataCriacao: new Date(),
      dataValidade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      identificacao: original.identificacao,
    };

    this.propostas.unshift(novaProposta);

    const versoes = [
      ...original.versoes,
      {
        versao: novaVersao,
        data: novaProposta.dataCriacao,
        responsavel: novaProposta.responsavel,
        status: novaProposta.status,
      },
    ];

    return {
      ...this.buscarPorId(novoId)!,
      versoes,
    };
  }

  copiarProposta(propostaId: number, novoClienteCnpj?: string): IPropostaDetalhada | undefined {
    const original = this.buscarPorId(propostaId);
    if (!original) return undefined;

    const novoId = this.nextId++;
    const novoNumero = this.gerarNumeroProposta();

    // Resolve client
    let cliente = CLIENTES.find((c) => c.cnpj === original.cnpjCliente) ?? CLIENTES[0];
    if (novoClienteCnpj) {
      cliente = CLIENTES.find((c) => c.cnpj === novoClienteCnpj) ?? cliente;
    }

    const novaProposta: IProposta = {
      id: novoId,
      status: PropostaStatus.EM_ELABORACAO,
      responsavel: original.responsavel,
      numeroProposta: novoNumero,
      versao: 0,
      cliente: cliente.nome,
      cnpjCliente: cliente.cnpj,
      totalReais: original.totalReais,
      dataCriacao: new Date(),
      dataValidade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      identificacao: original.identificacao,
    };

    this.propostas.unshift(novaProposta);

    return this.buscarPorId(novoId);
  }

  alterarStatus(
    id: number,
    novoStatus: PropostaStatus,
    motivo?: string,
    dataAceite?: Date,
  ): boolean {
    const proposta = this.propostas.find((p) => p.id === id);
    if (!proposta) return false;

    const transicoesPermitidas = TRANSICOES_STATUS[proposta.status];
    if (!transicoesPermitidas.includes(novoStatus)) return false;

    const alteracao: IAlteracaoStatus = {
      data: new Date(),
      statusAnterior: proposta.status,
      statusNovo: novoStatus,
      responsavel: proposta.responsavel,
      motivo,
      dataAceite,
    };

    const historico = this.historicoStatusMap.get(id) ?? [];
    historico.push(alteracao);
    this.historicoStatusMap.set(id, historico);

    proposta.status = novoStatus;
    return true;
  }

  listarClientes(): { nome: string; cnpj: string }[] {
    return CLIENTES.map((c) => ({ nome: c.nome, cnpj: c.cnpj }));
  }
}
