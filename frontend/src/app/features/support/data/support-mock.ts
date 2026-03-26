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
  { value: 'perfil', label: 'Perfil' },
  { value: 'suporte', label: 'Suporte' },
  { value: 'outro', label: 'Outro / Não sei' },
];

export const MOCK_TICKETS: ITicket[] = [
  {
    id: '1',
    title: 'Tela de perfil não salva alterações',
    category: 'bug',
    priority: 'high',
    affectedModule: 'perfil',
    description: 'Ao editar meu telefone no perfil e clicar em salvar, a tela volta para o estado anterior e a alteração não permanece. Já tentei recarregar a página e o problema persiste.',
    attachments: [],
    status: 'open',
    createdAt: '2026-03-20T14:30:00',
    createdBy: 'Letícia Oliveira',
    browserInfo: 'Chrome 124 / Windows 11',
    screenResolution: '1920x1080',
  },
  {
    id: '2',
    title: 'Sugestão: filtro rápido para tickets recentes',
    category: 'improvement',
    priority: 'low',
    affectedModule: 'suporte',
    description: 'Seria útil ter um filtro de "últimos 7 dias" na listagem de tickets para encontrar solicitações recentes mais rápido.',
    attachments: [],
    status: 'resolved',
    createdAt: '2026-03-18T09:15:00',
    createdBy: 'Sirlene Sales',
    browserInfo: 'Chrome 124 / Windows 10',
    screenResolution: '1366x768',
  },
  {
    id: '3',
    title: 'Erro ao enviar anexo no ticket',
    category: 'bug',
    priority: 'critical',
    affectedModule: 'suporte',
    description: 'Ao tentar enviar um ticket com anexo em PDF, o upload falha e o formulário não envia. Testei com arquivos menores e o erro continua.',
    attachments: [],
    status: 'in_analysis',
    createdAt: '2026-03-19T16:45:00',
    createdBy: 'Camila Santos',
    browserInfo: 'Firefox 125 / Windows 11',
    screenResolution: '1920x1080',
  },
  {
    id: '4',
    title: 'Como alterar o e-mail de login?',
    category: 'question',
    priority: 'low',
    affectedModule: 'perfil',
    description: 'Quero atualizar o e-mail de acesso na minha conta. Existe alguma opção disponível na tela de perfil para isso?',
    attachments: [],
    status: 'closed',
    createdAt: '2026-03-15T11:00:00',
    createdBy: 'Fernanda Costa',
    browserInfo: 'Chrome 124 / Windows 10',
    screenResolution: '1366x768',
  },
];
