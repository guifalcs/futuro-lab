import { ISelectOption } from '../../../shared/components/select/select.component';

export interface ITicketAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
}

export interface ITicket {
  id: string;
  title: string;
  category: 'bug' | 'improvement' | 'question' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  affectedModule: string;
  description: string;
  attachments: ITicketAttachment[];
  status: 'open' | 'in_analysis' | 'resolved' | 'closed';
  createdAt: string;
  createdBy: string;
  browserInfo: string;
  screenResolution: string;
}

export const MOCK_CATEGORIES: ISelectOption[] = [
  { value: 'bug', label: 'Bug — Algo não está funcionando' },
  { value: 'improvement', label: 'Melhoria — Sugestão de melhoria' },
  { value: 'question', label: 'Dúvida — Preciso de ajuda' },
  { value: 'other', label: 'Outro' },
];

export const MOCK_PRIORITIES: ISelectOption[] = [
  { value: 'low', label: 'Baixa — Não impede o trabalho' },
  { value: 'medium', label: 'Média — Atrapalha mas tenho alternativa' },
  { value: 'high', label: 'Alta — Impede parte do meu trabalho' },
  { value: 'critical', label: 'Crítica — Não consigo trabalhar' },
];

export const MOCK_MODULES: ISelectOption[] = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'tarefas', label: 'Tarefas' },
  { value: 'clientes', label: 'Clientes' },
  { value: 'equipe', label: 'Equipe' },
  { value: 'perfil', label: 'Perfil' },
  { value: 'suporte', label: 'Suporte' },
  { value: 'outro', label: 'Outro / Não sei' },
];

export const MOCK_TICKETS: ITicket[] = [
  {
    id: '1',
    title: 'Tabela de tarefas não carrega ao filtrar por status',
    category: 'bug',
    priority: 'high',
    affectedModule: 'tarefas',
    description: 'Ao selecionar o filtro de status "Atrasada" na listagem de tarefas, a tabela fica em loading infinito e nunca exibe os resultados. Já tentei recarregar a página e o problema persiste. Acontece tanto no Chrome quanto no Edge.',
    attachments: [],
    status: 'open',
    createdAt: '2026-03-20T14:30:00',
    createdBy: 'Letícia Oliveira',
    browserInfo: 'Chrome 124 / Windows 11',
    screenResolution: '1920x1080',
  },
  {
    id: '2',
    title: 'Sugestão: adicionar atalho de teclado para criar tarefa',
    category: 'improvement',
    priority: 'low',
    affectedModule: 'tarefas',
    description: 'Seria muito útil ter um atalho de teclado (tipo Ctrl+N) para abrir o formulário de nova tarefa direto, sem precisar clicar no botão. Usamos muito essa funcionalidade e economizaria tempo.',
    attachments: [],
    status: 'resolved',
    createdAt: '2026-03-18T09:15:00',
    createdBy: 'Sirlene Sales',
    browserInfo: 'Chrome 124 / Windows 10',
    screenResolution: '1366x768',
  },
  {
    id: '3',
    title: 'Erro ao salvar edição de cliente',
    category: 'bug',
    priority: 'critical',
    affectedModule: 'clientes',
    description: 'Ao tentar salvar alterações no cadastro do cliente "Construtora Horizonte", aparece um erro na tela e as alterações são perdidas. Já tentei 3 vezes. Preciso atualizar o endereço desse cliente com urgência pois mudaram de local.',
    attachments: [],
    status: 'in_analysis',
    createdAt: '2026-03-19T16:45:00',
    createdBy: 'Camila Santos',
    browserInfo: 'Firefox 125 / Windows 11',
    screenResolution: '1920x1080',
  },
  {
    id: '4',
    title: 'Como exportar a lista de clientes?',
    category: 'question',
    priority: 'low',
    affectedModule: 'clientes',
    description: 'Preciso exportar a lista de todos os clientes para uma planilha Excel. Não encontrei essa opção em lugar nenhum. Existe essa funcionalidade? Se não, seria possível adicionar?',
    attachments: [],
    status: 'closed',
    createdAt: '2026-03-15T11:00:00',
    createdBy: 'Fernanda Costa',
    browserInfo: 'Chrome 124 / Windows 10',
    screenResolution: '1366x768',
  },
];
