import { ISelectOption } from '../../../../shared/components/select/select.component';
import { IParametroProposta, IPacoteServico, IAnexoProposta } from '../models/proposta.model';

export interface IClienteMock {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  unidades: ISelectOption[];
  contatos: ISelectOption[];
}

export interface ISolicitanteMock {
  id: string;
  nome: string;
  empresa: string;
  contatos: ISelectOption[];
}

export const CLIENTES_MOCK: IClienteMock[] = [
  {
    id: 'c1', nome: 'Usiminas S.A.', cnpj: '60.894.730/0001-05',
    email: 'contato@usiminas.com.br', telefone: '(31) 3499-8000',
    unidades: [
      { value: 'u1', label: 'Usina de Ipatinga' },
      { value: 'u2', label: 'Usina de Cubatão' },
    ],
    contatos: [
      { value: 'roberto.alves@usiminas.com.br', label: 'roberto.alves@usiminas.com.br' },
      { value: 'meio.ambiente@usiminas.com.br', label: 'meio.ambiente@usiminas.com.br' },
      { value: 'financeiro@usiminas.com.br', label: 'financeiro@usiminas.com.br' },
    ],
  },
  {
    id: 'c2', nome: 'Prefeitura Municipal de Betim', cnpj: '18.715.383/0001-40',
    email: 'contato@betim.mg.gov.br', telefone: '(31) 3539-4000',
    unidades: [
      { value: 'u3', label: 'Sede Administrativa' },
    ],
    contatos: [
      { value: 'meioambiente@betim.mg.gov.br', label: 'meioambiente@betim.mg.gov.br' },
      { value: 'compras@betim.mg.gov.br', label: 'compras@betim.mg.gov.br' },
    ],
  },
  {
    id: 'c3', nome: 'Construtora Barbosa Mello S.A.', cnpj: '17.199.928/0001-58',
    email: 'contato@barbosa-mello.com.br', telefone: '(31) 3298-7000',
    unidades: [
      { value: 'u4', label: 'Sede BH' },
      { value: 'u5', label: 'Canteiro BR-381' },
    ],
    contatos: [
      { value: 'ambiental@barbosa-mello.com.br', label: 'ambiental@barbosa-mello.com.br' },
      { value: 'financeiro@barbosa-mello.com.br', label: 'financeiro@barbosa-mello.com.br' },
      { value: 'lucas.pereira@barbosa-mello.com.br', label: 'lucas.pereira@barbosa-mello.com.br' },
    ],
  },
  {
    id: 'c4', nome: 'Vallourec Tubos do Brasil S.A.', cnpj: '22.424.527/0001-10',
    email: 'contato@vallourec.com', telefone: '(31) 3869-9000',
    unidades: [
      { value: 'u6', label: 'Fábrica Belo Horizonte' },
      { value: 'u7', label: 'Fábrica Jeceaba' },
    ],
    contatos: [
      { value: 'hse@vallourec.com', label: 'hse@vallourec.com' },
      { value: 'compras@vallourec.com', label: 'compras@vallourec.com' },
    ],
  },
  {
    id: 'c5', nome: 'Hospital Lifecenter', cnpj: '04.138.881/0001-44',
    email: 'contato@lifecenter.com.br', telefone: '(31) 3269-9000',
    unidades: [
      { value: 'u8', label: 'Unidade Santo Agostinho' },
    ],
    contatos: [
      { value: 'engenharia@lifecenter.com.br', label: 'engenharia@lifecenter.com.br' },
      { value: 'financeiro@lifecenter.com.br', label: 'financeiro@lifecenter.com.br' },
    ],
  },
  {
    id: 'c6', nome: 'COPASA - Cia de Saneamento de MG', cnpj: '17.281.106/0001-03',
    email: 'contato@copasa.com.br', telefone: '(31) 3250-1000',
    unidades: [
      { value: 'u9', label: 'Sede Belo Horizonte' },
      { value: 'u10', label: 'Regional Norte' },
      { value: 'u11', label: 'Regional Sul' },
    ],
    contatos: [
      { value: 'qualidade@copasa.com.br', label: 'qualidade@copasa.com.br' },
      { value: 'contratos@copasa.com.br', label: 'contratos@copasa.com.br' },
      { value: 'ana.costa@copasa.com.br', label: 'ana.costa@copasa.com.br' },
    ],
  },
  {
    id: 'c7', nome: 'MRV Engenharia e Participações S.A.', cnpj: '08.343.492/0001-20',
    email: 'contato@mrv.com.br', telefone: '(31) 3514-7000',
    unidades: [
      { value: 'u12', label: 'Sede BH' },
      { value: 'u13', label: 'Canteiro Obras Contagem' },
    ],
    contatos: [
      { value: 'ambiental@mrv.com.br', label: 'ambiental@mrv.com.br' },
      { value: 'juridico@mrv.com.br', label: 'juridico@mrv.com.br' },
    ],
  },
  {
    id: 'c8', nome: 'CEMIG Geração e Transmissão S.A.', cnpj: '06.981.176/0001-58',
    email: 'contato@cemig.com.br', telefone: '(31) 3506-5000',
    unidades: [
      { value: 'u14', label: 'Sede BH' },
      { value: 'u15', label: 'UHE Três Marias' },
    ],
    contatos: [
      { value: 'meioambiente@cemig.com.br', label: 'meioambiente@cemig.com.br' },
      { value: 'compras@cemig.com.br', label: 'compras@cemig.com.br' },
      { value: 'carlos.oliveira@cemig.com.br', label: 'carlos.oliveira@cemig.com.br' },
    ],
  },
  {
    id: 'c9', nome: 'Gerdau Açominas S.A.', cnpj: '01.258.634/0001-41',
    email: 'contato@gerdau.com.br', telefone: '(31) 3749-1000',
    unidades: [
      { value: 'u16', label: 'Usina Ouro Branco' },
    ],
    contatos: [
      { value: 'ambiental@gerdau.com.br', label: 'ambiental@gerdau.com.br' },
      { value: 'suprimentos@gerdau.com.br', label: 'suprimentos@gerdau.com.br' },
    ],
  },
  {
    id: 'c10', nome: 'Holcim Brasil S.A.', cnpj: '62.258.884/0001-36',
    email: 'contato@holcim.com', telefone: '(31) 3299-5000',
    unidades: [
      { value: 'u17', label: 'Fábrica Pedro Leopoldo' },
      { value: 'u18', label: 'Fábrica Barroso' },
    ],
    contatos: [
      { value: 'hse@holcim.com', label: 'hse@holcim.com' },
      { value: 'compras@holcim.com', label: 'compras@holcim.com' },
      { value: 'renata.silva@holcim.com', label: 'renata.silva@holcim.com' },
    ],
  },
];

