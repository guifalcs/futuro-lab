# Cha<!-- Formato:
## YYYY-MM-DD | Tipo | hash_commit
Descrição do que foi feito.
-->

## 2026-03-21 | feat | pendente
Cria módulo de suporte com telas de listagem, criação e visualização de tickets, mock de dados, rotas com sidebar dedicado e stories no Storybook. Adiciona componente `app-multi-select` em `shared/components/` e substitui filtros de seleção única por multi-select nas listagens de clientes, equipe e suporte. Integra link de suporte no header e sidebar, valida formulário com toast de erro, corrige link da Rebuild no footer para rebuild.dev.br e ajusta posição do badge de status na visualização de ticket para seguir o padrão dos demais módulos.

## 2026-03-21 | feat | 93350da
Atualiza o branding do website com title mais profissional e substitui o favicon padrao por icones da Status (favicon.ico, PNG 16x16/32x32, Apple Touch, Android e manifest).

## 2026-03-21 | feat | 1028adf
Cria o módulo de clientes com listagem, cadastro, visualização e edição, adiciona mock de dados e estados brasileiros, integra novas rotas em `main-layout`, cria stories de ClientList/ClientCreate/ClientView/ClientEdit e ajusta feedback de validação em formulários de equipe, suporte a `maxLength` no `app-input` e ícone `plus` na sidebar.

## 2026-03-21 | feat | 6a38392
Cria módulo de equipe com listagem de colaboradores, filtros por busca/departamento/status/presença, tabela responsiva com ações, modal de ativação/desativação com toast, rotas dedicadas com sidebar e stories no Storybook.

## 2026-03-21 | feat | 32d8dbc
Cria as telas de equipe para cadastro, visualização e edição de colaborador com states de not found, validações, modais de confirmação, troca de status e navegação entre listagem/visualização/edição. Atualiza rotas do módulo para substituir placeholders, adiciona stories de TeamCreate/TeamEdit/TeamView e inclui opções de cargo mockadas para os selects.

## 2026-03-21 | feat | 82eeadc
Migra a listagem de equipe para reutilizar o app-table com templates customizados por coluna e paginação, remove estilos da tabela HTML customizada, mantém cards mobile e modal de status, adiciona story WithPagination e corrige provider de ícones lucide no app-table para suportar ações renderizadas via appTableCell.

## 2026-03-21 | feat | 1e40438
Cria as telas de perfil e alterar senha com validações, estados de loading, toasts, placeholders de notificações/configurações, stories no Storybook e rotas com sidebar dedicado. Ajusta o MainLayout para consumir sidebar items da rota e garantir navegação pelo header, além de correções visuais no sidebar mobile.

## 2026-03-20 | feat | 8c5cd26
Renderiza agrupamento inteligente na Sidebar Mobile em `layouts/main-layout/`. Adicionado logica computed iterável que insere links originais do Topbar na Lateral caso visualizado em mobile size (<768px). Implementado suporte a divisores textuais lógicos (`isHeader`) no componente genérico `app-sidebar` com fallback para barra separadora em views colapsadas.

## 2026-03-20 | feat | edbe909
Cria layout principal (Shell) em `layouts/main-layout/` que engloba rotas internas utilizando container dinâmico e flexbox. Ajusta comportamento do `app-header` com novos event emitters para controle do menu mobile. Modifica a estruturação CSS do `app-sidebar` para se adequar nativamente à largura da tela e lidar com colapso sem quebrar layout. Correção do logo do `app-footer`. Cria placeholders de features (`dashboard`, `tarefas`, `clientes`, `equipe`) e amarra a rota de lazy-loading na raíz (`''`) redirecionando ao dashboard. Adiciona estados ao Storybook com navegações mockadas.

## 2026-03-20 | feat | 33ec429
Cria página 403 (Sem Permissão) em `features/error/forbidden/` com layout centralizado, fundo background-secondary e reuso do `app-button`. Adiciona tipografia impactante com cor erro-light e ícone `shield-x`. Cria rota lazy loaded `/forbidden` em `app.routes.ts` com direções para início ou fallback com `location.back()`. Cria story Default no Storybook.

## 2026-03-20 | feat | da2bb46 — Status Demandas

> Registro de todas as alterações do projeto.
> Atualizado automaticamente ao final de cada feature, fix ou tweak.

<!-- Formato:
## YYYY-MM-DD | Tipo | hash_commit
Descrição do que foi feito.
-->

## 2026-03-20 | feat | c114885
Cria página 404 (Not Found) em `features/error/not-found/` com layout centralizado, fundo background-secondary, tipografia impactante, ícone `file-question` e reuso do `app-button`. Adiciona rota wildcard (`**`) em `app.routes.ts` para capturar rotas inexistentes. Respeita responsividade e diretrizes de acessibilidade (tabindex, keydown e role no link de voltar usando `location.back()`). Cria story Default no Storybook.

