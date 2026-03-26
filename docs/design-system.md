
# Design System — FuturoLab

> Referência visual do projeto. Consultar antes de criar qualquer componente.
> Componentes existentes estão em `frontend/src/app/shared/components/`.
> Stories visuais no Storybook: `cd frontend && npm run storybook`
> Estilo: moderno, limpo, inspirado em shadcn/ui. Foco em espaço, hierarquia e micro-interações. Plataforma LIMS para laboratórios de análises ambientais.

## Cores

### Primárias (FuturoLab)

* **Primary:** `#1D6AA5` — azul principal (botões, links, elementos de destaque)
* **Primary Hover:** `#185A8C` — hover de botões e links
* **Primary Light:** `#E8F1F8` — backgrounds sutis, badges, selected states
* **Primary Foreground:** `#FFFFFF` — texto sobre fundo primary

### Status

* **Sucesso:** `#16A34A` — tarefas concluídas, confirmações
* **Sucesso Light:** `#F0FDF4` — background de alertas de sucesso
* **Alerta:** `#CA8A04` — tarefas próximas do vencimento, avisos
* **Alerta Light:** `#FEFCE8` — background de alertas de aviso
* **Erro:** `#DC2626` — tarefas atrasadas, erros, ações destrutivas
* **Erro Light:** `#FEF2F2` — background de alertas de erro
* **Info:** `#2563EB` — informações, dicas
* **Info Light:** `#EFF6FF` — background de alertas de info

### Neutras (tom frio, inspirado em shadcn)

* **Background:** `#FFFFFF` — fundo principal da aplicação
* **Background Secondary:** `#F9FAFB` — fundo de áreas secundárias (sidebar, cards alternados)
* **Surface:** `#FFFFFF` — fundo de cards, modais, dropdowns
* **Muted:** `#F3F4F6` — fundo de inputs desabilitados, áreas inativas
* **Muted Foreground:** `#6B7280` — texto em elementos muted
* **Text Primary:** `#111827` — títulos, texto principal
* **Text Secondary:** `#4B5563` — descrições, labels
* **Text Muted:** `#9CA3AF` — placeholders, timestamps, metadados
* **Border:** `#E5E7EB` — bordas de cards, inputs, divisórias
* **Border Focus:** `#1D6AA5` — borda de input com foco (ring)
* **Ring:** `#1D6AA540` — sombra de foco (40 = 25% opacity)

### Accent

* **Accent:** `#F3F4F6` — fundo de itens hover em listas, menus
* **Accent Foreground:** `#111827` — texto sobre accent

## Tipografia

* **Font Family:** `'Inter', system-ui, -apple-system, sans-serif`
* **Font Mono:** `'JetBrains Mono', 'Fira Code', monospace` (para códigos ou IDs no sistema)

### Escala tipográfica

* **Display:** 30px / Bold / tracking -0.025em — título de páginas principais
* **H1:** 24px / Semibold / tracking -0.025em — cabeçalhos de seção
* **H2:** 20px / Semibold — subtítulos
* **H3:** 16px / Medium — títulos de cards
* **Body:** 14px / Regular / leading 1.5 — texto corrido
* **Body Small:** 13px / Regular — texto em tabelas, listas densas
* **Caption:** 12px / Regular — timestamps, metadados, labels secundários
* **Overline:** 11px / Medium / uppercase / tracking 0.05em — rótulos de seção, badges

## Sombras

* **Shadow SM:** `0 1px 2px 0 rgba(0, 0, 0, 0.05)` — inputs, badges
* **Shadow MD:** `0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)` — cards, dropdowns
* **Shadow LG:** `0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)` — modais, popovers

## Border Radius

* **Radius SM:** `6px` — badges, chips
* **Radius MD:** `8px` — botões, inputs, cards
* **Radius LG:** `12px` — modais, containers grandes
* **Radius Full:** `9999px` — avatares, tags redondas

## Componentes Base

> Todos os componentes seguem o padrão shadcn: minimalistas, bordas finas, sem sombras pesadas, estados claros.

### Botões (`app-button`)

* **Variantes:**
  * `default` — fundo primary, texto branco
  * `secondary` — fundo muted, texto primary
  * `outline` — fundo transparente, borda border, texto primary
  * `ghost` — fundo transparente, sem borda, texto muted-foreground. Hover: fundo accent
  * `destructive` — fundo erro, texto branco
* **Tamanhos:** `sm` (32px height), `md` (36px height), `lg` (40px height), `icon` (36x36px)
* **Estados:** hover (darken 10%), active (darken 15%), disabled (opacity 50%, cursor not-allowed), loading (spinner + disabled)
* **Transição:** `all 150ms ease`

### Inputs (`app-input`)

* **Fundo:** background
* **Borda:** 1px solid border
* **Borda focus:** 1px solid border-focus + ring shadow
* **Texto:** text-primary
* **Placeholder:** text-muted
* **Padding:** 8px 12px
* **Height:** 36px
* **Radius:** radius-md
* **Estados:** default, focus (ring azul), error (borda erro + texto erro abaixo), disabled (fundo muted, opacity 50%)

### Select (`app-select`)