export const SOLICITANTES_MOCK: ISolicitanteMock[] = [
  {
    id: 's1', nome: 'Baroncio Cabral', empresa: 'Lab Certificar',
    contatos: [
      { value: 'baroncio@labcertificar.com.br', label: 'baroncio@labcertificar.com.br' },
    ],
  },
  {
    id: 's2', nome: 'Maria Julia Alvarenga', empresa: 'Ambiental Consultoria',
    contatos: [
      { value: 'maria.julia@ambientalconsultoria.com.br', label: 'maria.julia@ambientalconsultoria.com.br' },
    ],
  },
  {
    id: 's3', nome: 'Tainá Fernandes', empresa: 'EcoLab Serviços Ambientais',
    contatos: [
      { value: 'taina@ecolab.com.br', label: 'taina@ecolab.com.br' },
    ],
  },
  {
    id: 's4', nome: 'Vanusa Galdino', empresa: 'Lab Certificar',
    contatos: [
      { value: 'vanusa@labcertificar.com.br', label: 'vanusa@labcertificar.com.br' },
    ],
  },
  {
    id: 's5', nome: 'Ricardo Mendes', empresa: 'GreenTech Ambiental',
    contatos: [
      { value: 'ricardo@greentech.com.br', label: 'ricardo@greentech.com.br' },
    ],
  },
];

export const MODELOS_PROPOSTA: ISelectOption[] = [
  { value: 'padrao', label: 'Modelo Proposta Padrão' },
  { value: 'simplificado', label: 'Modelo Simplificado' },
  { value: 'detalhado', label: 'Modelo Detalhado' },
];

export const CENTROS_SERVICO: ISelectOption[] = [
  { value: 'lab-certificar', label: 'Lab Certificar' },
  { value: 'lab-parceiro-1', label: 'Lab Parceiro — Águas' },
];

export const ENVIO_OPCOES: ISelectOption[] = [
  { value: 'cliente', label: 'Cliente' },
  { value: 'solicitante', label: 'Solicitante' },
];

