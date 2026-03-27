import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { NAV_MODULES } from '../../core/config/navigation.config';

const placeholder = () =>
  import('../../features/placeholder-page/placeholder-page.component').then(
    (m) => m.PlaceholderPageComponent,
  );

function sidebarData(moduleRoute: string): { sidebarItems: typeof NAV_MODULES[number]['sidebarItems'] } {
  const mod = NAV_MODULES.find((m) => m.route === moduleRoute);
  return { sidebarItems: mod?.sidebarItems ?? [] };
}

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // ── Default → Dashboard ─────────────────────────────────
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      // ── Dashboard ───────────────────────────────────────────
      {
        path: 'dashboard',
        loadComponent: placeholder,
        data: { title: 'Dashboard' },
      },

      // ── Cadastros ───────────────────────────────────────────
      {
        path: 'cadastros',
        redirectTo: 'cadastros/clientes',
        pathMatch: 'full',
      },
      {
        path: 'cadastros/clientes',
        loadComponent: placeholder,
        data: { title: 'Clientes', ...sidebarData('/cadastros') },
      },
      {
        path: 'cadastros/solicitantes',
        loadComponent: placeholder,
        data: { title: 'Solicitantes', ...sidebarData('/cadastros') },
      },
      {
        path: 'cadastros/fornecedores',
        loadComponent: placeholder,
        data: { title: 'Fornecedores', ...sidebarData('/cadastros') },
      },
      {
        path: 'cadastros/laboratorios-parceiros',
        loadComponent: placeholder,
        data: { title: 'Laboratórios Parceiros', ...sidebarData('/cadastros') },
      },
      {
        path: 'cadastros/pontos-coleta',
        loadComponent: placeholder,
        data: { title: 'Pontos de Coleta', ...sidebarData('/cadastros') },
      },
      {
        path: 'cadastros/funcionarios',
        loadComponent: placeholder,
        data: { title: 'Funcionários', ...sidebarData('/cadastros') },
      },

      // ── Comercial ───────────────────────────────────────────
      {
        path: 'comercial',
        redirectTo: 'comercial/propostas',
        pathMatch: 'full',
      },
      {
        path: 'comercial/propostas',
        loadComponent: () =>
          import('../../features/comercial/propostas/propostas-list/propostas-list.component').then(
            (m) => m.PropostasListComponent,
          ),
        data: { title: 'Propostas', ...sidebarData('/comercial') },
      },
      {
        path: 'comercial/propostas/nova',
        loadComponent: () =>
          import('../../features/comercial/propostas/proposta-form/proposta-form.component').then(
            (m) => m.PropostaFormComponent,
          ),
        data: { title: 'Nova Proposta', ...sidebarData('/comercial') },
      },
      {
        path: 'comercial/propostas/:id',
        loadComponent: () =>
          import('../../features/comercial/propostas/proposta-view/proposta-view.component').then(
            (m) => m.PropostaViewComponent,
          ),
        data: { title: 'Visualizar Proposta', ...sidebarData('/comercial') },
      },
      {
        path: 'comercial/propostas/:id/editar',
        loadComponent: () =>
          import('../../features/comercial/propostas/proposta-form/proposta-form.component').then(
            (m) => m.PropostaFormComponent,
          ),
        data: { title: 'Editar Proposta', ...sidebarData('/comercial') },
      },
      {
        path: 'comercial/contratos',
        loadComponent: placeholder,
        data: { title: 'Contratos', ...sidebarData('/comercial') },
      },

      // ── Operacional ─────────────────────────────────────────
      {
        path: 'operacional',
        redirectTo: 'operacional/ordens-servico',
        pathMatch: 'full',
      },
      {
        path: 'operacional/ordens-servico',
        loadComponent: placeholder,
        data: { title: 'Ordens de Serviço', ...sidebarData('/operacional') },
      },
      {
        path: 'operacional/coletas',
        loadComponent: placeholder,
        data: { title: 'Coletas', ...sidebarData('/operacional') },
      },
      {
        path: 'operacional/recepcao-amostras',
        loadComponent: placeholder,
        data: { title: 'Recepção de Amostras', ...sidebarData('/operacional') },
      },
      {
        path: 'operacional/laboratorio',
        loadComponent: placeholder,
        data: { title: 'Laboratório', ...sidebarData('/operacional') },
      },

      // ── Resultados ──────────────────────────────────────────
      {
        path: 'resultados',
        redirectTo: 'resultados/revisao',
        pathMatch: 'full',
      },
      {
        path: 'resultados/revisao',
        loadComponent: placeholder,
        data: { title: 'Revisão', ...sidebarData('/resultados') },
      },
      {
        path: 'resultados/relatorios',
        loadComponent: placeholder,
        data: { title: 'Relatórios / Laudos', ...sidebarData('/resultados') },
      },

      // ── Financeiro ──────────────────────────────────────────
      {
        path: 'financeiro',
        redirectTo: 'financeiro/faturamento',
        pathMatch: 'full',
      },
      {
        path: 'financeiro/faturamento',
        loadComponent: placeholder,
        data: { title: 'Faturamento', ...sidebarData('/financeiro') },
      },
      {
        path: 'financeiro/contas-receber',
        loadComponent: placeholder,
        data: { title: 'Contas a Receber', ...sidebarData('/financeiro') },
      },
      {
        path: 'financeiro/contas-pagar',
        loadComponent: placeholder,
        data: { title: 'Contas a Pagar', ...sidebarData('/financeiro') },
      },

      // ── Qualidade ───────────────────────────────────────────
      {
        path: 'qualidade',
        redirectTo: 'qualidade/nao-conformidades',
        pathMatch: 'full',
      },
      {
        path: 'qualidade/nao-conformidades',
        loadComponent: placeholder,
        data: { title: 'Não Conformidades', ...sidebarData('/qualidade') },
      },
      {
        path: 'qualidade/controle-qualidade',
        loadComponent: placeholder,
        data: { title: 'Controle de Qualidade', ...sidebarData('/qualidade') },
      },
      {
        path: 'qualidade/equipamentos',
        loadComponent: placeholder,
        data: { title: 'Equipamentos', ...sidebarData('/qualidade') },
      },

      // ── Configurações ───────────────────────────────────────
      {
        path: 'configuracoes',
        redirectTo: 'configuracoes/parametros',
        pathMatch: 'full',
      },
      {
        path: 'configuracoes/parametros',
        loadComponent: placeholder,
        data: { title: 'Parâmetros', ...sidebarData('/configuracoes') },
      },
      {
        path: 'configuracoes/metodos',
        loadComponent: placeholder,
        data: { title: 'Métodos', ...sidebarData('/configuracoes') },
      },
      {
        path: 'configuracoes/legislacoes',
        loadComponent: placeholder,
        data: { title: 'Legislações', ...sidebarData('/configuracoes') },
      },
      {
        path: 'configuracoes/matrizes',
        loadComponent: placeholder,
        data: { title: 'Matrizes', ...sidebarData('/configuracoes') },
      },
      {
        path: 'configuracoes/permissoes',
        loadComponent: placeholder,
        data: { title: 'Permissões de Acesso', ...sidebarData('/configuracoes') },
      },
      {
        path: 'configuracoes/modelos',
        loadComponent: placeholder,
        data: { title: 'Modelos / Templates', ...sidebarData('/configuracoes') },
      },
      {
        path: 'configuracoes/tabela-precos',
        loadComponent: placeholder,
        data: { title: 'Tabela de Preços', ...sidebarData('/configuracoes') },
      },
    ],
  },
];
