export interface IProposta {
  id: number;
  status: PropostaStatus;
  responsavel: string;
  numeroProposta: string;
  versao: number;
  cliente: string;
  cnpjCliente: string;
  totalReais: number;
  dataCriacao: Date;
  dataValidade: Date;
  identificacao: string;
}

export type AnaliseCriticaResposta = 'sim' | 'nao' | 'na';

export interface IAnaliseCritica {
  aspectoFinanceiro: AnaliseCriticaResposta;
  questoesLegais: AnaliseCriticaResposta;
  estruturaFisica: AnaliseCriticaResposta;
  subcontratacao: AnaliseCriticaResposta;
  artNecessaria: AnaliseCriticaResposta;
  conclusaoAtende: AnaliseCriticaResposta;
}

export interface IPropostaVersao {
  versao: number;
  data: Date;
  responsavel: string;
  status: PropostaStatus;
}

// ── Parâmetro de análise ─────────────────────────────────
export interface IParametroProposta {
  id: string;
  nome: string;
  lq: string;
  unidade: string;
  preco: number;
}

// ── Amostra (master) com parâmetros (detail) ─────────────
export interface IAmostraProposta {
  id: string;
  identificacao: string;
  matriz: string;
  grupo: string;
  legislacao: string;
  pontoColeta: string;
  tabelaPreco: string;
  preservacao: string;
  recipiente: string;
  parametros: IParametroProposta[];
  subtotal: number;
}

// ── Pacote pré-definido de parâmetros ────────────────────
export interface IPacoteServico {
  id: string;
  nome: string;
  descricao: string;
  parametroIds: string[];
}

// ── Anexo da proposta ────────────────────────────────────
export interface IAnexoProposta {
  id: string;
  nome: string;
  tamanho: string;
  dataUpload: string;
  versao: number;
}

export interface IPropostaDetalhada extends IProposta {
  modeloProposta: string;
  centroServicos: string;
  nomeFantasiaCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  unidadeCliente: string;
  solicitante: string;
  envioPropostaPara: string;
  cobrancaPara: string;
  resultadoPara: string;
  emailProposta: string;
  emailCobranca: string;
  emailResultado: string;
  prazoLiberacaoDias: number;
  cicloPagamento: string;
  tipoContrato: string;
  condicoesPagamento: string;
  cobrancaNa: string;
  exibicaoPrecos: string;
  analiseCritica: IAnaliseCritica;
  observacoesInternas: string;
  observacoesFinanceiras: string;
  versoes: IPropostaVersao[];
  historicoStatus: IAlteracaoStatus[];
  responsavelColeta: string;
  instrucoesColeta: string[];
  amostras: IAmostraProposta[];
  anexos: IAnexoProposta[];
  valorTotal: number;
  descontoGlobal: number;
}

export interface IAlteracaoStatus {
  data: Date;
  statusAnterior: PropostaStatus;
  statusNovo: PropostaStatus;
  responsavel: string;
  motivo?: string;
  dataAceite?: Date;
}

export enum PropostaStatus {
  EM_ELABORACAO = 'Em elaboração',
  AGUARDANDO = 'Aguardando',
  ACEITA = 'Aceita',
  RECUSADA = 'Recusada',
  CANCELADA = 'Cancelada',
}

export const TRANSICOES_STATUS: Record<PropostaStatus, PropostaStatus[]> = {
  [PropostaStatus.EM_ELABORACAO]: [PropostaStatus.AGUARDANDO, PropostaStatus.CANCELADA],
  [PropostaStatus.AGUARDANDO]: [PropostaStatus.ACEITA, PropostaStatus.RECUSADA, PropostaStatus.CANCELADA],
  [PropostaStatus.ACEITA]: [],
  [PropostaStatus.RECUSADA]: [PropostaStatus.EM_ELABORACAO, PropostaStatus.CANCELADA],
  [PropostaStatus.CANCELADA]: [],
};