* Mesmos estilos do input
* Ícone de chevron à direita (lucide `chevron-down`, 16px, cor text-muted)
* Dropdown: fundo surface, borda border, shadow-md, radius-md
* Item hover: fundo accent

### Cards (`app-card`)

* **Fundo:** surface
* **Borda:** 1px solid border
* **Radius:** radius-lg
* **Shadow:** shadow-sm (ou nenhuma, apenas borda)
* **Padding:** 24px
* **Header:** flex entre título (H3) e ações
* **Variantes:**
  * `default` — borda padrão
  * `interactive` — hover eleva shadow para shadow-md + translateY(-1px)
  * `selected` — borda primary-light, fundo primary-light sutil

### Badges (`app-badge`)

* **Radius:** radius-full
* **Padding:** 2px 10px
* **Font:** caption, medium
* **Variantes por status:**
  * `success` — fundo sucesso-light, texto sucesso
  * `warning` — fundo alerta-light, texto alerta
  * `danger` — fundo erro-light, texto erro
  * `info` — fundo info-light, texto info
  * `neutral` — fundo muted, texto muted-foreground
* **Tamanhos:** `sm` (20px height), `md` (24px height)

### Modal / Dialog (`app-modal`)

* **Overlay:** preto com 50% opacity, blur 4px
* **Fundo:** surface
* **Borda:** 1px solid border
* **Radius:** radius-lg
* **Shadow:** shadow-lg
* **Padding:** 24px
* **Tamanhos:** `sm` (400px), `md` (520px), `lg` (640px)
* **Animação:** fade in + scale de 95% para 100%, 200ms ease-out
* **Header:** título (H2) + botão X (ghost, icon)
* **Footer:** flex end, gap 8px entre botões

### Tabela / Data Table (`app-table`)

* **Header:** fundo background-secondary, texto text-secondary, font body-small medium
* **Linhas:** borda bottom 1px border, hover fundo accent
* **Células:** padding 12px 16px
* **Linha selecionada:** fundo primary-light

### Sidebar (`app-sidebar`)

* **Largura:** 260px (expandida), 64px (colapsada)
* **Fundo:** background-secondary
* **Borda direita:** 1px solid border
* **Item:** padding 8px 12px, radius-md, font body medium
* **Item ativo:** fundo primary-light, texto primary, font medium
* **Item hover:** fundo accent
* **Ícones:** 20px, cor text-muted (ativo: primary)
* **Transição de colapso:** width 200ms ease

### Toast / Notifications (`app-toast`)

* **Posição:** bottom-right, 16px de margem
* **Fundo:** surface
* **Borda:** 1px solid border (ou borda esquerda colorida por tipo)
* **Shadow:** shadow-md
* **Radius:** radius-md
* **Animação:** slide in da direita, 300ms
* **Auto-dismiss:** 5 segundos
* **Variantes:** success, warning, error, info (borda esquerda 3px com cor do status)

## Ícones

* **Biblioteca:** Lucide Icons (consistente com shadcn)
* **Tamanho padrão:** 20px em navigation, 16px inline com texto
* **Cor padrão:** text-muted (ativo: text-primary ou primary)
* **Stroke width:** 1.75px

## Espaçamento

* Usar múltiplos de 4px: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
* Padding interno de cards: 24px
* Gap entre elementos em formulários: 16px
* Gap entre cards em grids: 16px
* Gap entre itens em listas: 8px
* Margens de seção: 32px
* Padding de página: 24px (mobile), 32px (desktop)

## Responsividade

* **Mobile:** < 768px — sidebar oculta (overlay), layout single column
* **Tablet:** 768px - 1024px — sidebar colapsada (só ícones), layout adaptável
* **Desktop:** > 1024px — sidebar expandida, layout multi-column
* **Approach:** mobile-first
* **Container max-width:** 1280px

## Animações e Transições

* **Duração padrão:** 150ms (botões, hovers), 200ms (modais, dropdowns), 300ms (sidebar, toasts)
* **Easing:** `ease` para a maioria, `ease-out` para entradas, `ease-in` para saídas
* **Hover em cards:** translateY(-1px) + shadow-md
* **Focus em inputs:** ring shadow com transition
* **Skeleton loading:** gradiente animado de muted para background e volta, 1.5s infinite
* **Evitar:** animações longas (>500ms), bounce, animações que bloqueiam interação

## Padrões de Layout

### Dashboard

* Sidebar fixa à esquerda
* Header top com breadcrumb, busca e avatar do usuário
* Área de conteúdo com padding de página
* Cards de métricas no topo (grid 2-4 colunas)
* Tabela ou lista principal abaixo

### Formulários

* Label acima do input (não inline)
* Campos com largura 100% dentro do container
* Botões de ação no rodapé, alinhados à direita
* Mensagens de erro abaixo do campo, em vermelho, font caption
* Campos obrigatórios com asterisco vermelho no label

### Lista / Data Grid
- Tabela com filtros por coluna no header
- Badge de status visível na linha
- Paginação no rodapé
- Ações em toolbar no topo (Criar, Editar, Visualizar, Exportar)
- Linhas selecionáveis com checkbox
