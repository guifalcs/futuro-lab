
# Backend — Supabase

## Comandos

```bash
supabase start                # Sobe ambiente local (Docker precisa estar ativo)
supabase stop                 # Para o ambiente local
supabase db reset             # Reset + aplica todas migrations
supabase migration new nome   # Cria nova migration
supabase gen types typescript --local > ../frontend/src/app/core/types/database.types.ts
supabase functions new nome   # Cria Edge Function
supabase functions serve      # Serve functions localmente
```

## Regras

* Antes de qualquer comando, verificar Docker ativo: `docker info`
* NUNCA editar migrations já aplicadas
* NUNCA fazer push para projeto de produção
* Toda tabela com RLS habilitado
* Toda tabela com `created_at` e `updated_at`
* Edge Functions sempre com CORS, auth e error handling
* Gerar tipos TypeScript após qualquer mudança de schema
