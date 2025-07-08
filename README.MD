# Sistema de Agendamento para Barbearia

Este projeto tem como objetivo desenvolver um sistema completo de gerenciamento de atendimentos para barbearias. O sistema permite o controle de agendamentos, clientes, serviços, profissionais, além de relatórios e configurações administrativas.

## Funcionalidades

### 1. Autenticação de Usuário

- **Login**: Permite que usuários (administradores, barbeiros e clientes) façam login no sistema utilizando suas credenciais (e-mail e senha).
- **Validação**: As credenciais são validadas para garantir que apenas usuários autorizados possam acessar o sistema.
- **Gerenciamento de Sessão**: Utilização de cookies httpOnly e JWT para segurança.

### 2. Agendamento de Serviços

- **Cadastro de Agendamentos**: Clientes podem agendar horários para serviços disponíveis na barbearia.
- **Gestão de Agenda**: Barbeiros e administradores visualizam e gerenciam os horários agendados.
- **Notificações**: Envio de confirmações e lembretes de agendamento.

### 3. Cadastro e Gerenciamento

- **Clientes**: Cadastro, edição e consulta de clientes.
- **Barbeiros**: Cadastro e gerenciamento dos profissionais.
- **Serviços**: Definição dos serviços oferecidos e seus valores.
- **Relatórios**: Geração de relatórios de atendimentos, clientes e serviços.

### 4. Layout e Usabilidade

- **Design Responsivo**: Interface adaptável para diferentes dispositivos.
- **Navegação Intuitiva**: Experiência de uso simples e eficiente.

## Tecnologias Utilizadas

- **Backend**: NestJS
- **Frontend**: React 18 + Next 15
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT, Cookies httpOnly
- **Estilização**: Tailwind CSS v4, shadcn
- **Testes**: Vitest, Cypress
- **Documentação**: Swagger
- **Outros**: Docker

## Estrutura do Projeto

- **/api**: Backend (NestJS, Prisma, Swagger, etc.)
- **/web**: Frontend (React, Next, Tailwind, etc.)

## Configuração e Execução

1. **Instalação de Dependências**: Execute `npm install` nas pastas `api` e `web` para instalar as dependências.
2. **Execução do Backend**: Acesse a pasta `api` e execute `npm run start:dev`.
3. **Execução do Frontend**: Acesse a pasta `web` e execute `npm run dev`.
4. **Build**: Utilize `npm run build` nas respectivas pastas para gerar a versão de produção.

## Contribuição

Este projeto está aberto para contribuições. Caso queira contribuir, faça um fork do repositório, crie uma branch para sua funcionalidade ou correção e envie um pull request para revisão.

## Próximos Passos

- Implementação de controle de presença e cancelamento de agendamentos.
- Integração com serviços de notificação (e-mail, WhatsApp).
- Dashboard com indicadores de desempenho.
- Permitir avaliações de clientes sobre os serviços.
- Integração com métodos de pagamento.
