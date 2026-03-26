
# Frontend — Angular

## Comandos

```bash
ng serve                  # Dev server em localhost:4200
ng test                   # Testes unitários
ng lint                   # ESLint
npm run storybook         # Storybook em localhost:6006
ng generate component shared/components/nome   # Novo componente
```

## Regras

* TypeScript strict, sem `any`
* Componentes com signals (`input()`, `output()`, `signal()`, `computed()`)
* Standalone components
* Verificar `shared/components/` antes de criar componente novo
* Todo componente novo DEVE ter story no Storybook
* Estilos com SCSS, usar variáveis do design system
* Lazy loading em todos os módulos de feature
