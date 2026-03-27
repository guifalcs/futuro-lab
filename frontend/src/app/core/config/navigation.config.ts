import { ISidebarItem } from '../../shared/components/sidebar/sidebar.component';

export interface INavModule {
  label: string;
  route: string;
  icon: string;
  sidebarItems: ISidebarItem[];
}

export const NAV_MODULES: INavModule[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: 'layout-dashboard',
    sidebarItems: [],
  },
  {
    label: 'Cadastros',
    route: '/cadastros',
    icon: 'database',
    sidebarItems: [
      { icon: 'building-2', label: 'Clientes', route: '/cadastros/clientes' },
      { icon: 'user-check', label: 'Solicitantes', route: '/cadastros/solicitantes' },
      { icon: 'truck', label: 'Fornecedores', route: '/cadastros/fornecedores' },
      { icon: 'flask-round', label: 'Laboratórios Parceiros', route: '/cadastros/laboratorios-parceiros' },
      { icon: 'map-pin', label: 'Pontos de Coleta', route: '/cadastros/pontos-coleta' },
      { icon: 'users', label: 'Funcionários', route: '/cadastros/funcionarios' },
    ],
  },
  {
    label: 'Comercial',
    route: '/comercial',
    icon: 'handshake',
    sidebarItems: [
      { icon: 'file-text', label: 'Propostas', route: '/comercial/propostas' },
      { icon: 'file-signature', label: 'Contratos', route: '/comercial/contratos' },
    ],
  },
  {
    label: 'Operacional',
    route: '/operacional',
    icon: 'flask-conical',
    sidebarItems: [
      { icon: 'clipboard-list', label: 'Ordens de Serviço', route: '/operacional/ordens-servico' },
      { icon: 'test-tubes', label: 'Coletas', route: '/operacional/coletas' },
      { icon: 'package-check', label: 'Recepção de Amostras', route: '/operacional/recepcao-amostras' },
      { icon: 'microscope', label: 'Laboratório', route: '/operacional/laboratorio' },
    ],
  },
  {
    label: 'Resultados',
    route: '/resultados',
    icon: 'file-check',
    sidebarItems: [
      { icon: 'eye', label: 'Revisão', route: '/resultados/revisao' },
      { icon: 'file-badge', label: 'Relatórios / Laudos', route: '/resultados/relatorios' },
    ],
  },
  {
    label: 'Financeiro',
    route: '/financeiro',
    icon: 'wallet',
    sidebarItems: [
      { icon: 'receipt', label: 'Faturamento', route: '/financeiro/faturamento' },
      { icon: 'trending-up', label: 'Contas a Receber', route: '/financeiro/contas-receber' },
      { icon: 'trending-down', label: 'Contas a Pagar', route: '/financeiro/contas-pagar' },
    ],
  },
  {
    label: 'Qualidade',
    route: '/qualidade',
    icon: 'shield-check',
    sidebarItems: [
      { icon: 'alert-triangle', label: 'Não Conformidades', route: '/qualidade/nao-conformidades' },
      { icon: 'check-circle', label: 'Controle de Qualidade', route: '/qualidade/controle-qualidade' },
      { icon: 'wrench', label: 'Equipamentos', route: '/qualidade/equipamentos' },
    ],
  },
  {
    label: 'Configurações',
    route: '/configuracoes',
    icon: 'settings',
    sidebarItems: [
      { icon: 'list', label: 'Parâmetros', route: '/configuracoes/parametros' },
      { icon: 'book-open', label: 'Métodos', route: '/configuracoes/metodos' },
      { icon: 'scale', label: 'Legislações', route: '/configuracoes/legislacoes' },
      { icon: 'grid-3x3', label: 'Matrizes', route: '/configuracoes/matrizes' },
      { icon: 'lock', label: 'Permissões de Acesso', route: '/configuracoes/permissoes' },
      { icon: 'layout-template', label: 'Modelos / Templates', route: '/configuracoes/modelos' },
      { icon: 'tag', label: 'Tabela de Preços', route: '/configuracoes/tabela-precos' },
    ],
  },
];
