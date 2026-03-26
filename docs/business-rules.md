
# FuturoLab — Regras de Negócio

> Fonte: conversa com Barôncio (Laboratório Certificar) em 25/03/2026.
> Detalhes de cada módulo serão expandidos após reuniões presenciais.

## Premissa Fundamental

O sistema deve cobrir **toda a cadeia de custódia da amostra** conforme ISO/IEC 17025:2017. Os módulos são construídos incrementalmente, mas **só pode ser usado em produção quando todos estiverem funcionais** — não existe uso parcial.

## Módulos (fluxo sequencial)

### 1. Comercial

* Registrar pedidos de orçamento recebidos
* Análise crítica do pedido (conforme ISO 17025 — avaliar se o lab pode atender)
* Elaboração da proposta técnico-comercial
* Registro de envio ao cliente
* Status da proposta: em elaboração → enviada → aguardando → aprovada → recusada
* Controle e registro de versão da proposta
* Deve permitir mais de um modelo de proposta

### 2. Ordem de Serviço

* Gerada automaticamente a partir de proposta aprovada
* Herda os itens/parâmetros da proposta

### 3. Coleta

* OS liberadas são usadas para preparar material de coleta
* Agendamento de coletas
* Registro de todos os dados de coleta das amostras
* Deve permitir mais de um modelo de ficha de coleta

### 4. Recepção de Amostras

* Amostras chegam ao lab e são avaliadas com critérios de aceitação
* Ao dar entrada na amostra/OS → envio automático de e-mail ao cliente informando recebimento
* Liberação da amostra para o laboratório (setor analítico)

### 5. Laboratório

* Registro de todos os resultados analíticos por parâmetro de cada amostra
* Possibilidade de juntar 2+ amostras para emitir em um único relatório

### 6. Relatórios

* Geração do relatório de ensaio com todos os parâmetros da amostra
* Etapas de revisão e assinatura
* Número de relatório único e irrepetível (nunca se repete ao longo dos anos)
* Envio automático por e-mail e WhatsApp ao cliente
* Deve permitir mais de um modelo de relatório de ensaio

### 7. Financeiro

* Cada OS/amostra com relatório emitido gera uma fatura
* Preços vêm da proposta comercial
* Integração com OMIE (ERP) para emissão de NF
* Integração com Prefeitura para boleto/NF de serviço

## Regra de Confidencialidade e Imparcialidade (ISO 17025)

Acesso aos módulos controlado por perfil de usuário. Regra crítica: **funcionário que analisa a amostra NÃO pode ver o nome do cliente** que enviou aquela amostra. Cada perfil só vê o que é permitido pela norma.

## Cadastros Base

* Funcionários
* Clientes e suas unidades
* Solicitantes de serviço (detalhes a definir com Barôncio)
* Pontos de coleta por cliente (com histórico de resultados pesquisável)
* Fornecedores
* Laboratórios parceiros/subcontratados
* Parâmetros analíticos e seus detalhes
* Metodologias por parâmetro
* Legislações
* Matrizes (água, solo, ar, etc.)

## Portal do Cliente (acesso externo)

* Login e senha
* Consulta de status das amostras no laboratório
* Acesso a resultados parciais
* Download de relatórios de ensaio
* Consulta de NF e boletos emitidos

## Requisitos Técnicos (do cliente)

* Disponibilidade 24/7
* Arquitetura robusta para volume alto de dados
* Auditável — logs de tudo (erros e ações do usuário)
* Estável para muitos acessos simultâneos
* Fácil manutenção
* Fácil atualização dos bancos de dados (parâmetros, legislações, labs parceiros)

## Pendente — Reuniões Presenciais

* Detalhes e especificidades de cada módulo
* Regras de interação entre módulos
* Perfis de usuário e permissões detalhadas
* Critérios de aceitação de amostras na recepção
* Detalhes sobre solicitantes de serviço
* Modelos de relatório, ficha de coleta e proposta
* Fluxo completo da cadeia de custódia

## Legislação Aplicável

* ISO/IEC 17025:2017
* CONAMA 357/2005
* CONAMA 430/2011
* Portaria GM/MS 888/2021
* Lei 15.190/2025
* *(outras a cadastrar no banco de legislações)*