## 2026-03-20 | feat | cc9cc12
Cria pagina de login em `features/auth/login/` com validacao de campos, background com gradiente e textura noise, toast de feedback e rota lazy loaded em `/login`. Ajusta template raiz do app, posicao do toast para canto superior direito e estilos globais com fonte Inter.

## 2026-03-20 | feat | c997100
Cria telas de autenticacao para recuperacao de senha (`forgot-password` e `reset-password`) com estados de sucesso, validacoes de formulario, reuse de `app-input`, `app-password-input` e `app-button`, integracao com `ToastService` e icones lucide. Adiciona rotas lazy loaded em `auth.routes.ts`, navegação do login para a tela de esqueci minha senha e stories no Storybook (`forgot-password` e `reset-password`). Atualiza TODOs com orientacoes do fluxo Supabase (redirect URL absoluta, evento `PASSWORD_RECOVERY` e uso de `updateUser`).

## 2026-03-20 | fix | 8dc04eb
Corrige stories das telas `forgot-password` e `reset-password` para exibir corretamente estados de validacao, loading e sucesso usando componentes host com inputs controlados.

## 2026-03-19 | feat | d301524
Cria componente `app-header` em `layouts/header/` com logo, navegacao por navlinks, menu dropdown do usuario (perfil e sair), hamburger menu mobile e responsividade em 3 breakpoints. Storybook com stories padrao, rota ativa, avatar e menu aberto.

## 2026-03-19 | feat | b83fe02
Cria componente `app-footer` em `layouts/footer/` com copyright, logo da Rebuild como imagem e versao opcional. Storybook com stories padrao, com versao e nome customizado.

## 2026-03-19 | feat | 76e2b14
Cria directive `app-tooltip` em `shared/components/tooltip/` com exibicao em hover/focus, delay configuravel, fallback de posicao e estilos inline. Storybook com exemplos nas quatro direcoes, texto longo, delay e icone.

## 2026-03-19 | feat | 0fc4e84
Cria componente `app-checkbox` em `shared/components/checkbox/` com suporte a estados checked, indeterminate, disabled e erro. Interacao por clique e teclado, icones do lucide e estilos baseados no design system.

## 2026-03-19 | feat | 58f3119
Cria componente `app-textarea` em `shared/components/textarea/` com label, placeholder, estados de erro/disabled/required, contador de caracteres com limite e controle de resize. Storybook com variacoes de uso e estados visuais.

## 2026-03-19 | feat | 417e38c
Cria componente `app-avatar` em `shared/components/avatar/` com suporte a imagem via URL, fallback de fallback initials coloridas (geradas via hash estático do nome para 8 cores), e fallback icone `User`. Suporte a 4 tamanhos (sm, md, lg, xl) e a bolinha de status (online, offline, busy, away). Ajustado Storybook do `app-sidebar` para substituir mocks hardcoded pelo componente real de avatar. Modificado linting para garantir integridade. Stories: With Image, With Initials, Single Name, Fallback, All Sizes, Todos Status.

## 2026-03-19 | feat | 7bd2a89
Cria componente `app-sidebar` em `shared/components/sidebar/` com colapso/expansão (260px → 64px, transição 200ms), destaque de rota ativa, badges como pill (expandido) ou dot (colapsado), slots via `ng-content` para logo e footer, e suporte mobile com overlay e slide (300ms). Ícones de navegação registrados diretamente no `providers` do componente para garantir disponibilidade independente do injector pai (resolve bug onde `moduleMetadata.providers` do Storybook não propaga para injectors filhos). Labels controlados via `@if (!collapsed())` em vez de CSS transitions para evitar bug de renderização em elementos fora do viewport. Corrige nomes de ícones: `home` → `house`, `bar-chart-2` → `chart-bar`. Stories: Expandida, Colapsada, Com Rota Ativa, Com Badges, Colapsada com Badges, Interativa e Mobile.

## 2026-03-19 | feat | 647c0be
Cria `ToastService` em `core/services/` (providedIn root) com métodos `success()`, `warning()`, `error()`, `info()` e `dismiss()`, signal readonly `toasts`, duration padrão 5000ms e limite de 5 toasts simultâneos (remove o mais antigo). Cria `ToastComponent` em `shared/components/toast/` com posição fixed bottom-right, borda esquerda colorida por variante, ícones lucide por variante com cor via `[ngClass]`, animação de entrada slide-from-right 300ms e saída fade+slide 200ms. Timers gerenciados no componente para garantir animação de saída no auto-dismiss. Responsivo: bottom-center em telas menores que 768px. Registrado no `app.html`/`app.ts`. Story interativa com botões para cada variante e "Disparar Múltiplos".

