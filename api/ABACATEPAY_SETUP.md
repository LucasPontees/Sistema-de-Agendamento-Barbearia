# Configuração e Integração da AbacatePay 🥑

## Sumário

- [Configuração Inicial](#configuração-inicial)
- [Fluxo Completo de Pagamento](#fluxo-completo-de-pagamento)
- [Endpoints da API](#endpoints-da-api)
- [Testando a Integração](#testando-a-integração)

---

## Configuração Inicial

### Passo 1: Obter API Key

1. Acesse: https://dashboard.abacatepay.com
2. Faça login ou crie uma conta
3. Vá em **Configurações** → **API Keys**
4. Copie sua chave de desenvolvimento

### Passo 2: Adicionar no arquivo .env

**Backend (`api/.env`):**

```env
# AbacatePay
ABACATEPAY_API_KEY=abc_dev_sua-chave-aqui

# Frontend URL (para redirects após pagamento)
FRONTEND_URL=http://localhost:3000

# JWT Secret
JWT_SECRET=seu-secret-aqui

# Database
DATABASE_URL=postgresql://...
```

**Frontend (`frontend/.env.local`):**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:7777
API_URL=http://localhost:7777
```

### Passo 3: Configurar Webhook (Opcional para Produção)

⚠️ **Nota:** Webhooks não funcionam em `localhost`. O sistema usa polling como alternativa.

Para produção:

1. No dashboard da AbacatePay, vá em **Webhooks**
2. Adicione a URL: `https://seu-dominio.com/payment/webhook`
3. Selecione o evento: **billing.paid**

---

## Fluxo Completo de Pagamento

### 📋 **Visão Geral**

```
Usuário preenche formulário → Cria billing → Paga PIX → Sistema verifica → Empresa criada → Login
```

### 🔄 **Fluxo Detalhado (Endpoint por Endpoint)**

#### **1. Usuário Acessa a Página de Registro**

- **URL Frontend:** `http://localhost:3000/register-company`
- **Componente:** `frontend/src/app/(public)/register-company/page.tsx`
- **Ação:** Exibe formulário com dados da empresa e do usuário administrador

---

#### **2. Usuário Preenche e Submete o Formulário**

- **Evento:** `handleSubmit()` no componente de registro
- **Validações:**
  - Senhas coincidem
  - Senha mínima de 6 caracteres
  - Campos obrigatórios preenchidos

**Payload Construído:**

```json
{
  "nomeFantasia": "Minha Barbearia",
  "cnpj": "12.345.678/0001-90",
  "telefone": "(11) 98765-4321",
  "email": "contato@barbearia.com",
  "endereco": "Rua das Flores, 123",
  "descricao": "Melhor barbearia da região",
  "horariosFuncionamento": "Segunda a Sexta: 9h - 18h",
  "usuario": {
    "nome": "João Silva",
    "email": "joao@barbearia.com",
    "role": "EMPRESA",
    "telefone": "(11) 98765-4321",
    "senha": "senha123",
    "dataNascimento": "1990-01-01T00:00:00.000Z",
    "fotoPerfil": "default-avatar.png"
  }
}
```

---

#### **3. Frontend Chama Server Action `createCompanyBilling`**

- **Arquivo:** `frontend/src/app/(public)/register-company/actions.ts`
- **Função:** `createCompanyBilling(payload)`
- **Método:** POST
- **Endpoint Backend:** `http://localhost:7777/payment/create-company-billing`

**Request:**

```http
POST /payment/create-company-billing
Content-Type: application/json

{
  "nomeFantasia": "Minha Barbearia",
  "cnpj": "12.345.678/0001-90",
  ...
}
```

---

#### **4. Backend Recebe e Processa a Solicitação**

- **Controller:** `api/src/payment/payment.controller.ts`
- **Método:** `createCompanyBilling(@Body() empresaData)`
- **Ações:**
  1. Valida dados recebidos
  2. Cria cobrança na AbacatePay via `abacatePayService.createBilling()`
  3. Armazena dados da empresa em memória (`pendingRegistrations.set(billingId, empresaData)`)

**Chamada à AbacatePay API:**

```http
POST https://api.abacatepay.com/billing
Authorization: Bearer abc_dev_sua-chave-aqui
Content-Type: application/json

{
  "frequency": "ONE_TIME",
  "methods": ["PIX"],
  "products": [
    {
      "externalId": "registro-empresa",
      "name": "Registro de Empresa - Barber Shop",
      "description": "Taxa de registro de nova empresa no sistema",
      "quantity": 1,
      "price": 100
    }
  ],
  "returnUrl": "http://localhost:3000/payment/waiting",
  "completionUrl": "http://localhost:3000/payment/waiting",
  "metadata": {
    "email": "contato@barbearia.com",
    "empresaNome": "Minha Barbearia",
    "tipo": "registro-empresa"
  }
}
```

**Response da AbacatePay:**

```json
{
  "data": {
    "id": "bill_abc123xyz",
    "url": "https://abacatepay.com/pay/bill_abc123xyz",
    "status": "PENDING",
    ...
  }
}
```

**Response do Backend para Frontend:**

```json
{
  "billingId": "bill_abc123xyz",
  "paymentUrl": "https://abacatepay.com/pay/bill_abc123xyz",
  "status": "PENDING"
}
```

---

#### **5. Frontend Salva Dados e Redireciona para Pagamento**

- **Ações:**
  1. Salva `billingId` no `sessionStorage`
  2. Salva dados da empresa (`payload`) no `sessionStorage` como backup
  3. Redireciona para `paymentUrl` da AbacatePay

```javascript
sessionStorage.setItem("pendingBillingId", "bill_abc123xyz");
sessionStorage.setItem("pendingCompanyData", JSON.stringify(payload));
window.location.href = "https://abacatepay.com/pay/bill_abc123xyz";
```

---

#### **6. Usuário Paga o PIX na AbacatePay**

- **URL:** `https://abacatepay.com/pay/bill_abc123xyz`
- **Ações do Usuário:**
  1. Copia código PIX ou escaneia QR Code
  2. Efetua pagamento de R$ 1,00
  3. Clica em "Retornar para página"

---

#### **7. AbacatePay Redireciona para `returnUrl`**

- **URL de Redirecionamento:** `http://localhost:3000/payment/waiting`
- **Componente:** `frontend/src/app/(public)/payment/waiting/page.tsx`
- **Ações:**
  1. Recupera `billingId` do `sessionStorage`
  2. Redireciona para `/payment/success?billingId=bill_abc123xyz`

---

#### **8. Página de Sucesso Inicia Verificação**

- **URL:** `http://localhost:3000/payment/success?billingId=bill_abc123xyz`
- **Componente:** `frontend/src/app/(public)/payment/success/page.tsx`
- **Ações:**
  1. Obtém `billingId` da URL ou `sessionStorage`
  2. Recupera dados da empresa do `sessionStorage`
  3. Chama `checkAndCreateCompany(billingId, empresaData)` (Server Action)

---

#### **9. Server Action Verifica e Cria Empresa**

- **Arquivo:** `frontend/src/app/(public)/register-company/actions.ts`
- **Função:** `checkAndCreateCompany(billingId, empresaData)`
- **Método:** POST
- **Endpoint Backend:** `http://localhost:7777/payment/check-and-create/bill_abc123xyz`

**Request:**

```http
POST /payment/check-and-create/bill_abc123xyz
Content-Type: application/json

{
  "nomeFantasia": "Minha Barbearia",
  "cnpj": "12.345.678/0001-90",
  ...
}
```

---

#### **10. Backend Verifica Pagamento e Cria Empresa**

- **Controller:** `api/src/payment/payment.controller.ts`
- **Método:** `checkPaymentAndCreateCompany(@Param('billingId'), @Body() empresaData?)`
- **Fluxo:**

**10.1. Consulta Status do Pagamento na AbacatePay**

```http
GET https://api.abacatepay.com/billing/list
Authorization: Bearer abc_dev_sua-chave-aqui
```

**Response da AbacatePay:**

```json
{
  "data": [
    {
      "id": "bill_abc123xyz",
      "status": "PAID",
      "paidAmount": 100,
      ...
    }
  ]
}
```

**10.2. Se Status = PENDING**

```json
{
  "success": false,
  "message": "Pagamento ainda não confirmado. Status: PENDING",
  "status": "PENDING"
}
```

→ Frontend faz polling (tenta novamente em 3 segundos)

**10.3. Se Status = PAID**

- Recupera dados da empresa (de `pendingRegistrations` ou do body)
- Chama `createEmpresaUseCase.execute(empresaData)`
- Cria empresa e usuário administrador no banco de dados
- Remove da memória (`pendingRegistrations.delete(billingId)`)

**Response de Sucesso:**

```json
{
  "success": true,
  "message": "Empresa criada com sucesso",
  "empresaId": 5,
  "status": "PAID"
}
```

**10.4. Se Empresa Já Existe (retry do polling)**

```json
{
  "success": true,
  "message": "Empresa já foi criada anteriormente. Você já pode fazer login.",
  "status": "PAID",
  "alreadyExists": true
}
```

---

#### **11. Frontend Recebe Confirmação e Redireciona**

- **Ações:**
  1. Exibe mensagem de sucesso
  2. Limpa `sessionStorage`
  3. Aguarda 3 segundos
  4. Redireciona para `/login`

---

#### **12. Usuário Faz Login**

- **URL:** `http://localhost:3000/login`
- **Credenciais:**
  - Email: `joao@barbearia.com`
  - Senha: `senha123`

---

## Endpoints da API

### Backend Payment Endpoints

| Método | Endpoint                               | Descrição                                   |
| ------ | -------------------------------------- | ------------------------------------------- |
| POST   | `/payment/create-company-billing`      | Cria cobrança na AbacatePay                 |
| POST   | `/payment/check-and-create/:billingId` | Verifica pagamento e cria empresa           |
| GET    | `/payment/billing/:billingId`          | Consulta status de uma cobrança             |
| POST   | `/payment/webhook`                     | Recebe notificação da AbacatePay (produção) |

### Frontend Server Actions

| Função                                           | Descrição                         |
| ------------------------------------------------ | --------------------------------- |
| `createCompanyBilling(empresaData)`              | Chama backend para criar billing  |
| `checkAndCreateCompany(billingId, empresaData?)` | Verifica pagamento e cria empresa |
| `checkPaymentStatus(billingId)`                  | Consulta apenas o status          |

---

## Testando a Integração

### 1. Inicie os Servidores

```bash
# Backend
cd api
npm run start:dev

# Frontend
cd frontend
npm run dev
```

### 2. Fluxo de Teste

1. ✅ Acesse: `http://localhost:3000/register-company`
2. ✅ Preencha o formulário com dados válidos
3. ✅ Clique em "Pagar R$ 1,00 e Registrar 🥑"
4. ✅ Será redirecionado para AbacatePay
5. ✅ Pague o PIX (modo teste - pagamento instantâneo)
6. ✅ Clique em "Retornar para página"
7. ✅ Aguarde a verificação automática (3-6 segundos)
8. ✅ Empresa criada! Será redirecionado para login
9. ✅ Faça login com as credenciais cadastradas

### 3. Verificação no Backend

Acompanhe os logs do backend para ver o fluxo:

```
[PaymentController] 🏢 Criando cobrança para empresa: Minha Barbearia
[AbacatePayService] ✅ Cobrança criada: bill_abc123xyz
[PaymentController] 💾 Dados armazenados em memória
[PaymentController] 🔍 Verificando pagamento: bill_abc123xyz
[PaymentController] 📌 Status do pagamento: PAID
[PaymentController] 💰 Pagamento confirmado! Criando empresa: Minha Barbearia
[PaymentController] ✅ Empresa criada com sucesso: 5
```

---

## Valores e Limitações

- **Valor Mínimo:** R$ 1,00 (100 centavos) - Exigência da AbacatePay
- **Métodos:** Apenas PIX (cartão desabilitado para a conta de teste)
- **Webhook:** Não funciona em `localhost` (usa polling como alternativa)
- **Polling:** Verifica status a cada 3 segundos até pagamento confirmado

---

## Modo de Teste da AbacatePay

Em modo de desenvolvimento (`devMode: true`), os pagamentos PIX são confirmados instantaneamente para facilitar testes.

**Consulte a documentação oficial:** https://docs.abacatepay.com/pages/testing

---

## Estrutura de Arquivos

### Backend

```
api/src/payment/
├── payment.controller.ts       # Endpoints de pagamento
├── payment.module.ts          # Módulo NestJS
├── abacatepay.service.ts      # Integração com AbacatePay API
└── interfaces/
    └── abacatepay.interface.ts # Tipos TypeScript
```

### Frontend

```
frontend/src/app/(public)/
├── register-company/
│   ├── page.tsx              # Formulário de registro
│   └── actions.ts            # Server Actions
└── payment/
    ├── success/page.tsx      # Verificação e criação
    └── waiting/page.tsx      # Redirecionamento intermediário
```

---

## Troubleshooting

### Problema: "Company already exists"

**Causa:** Polling fazendo múltiplas tentativas  
**Solução:** ✅ Já tratado no código - retorna sucesso se empresa já existe

### Problema: "Dados não encontrados"

**Causa:** Backend foi reiniciado após criar billing (dados em memória perdidos)  
**Solução:** ✅ Sistema agora envia dados via body como backup no `checkAndCreateCompany`

### Problema: "billingId undefined"

**Causa:** sessionStorage limpo ou expirado  
**Solução:** Refazer o registro completo

### Problema: Pagamento não confirmado

**Causa:** Pode estar em modo sandbox ou pagamento ainda processando  
**Solução:** Aguarde até 30 segundos - sistema faz polling automático

---

## Produção

Para deploy em produção:

1. Configure webhook real no dashboard da AbacatePay
2. Use API Key de produção
3. Ajuste valor do pagamento em `payment.controller.ts`
4. Configure CORS corretamente
5. Use HTTPS para todos os endpoints

---

**Documentação completa da AbacatePay:** https://docs.abacatepay.com
