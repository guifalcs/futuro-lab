
# FuturoLab — Guia para Agentes de IA

## Stack

* Frontend: Angular 21 com TypeScript strict, standalone components, signals
* Backend: Supabase (a configurar)
* Testes: Jasmine/Karma (unit), Playwright (E2E)
* UI: Storybook
* Hospedagem: Vercel + Supabase Cloud

## Comandos

```bash
cd frontend && ng serve          # Dev server
cd frontend && ng test           # Testes unitários
cd frontend && ng lint           # Lint
```

## Convenções de Código

* TypeScript strict, sem any
* Componentes Angular funcionais com signals
* Kebab-case para arquivos, PascalCase para classes/interfaces/enums
* Interfaces prefixadas com I
* Commits em português: tipo(escopo): descrição
* Nunca commitar secrets ou credenciais
* Nunca push direto na main

## Estrutura

* `frontend/src/app/core/` → Services, guards, interceptors
* `frontend/src/app/shared/` → Componentes reutilizáveis
* `frontend/src/app/features/` → Módulos lazy loaded
* `docs/` → Documentação

## Regras Importantes

* Verificar componentes existentes antes de criar novos
* Todo componente novo precisa de story no Storybook
* Consultar `docs/business-rules.md` para regras de negócio
