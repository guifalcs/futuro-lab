# Regras de Negócio — Status Contabilidade

> Este documento é a fonte de verdade para as regras de negócio do projeto.
> Deve ser consultado antes de implementar qualquer feature que envolva lógica de domínio.
> Atualizar sempre que uma regra for adicionada ou alterada.

## Entidades Principais

### Tarefa (Demanda)

* Descrição: Solicitação de serviço recebida de um cliente da contabilidade
* Campos: tipo, empresa/cliente, funcionário (quando aplicável), descrição, prazo, status, responsável, data de criação, data de encerramento
* Regras:
  * Toda tarefa deve ter um tipo (enum)
  * Toda tarefa deve estar vinculada a um cliente/empresa
  * Toda tarefa deve ter um responsável (colaborador da cartela)
  * Prazo padrão de entrega: 48 horas, salvo demandas mais complexas acordadas à parte
  * Algumas tarefas geram tarefas derivadas automaticamente (ex: admissão gera alerta de vencimento de contrato de experiência em 45/90 dias)

### Tipos de Tarefa

* Aviso prévio
* Rescisão
* Férias
* Admissão
* Orientação de cliente
* Folha de pagamento
* Outros (a definir com a equipe durante o desenvolvimento)

### Cliente/Empresa

* Descrição: Empresa cliente da Status Contabilidade
* Campos: código, nome, CNPJ, contatos (e-mails que recebem documentos), departamentos atendidos
* Regras:
  * Cada cliente é atendido por um ou mais colaboradores (cartela)
  * O cadastro define quem recebe notificações por departamento (pessoal, fiscal, contábil)

### Colaborador (Usuário interno)

* Descrição: Funcionário da Status que atende os clientes
* Campos: nome, e-mail, perfil (colaborador ou gestor), cartela de clientes
* Regras:
  * Colaborador visualiza apenas as tarefas dos seus clientes (sua cartela)
  * Gestor visualiza todas as tarefas de todos os colaboradores
  * Média de 30-70 clientes por colaborador
  * Equipe atual: 9 pessoas no departamento pessoal

## Fluxos de Negócio

### Recebimento de Demanda

* Gatilho: Cliente envia e-mail para o endereço do departamento
* Passos:
  1. E-mail chega na caixa compartilhada do departamento
  2. Demanda é registrada no sistema como tarefa
  3. Tarefa é atribuída ao colaborador responsável pela cartela daquele cliente
  4. Colaborador recebe a tarefa no seu painel
* Exceções: Demandas que não são de rotina podem precisar de triagem manual pela gestora

### Execução e Encerramento de Tarefa

* Gatilho: Colaborador inicia o trabalho na tarefa
* Passos:
  1. Colaborador atualiza status da tarefa conforme progride
  2. Ao finalizar, anexa documentos necessários
  3. Encerra a tarefa, o que dispara envio automático ao cliente por e-mail
* Exceções: Tarefas que dependem de informação adicional do cliente ficam em status de espera

### Tarefas Derivadas (automáticas)

* Admissão → gera alerta de vencimento de contrato de experiência (45 dias e 90 dias)
* Aviso prévio → gera tarefa de rescisão vinculada

## Perfis de Usuário

### Colaborador

* Permissões: criar, editar, encerrar tarefas dos seus clientes
* Restrições: não vê tarefas de outros colaboradores, não acessa configurações
* Visibilidade: apenas sua cartela de clientes e suas tarefas

### Gestor (Sirlene)

* Permissões: tudo que o colaborador pode + visualizar todas as tarefas, transferir tarefas entre colaboradores, acessar dashboard gerencial, gerenciar cartelas
* Restrições: nenhuma dentro do sistema
* Visibilidade: todos os clientes, todos os colaboradores, todas as tarefas, métricas e indicadores

## Regras de Prazo

* Prazo padrão para qualquer demanda: 48 horas
* Demandas mais complexas: prazo acordado individualmente
* Alertas visuais: no prazo, próximo do vencimento, atrasado
* Tarefas atrasadas devem ser justificadas pelo colaborador

## Notificações

* Ao encerrar tarefa: e-mail automático para o cliente com os documentos anexados
* Alerta de vencimento de contrato de experiência: notificação para o colaborador responsável
* Tarefas atrasadas: visível no dashboard da gestora