export const CICLO_PAGAMENTO: ISelectOption[] = [
  { value: 'faturado', label: 'Faturado' },
  { value: 'a-vista', label: 'À vista' },
];

export const TIPO_CONTRATO: ISelectOption[] = [
  { value: 'padrao', label: 'Padrão' },
  { value: 'mensal', label: 'Mensal' },
];

export const CONDICOES_PAGAMENTO: ISelectOption[] = [
  { value: 'a-vista', label: 'A VISTA - no momento da Coleta ou retirada do Relatório de Ensaio' },
  { value: 'faturado-15', label: 'Faturado 15 dias' },
  { value: 'faturado-30', label: 'Faturado 30 dias' },
  { value: 'faturado-45', label: 'Faturado 45 dias' },
  { value: 'faturado-60', label: 'Faturado 60 dias' },
];

export const COBRANCA_NA: ISelectOption[] = [
  { value: 'entrada-amostra', label: 'Entrada da amostra' },
  { value: 'emissao-laudo', label: 'Emissão do laudo' },
];

// ── Catálogo de parâmetros de análise ───────────────────
export interface IParametroCatalogo {
  id: string;
  nome: string;
  lq: string;
  unidade: string;
  preco: number;
  grupo: string;
  matriz: string;
}

export const PARAMETROS_CATALOGO: IParametroCatalogo[] = [
  { id: 'p1', nome: 'pH', lq: '-', unidade: '-', preco: 15, grupo: 'fisico-quimico', matriz: 'agua' },
  { id: 'p2', nome: 'Turbidez', lq: '0,1', unidade: 'NTU', preco: 18, grupo: 'fisico-quimico', matriz: 'agua' },
  { id: 'p3', nome: 'Cor Aparente', lq: '1', unidade: 'uH', preco: 18, grupo: 'fisico-quimico', matriz: 'agua' },
  { id: 'p4', nome: 'Condutividade', lq: '1', unidade: 'µS/cm', preco: 20, grupo: 'fisico-quimico', matriz: 'agua' },
  { id: 'p5', nome: 'Cloro Residual Livre', lq: '0,05', unidade: 'mg/L', preco: 22, grupo: 'fisico-quimico', matriz: 'agua' },
  { id: 'p6', nome: 'Coliformes Totais', lq: '1', unidade: 'UFC/100mL', preco: 35, grupo: 'microbiologico', matriz: 'agua' },
  { id: 'p7', nome: 'Escherichia coli', lq: '1', unidade: 'UFC/100mL', preco: 35, grupo: 'microbiologico', matriz: 'agua' },
  { id: 'p8', nome: 'Ferro Total', lq: '0,05', unidade: 'mg/L', preco: 45, grupo: 'metais', matriz: 'agua' },
  { id: 'p9', nome: 'Manganês', lq: '0,01', unidade: 'mg/L', preco: 45, grupo: 'metais', matriz: 'agua' },
  { id: 'p10', nome: 'DBO', lq: '2', unidade: 'mg/L O₂', preco: 55, grupo: 'organico', matriz: 'agua' },
  { id: 'p11', nome: 'DQO', lq: '5', unidade: 'mg/L O₂', preco: 55, grupo: 'organico', matriz: 'agua' },
  { id: 'p12', nome: 'Óleos e Graxas', lq: '5', unidade: 'mg/L', preco: 65, grupo: 'organico', matriz: 'agua' },
  { id: 'p13', nome: 'Sólidos Totais', lq: '1', unidade: 'mg/L', preco: 30, grupo: 'fisico-quimico', matriz: 'agua' },
  { id: 'p14', nome: 'Nitrogênio Total', lq: '0,5', unidade: 'mg/L', preco: 50, grupo: 'quimico', matriz: 'agua' },
  { id: 'p15', nome: 'Fósforo Total', lq: '0,01', unidade: 'mg/L', preco: 50, grupo: 'quimico', matriz: 'agua' },
];

// ── Pacotes de serviço ──────────────────────────────────
export const PACOTES_SERVICO: IPacoteServico[] = [
  {
    id: 'pkg1',
    nome: 'Potabilidade Básica',
    descricao: 'Parâmetros mínimos para análise de potabilidade',
    parametroIds: ['p1', 'p2', 'p3', 'p5', 'p6', 'p7'],
  },
  {
    id: 'pkg2',
    nome: 'Potabilidade Completa',
    descricao: 'Análise completa de potabilidade conforme Portaria GM/MS nº 888',
    parametroIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p13'],
  },
  {
    id: 'pkg3',
    nome: 'Efluentes CONAMA 430',
    descricao: 'Parâmetros para lançamento de efluentes conforme CONAMA 430/2011',
    parametroIds: ['p1', 'p10', 'p11', 'p12', 'p14', 'p15'],
  },
];

