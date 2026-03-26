
# Plataforma de gerenciamento interno
— Status Contabilidade

## Visão Geral

Sistema de gestão de demandas internas para a Status Contabilidade. Centraliza todas as solicitações de clientes, organiza o fluxo de trabalho da equipe do departamento pessoal e fornece visibilidade gerencial completa, substituindo o controle manual por e-mail, planilhas e agendas.

## Stack

* **Frontend:** Angular 21 com TypeScript strict
* **Backend:** Supabase (PostgreSQL, Edge Functions em Deno/TypeScript, Auth, Realtime, Storage)
* **Testes:** Jasmine/Karma (unitários), Playwright (E2E)
* **UI Components:** Storybook
* **Monitoramento:** Sentry
* **Hospedagem:** Vercel (frontend) + Supabase Cloud (backend)
* **CI/CD:** GitHub Actions

## Estrutura do Projeto

```
├── frontend/          → Angular app
│   ├── src/app/
│   │   ├── core/      → Services singleton, guards, interceptors
│   │   ├── shared/    → Componentes reutilizáveis, pipes, directives
│   │   ├── features/  → Módulos de funcionalidades (lazy loaded)
│   │   └── layouts/   → Layouts de página
│   └── src/stories/   → Storybook stories
├── supabase/
│   ├── migrations/    → SQL migrations (imutáveis após aplicadas)
│   ├── functions/     → Edge Functions
│   └── seed/          → Dados de seed para dev
├── tests/e2e/         → Testes E2E com Playwright
└── docs/              → Documentação do projeto
```

## Comandos Essenciais

```bash
# Frontend
cd frontend && ng serve                    # Dev server
cd frontend && ng build                    # Build produção
cd frontend && ng test                     # Testes unitários
cd frontend && npm run storybook           # Storybook

# Supabase
supabase start                             # Ambiente local (Docker)
supabase db reset                          # Reset + aplica migrations
supabase functions serve                   # Edge Functions local

# Testes E2E
npx playwright test                        # Roda todos E2E
npx playwright test --ui                   # Modo visual

# Lint
cd frontend && ng lint                     # ESLint
```

## Regras de Código

### TypeScript/Angular

* Sempre usar TypeScript strict mode
* Componentes funcionais com signals quando possível
* Services injetáveis em `core/`, componentes reutilizáveis em `shared/`
* Features como módulos lazy loaded em `features/`
* Nomes de arquivos: kebab-case (ex: `task-list.component.ts`)
* Interfaces prefixadas com I (ex: `ITask`, `IClient`)
* Enums em PascalCase (ex: `TaskStatus`, `TaskType`)

### Supabase

* Migrations nomeadas descritivamente (ex: `20260401_create_tasks_table.sql`)
* NUNCA editar migrations já aplicadas — criar nova migration corretiva
* Toda tabela com RLS habilitado
* Edge Functions com tratamento de erro e validação de input
* Usar Supabase client tipado (gerado com `supabase gen types`)
* Campos com valores pré-definidos (selects, status, tipos) DEVEM usar enum no PostgreSQL, NUNCA texto livre. Criar o enum na migration e referenciar no campo. Ex: `CREATE TYPE task_type AS ENUM ('ferias', 'rescisao', 'admissao');`

### Geral

* Commits em português, formato: `tipo(escopo): descrição`
  * Tipos: feat, fix, refactor, test, docs, style, chore
  * Ex: `feat(tarefas): adiciona formulário de criação`
* Nunca commitar secrets, env vars ou credenciais
* Nunca fazer push direto na main — sempre via PR

## Componentes e Design System

* Antes de criar qualquer elemento de interface, verificar componentes existentes em `frontend/src/app/shared/components/`
* NUNCA criar um elemento visual que já exista como componente
* Todo componente novo DEVE ter uma story no Storybook em `frontend/src/stories/`
* Seguir o design system definido em `docs/design-system.md`

## Workflow de Desenvolvimento

* Para o processo completo de desenvolvimento, consultar `docs/feature-workflow.md`
* Após cada checkpoint aprovado pelo usuário, fazer commit intermediário
* Atualizar `CHANGELOG.md` ao final de cada feature/fix/tweak com data, tipo, resumo e hash do commit

## Ambientes

* **Local:** Angular dev server + Supabase Docker (`supabase start`)
* **Staging:** Vercel Preview Deploy + Supabase Dev
* **Produção:** Vercel Production + Supabase Prod
* IMPORTANTE: NUNCA executar comandos que afetem o ambiente de produção. Deploy para produção é feito exclusivamente via GitHub Actions após merge na main.

## Regras de Negócio

* Para regras de negócio específicas do cliente, consultar `docs/business-rules.md`
* Para decisões de arquitetura do projeto, consultar `docs/architecture.md`