## 2026-03-19 | feat | e3a5b15
Cria componente `app-table` em `shared/components/table/` com suporte a seleção de linhas (checkbox customizado via `<button>`), skeleton loading (5 linhas com gradiente animado 1.5s), estado vazio (ícone `inbox` + mensagem configurável) e templates customizados por coluna via `[appTableCell]="key"` + `let-row`. Inputs: `columns`, `data`, `selectable`, `selectedRows`, `emptyMessage`, `loading`. Outputs: `rowClick`, `selectionChange`. Header sticky com scroll vertical no body. Overflow-x auto com `min-width: 600px` para scroll horizontal em mobile. Stories: Default, Empty, Loading, Selectable, Custom Column Template (badges de status), Many Rows (25 linhas com container 400px).

## 2026-03-19 | feat | 0354b52
Cria componente `app-modal` em `shared/components/modal/` com slots condicionais via diretiva `[appModalFooter]` (detectada com `contentChild`). Inputs: `isOpen`, `title`, `size` (sm/md/lg), `closeOnOverlay`, `closeOnEscape`, `showCloseButton`. Output `closed` emitido por overlay, Escape ou botão X. Bloqueia scroll do body via `effect()`. Animação de entrada: fade + scale 95→100% em 200ms. Usa `event.target === event.currentTarget` para fechar pelo overlay sem `stopPropagation` no painel. Ícone X via `LUCIDE_ICONS`. Stories: Default, With Footer, Small, Large, Without Close Button, Confirmação de Exclusão.

## 2026-03-19 | feat | 3a9548f
Cria componente `app-card` em `shared/components/card/` com slots condicionais via diretivas `[appCardHeader]` e `[appCardFooter]` (detectadas com `contentChild`). Variantes: `default`, `interactive` (hover eleva shadow + translateY) e `selected` (borda e fundo primary). Padding configurável: `none`, `sm`, `md`, `lg`. Header e footer renderizam condicionalmente quando conteúdo é projetado. Emite `cardClick` apenas na variante `interactive`. Stories: Default, With Header and Footer, Interactive, Selected, No Padding e exemplo contextual Task Card.

## 2026-03-19 | feat | 5988fee
Cria componente `app-badge` em `shared/components/badge/` com 5 variantes de status (success, warning, danger, info, neutral) e 2 tamanhos (sm, md). Formato pill com `border-radius: 9999px`, tokens de cor do design system via `_variables.scss`. Usa signals (`input()`, `computed()`) e standalone. Stories: Success, Warning, Danger, Info, Neutral, Small Size e exemplo contextual "Status de Tarefa" com os quatro badges lado a lado.

## 2026-03-19 | feat | bd8d957
Cria componente `app-select` com dropdown customizado (sem select nativo). Fecha ao clicar fora via `@HostListener` + `ElementRef`, fecha com Escape, chevron rotaciona 180° quando aberto, opção selecionada com destaque e ícone check. Acessível por teclado. Mesmo padrão visual do `app-input`. Stories: Default, WithLabel, WithPlaceholder, WithSelection, WithError, Disabled, Required, ManyOptions.

## 2026-03-19 | feat | 50e66c7
Cria componente `app-password-input` com toggle de visibilidade (ícones eye/eye-off), indicador de força em 3 segmentos coloridos, checklist de critérios com feedback visual e emissão de `strengthChange`. Usa `LUCIDE_ICONS` token para compatibilidade com Angular 21 standalone. Stories: Default, Fraca, Média, Forte, WithError, Disabled, Sem Indicador, Comprimento Customizado.

## 2026-03-19 | feat | 78612e0
Cria componente `app-input` em `shared/components/input/` com suporte a label, placeholder, error, disabled e required. Usa `model()` para two-way binding em `value`, `[attr.disabled]` para desabilitação correta no DOM, e tokens via `_variables.scss`. Stories: Default, WithLabel, WithPlaceholder, Required, Error, Disabled, Search.

## 2026-03-19 | Tweak | 3694145
Extrai tokens do design system para `shared/styles/_variables.scss` (cores, tipografia, radius, sombras, transições). Atualiza `button.component.scss` para importar via `@use`. Remove `pointer-events: none` do estado disabled — bloqueio de clique já tratado pelo `onClick()` no `.ts`, permitindo tooltips futuros em botões desabilitados.

## 2026-03-19 | feat | 19a7f43
Criação do componente `app-button` em `shared/components/button/` seguindo o design system. Suporta 5 variantes (default, secondary, outline, ghost, destructive), 4 tamanhos (sm, md, lg, icon), e estados disabled e loading com spinner animado. Usa signals (`input()`, `output()`) e standalone component. Story no Storybook com todas as variantes, tamanhos e estados. Fix no `eslint.config.js` (sintaxe ESM/CJS mista).
