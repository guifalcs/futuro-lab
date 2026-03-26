import { ISelectOption } from '../../../shared/components/select/select.component';

export interface ICollaborator {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  profile: 'collaborator' | 'manager';
  status: 'active' | 'inactive';
  presence: 'online' | 'offline' | 'away';
  createdAt: string;
}

export const MOCK_COLLABORATORS: ICollaborator[] = [
  { id: '1', name: 'Sirlene Sales', email: 'sirlene@statuscontabilidade.com.br', role: 'Gestora', department: 'Departamento Pessoal', profile: 'manager', status: 'active', presence: 'online', createdAt: '2024-01-15' },
  { id: '2', name: 'Letícia Oliveira', email: 'leticia@statuscontabilidade.com.br', role: 'Analista', department: 'Departamento Pessoal', profile: 'collaborator', status: 'active', presence: 'online', createdAt: '2024-02-20' },
  { id: '3', name: 'Fernanda Costa', email: 'fernanda@statuscontabilidade.com.br', role: 'Analista', department: 'Departamento Pessoal', profile: 'collaborator', status: 'active', presence: 'away', createdAt: '2024-03-10' },
  { id: '4', name: 'Ana Paula Silva', email: 'ana.paula@statuscontabilidade.com.br', role: 'Assistente', department: 'Departamento Pessoal', profile: 'collaborator', status: 'active', presence: 'online', createdAt: '2024-04-05' },
  { id: '5', name: 'Juliana Mendes', email: 'juliana@statuscontabilidade.com.br', role: 'Analista', department: 'Departamento Pessoal', profile: 'collaborator', status: 'active', presence: 'offline', createdAt: '2024-05-12' },
  { id: '6', name: 'Patrícia Ramos', email: 'patricia@statuscontabilidade.com.br', role: 'Assistente', department: 'Departamento Pessoal', profile: 'collaborator', status: 'active', presence: 'online', createdAt: '2024-06-18' },
  { id: '7', name: 'Camila Santos', email: 'camila@statuscontabilidade.com.br', role: 'Analista', department: 'Departamento Pessoal', profile: 'collaborator', status: 'active', presence: 'away', createdAt: '2024-07-22' },
  { id: '8', name: 'Mariana Alves', email: 'mariana@statuscontabilidade.com.br', role: 'Assistente', department: 'Departamento Pessoal', profile: 'collaborator', status: 'inactive', presence: 'offline', createdAt: '2024-08-30' },
  { id: '9', name: 'Beatriz Lima', email: 'beatriz@statuscontabilidade.com.br', role: 'Estagiária', department: 'Departamento Pessoal', profile: 'collaborator', status: 'active', presence: 'offline', createdAt: '2025-01-10' },
  { id: '10', name: 'Roberta Ferreira', email: 'roberta@statuscontabilidade.com.br', role: 'Analista', department: 'Departamento Pessoal', profile: 'collaborator', status: 'active', presence: 'online', createdAt: '2025-02-14' },
];

export const MOCK_DEPARTMENTS: ISelectOption[] = [
  { value: 'departamento-pessoal', label: 'Departamento Pessoal' },
];

export const MOCK_ROLES: ISelectOption[] = [
  { value: 'gestora', label: 'Gestora' },
  { value: 'analista', label: 'Analista' },
  { value: 'assistente', label: 'Assistente' },
  { value: 'estagiaria', label: 'Estagiária' },
];