// ── Legislações ─────────────────────────────────────────
export const LEGISLACOES: ISelectOption[] = [
  { value: 'portaria-888', label: 'Portaria GM/MS nº 888/2021 — Potabilidade' },
  { value: 'conama-357', label: 'CONAMA 357/2005 — Águas superficiais' },
  { value: 'conama-430', label: 'CONAMA 430/2011 — Lançamento de efluentes' },
  { value: 'copam-01', label: 'DN COPAM/CERH nº 01/2008 — Minas Gerais' },
];

// ── Grupos de ensaio ────────────────────────────────────
export const GRUPOS_ENSAIO: ISelectOption[] = [
  { value: 'fisico-quimico', label: 'Físico-Químico' },
  { value: 'microbiologico', label: 'Microbiológico' },
  { value: 'metais', label: 'Metais' },
  { value: 'organico', label: 'Orgânicos' },
  { value: 'quimico', label: 'Químico' },
];

// ── Matrizes ────────────────────────────────────────────
export const MATRIZES: ISelectOption[] = [
  { value: 'agua', label: 'Água' },
  { value: 'solo', label: 'Solo' },
  { value: 'ar', label: 'Ar' },
  { value: 'efluente', label: 'Efluente' },
  { value: 'residuo', label: 'Resíduo' },
];

// ── Tabelas de preço ────────────────────────────────────
export const TABELAS_PRECO: ISelectOption[] = [
  { value: 'padrao-2026', label: 'Padrão 2026' },
  { value: 'prefeituras', label: 'Prefeituras' },
  { value: 'grandes-contas', label: 'Grandes Contas' },
];

// ── Preservação ─────────────────────────────────────────
export const PRESERVACOES: ISelectOption[] = [
  { value: 'refrigeracao', label: 'Refrigeração (2–8 °C)' },
  { value: 'h2so4', label: 'H₂SO₄ pH < 2' },
  { value: 'hno3', label: 'HNO₃ pH < 2' },
  { value: 'naoh', label: 'NaOH pH > 12' },
  { value: 'nenhuma', label: 'Nenhuma' },
];

// ── Recipientes ─────────────────────────────────────────
export const RECIPIENTES: ISelectOption[] = [
  { value: 'pet-1l', label: 'PET 1L' },
  { value: 'vidro-1l', label: 'Vidro Âmbar 1L' },
  { value: 'vidro-500ml', label: 'Vidro 500mL' },
  { value: 'bag-sterile', label: 'Bag Estéril 100mL' },
  { value: 'frasco-polietileno', label: 'Frasco Polietileno 500mL' },
];

// ── Responsável pela coleta ─────────────────────────────
export const RESPONSAVEL_COLETA: ISelectOption[] = [
  { value: 'laboratorio', label: 'Laboratório' },
  { value: 'cliente', label: 'Cliente' },
  { value: 'terceiro', label: 'Terceiro' },
];

// ── Instruções de coleta ────────────────────────────────
export const INSTRUCOES_COLETA_OPCOES: { value: string; label: string }[] = [
  { value: 'enviar-recipientes', label: 'Enviar recipientes ao cliente' },
  { value: 'etiquetas-identificacao', label: 'Preparar etiquetas de identificação' },
  { value: 'cadeia-custodia', label: 'Incluir cadeia de custódia' },
  { value: 'transporte-refrigerado', label: 'Transporte refrigerado' },
  { value: 'coleta-campo', label: 'Coleta em campo pelo laboratório' },
];

// ── Mock de anexos para modo de edição ──────────────────
export const ANEXOS_MOCK: IAnexoProposta[] = [
  { id: 'a1', nome: 'Mapa de pontos de coleta.pdf', tamanho: '2,4 MB', dataUpload: '15/01/2026', versao: 1 },
  { id: 'a2', nome: 'Licença ambiental.pdf', tamanho: '1,1 MB', dataUpload: '15/01/2026', versao: 1 },
  { id: 'a3', nome: 'Planilha de campo.xlsx', tamanho: '340 KB', dataUpload: '16/01/2026', versao: 2 },
];
