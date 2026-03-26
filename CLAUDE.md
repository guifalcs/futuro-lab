
# FuturoLab — Plataforma LIMS para Laboratórios Ambientais

## Visão Geral

Sistema de gestão laboratorial (LIMS) para laboratórios de análises ambientais (água, solo, ar). Inspirado no GerenciaLab, com foco em dar controle e visibilidade ao gestor do laboratório.

## Stack

* **Frontend:** Angular 21 com TypeScript strict, standalone components, signals API
* **Backend:** Supabase (a configurar — apenas frontend por enquanto)
* **Testes:** Jasmine/Karma (unitários), Playwright (E2E)
* **UI Components:** Storybook
* **Hospedagem:** Vercel (frontend) + Supabase Cloud (backend)
* **Ícones:** Lucide Angular
* **Estilos:** SCSS com tokens em `frontend/src/app/shared/styles/_variables.scss`

## Estrutura do Projeto

```
├── frontend/          → Angular app
│   ├── src/app/
│   │   ├── core/      → Services singleton, guards, interceptors
│   │   ├── shared/    → Componentes reutilizáveis, pipes, directives
│   │   ├── features/  → Módulos de funcionalidades (lazy loaded)
│   │   └── layouts/   → Layouts de página
│   └── src/stories/   → Storybook stories
├── supabase/          → (a configurar)
├── tests/e2e/         → Testes E2E com Playwright
└── docs/              → Documentação do projeto
```

## Comandos Essenciais

```bash
cd frontend && ng serve                    # Dev server
cd frontend && ng build                    # Build produção
cd frontend && ng test                     # Testes unitários
cd frontend && npm run storybook           # Storybook
cd frontend && ng lint                     # ESLint
```

## Regras de Código

* TypeScript strict, sem `any`
* Componentes funcionais com signals quando possível
* Kebab-case para arquivos, PascalCase para classes/interfaces/enums
* Interfaces prefixadas com I (ex: `ISample`, `IClient`)
* Verificar componentes shared existentes antes de criar novos
* Todo componente novo DEVE ter story no Storybook
* Commits em português: `tipo(escopo): descrição`
* Nunca commitar secrets ou credenciais
* Nunca push direto na main — sempre via PR

## Contexto de Domínio

Laboratório de análises ambientais. Termos-chave: amostra, ensaio, laudo, cadeia de custódia, matriz (água/solo/ar), ISO/IEC 17025:2017.

Regras de negócio são definidas incrementalmente em `docs/business-rules.md` conforme feedback do cliente.
