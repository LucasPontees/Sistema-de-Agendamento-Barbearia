# Configuração da AbacatePay 🥑

## Passo 1: Obter API Key

1. Acesse: https://dashboard.abacatepay.com
2. Faça login ou crie uma conta
3. Vá em **Configurações** → **API Keys**
4. Copie sua chave de desenvolvimento

## Passo 2: Adicionar no arquivo .env

Adicione a seguinte variável no arquivo `api/.env`:

```env
ABACATEPAY_API_KEY=sua-chave-aqui
```

## Passo 3: Configurar Webhook

Para receber notificações de pagamento confirmado:

1. No dashboard da AbacatePay, vá em **Webhooks**
2. Adicione a URL do webhook:

   ```
   https://seu-dominio.com/payment/webhook
   ```

   Para desenvolvimento local (use ngrok):

   ```
   https://seu-ngrok-url.ngrok.io/payment/webhook
   ```

3. Selecione o evento: **billing.paid**

## Variáveis Necessárias no .env

```env
# AbacatePay
ABACATEPAY_API_KEY=sua-chave-aqui

# Frontend URL (para redirects após pagamento)
FRONTEND_URL=http://localhost:3000

# JWT Secret
JWT_SECRET=seu-secret-aqui

# Database
DATABASE_URL=postgresql://...
```

## Testando a Integração

1. Acesse: `http://localhost:3000/register-company`
2. Preencha o formulário
3. Clique em "Pagar R$ 0,10 e Registrar 🥑"
4. Você será redirecionado para a página de pagamento da AbacatePay
5. Complete o pagamento (PIX ou Cartão de teste)
6. Após confirmação, a empresa será criada automaticamente

## Valores

- **Desenvolvimento:** R$ 1,00 (100 centavos) - Valor mínimo da AbacatePay
- **Produção:** Ajuste no arquivo `payment.controller.ts` linha 47

**Nota:** A AbacatePay exige um valor mínimo de R$ 1,00 (100 centavos)

## Cartões de Teste (Modo Desenvolvimento)

A AbacatePay fornece cartões de teste para desenvolvimento.
Consulte: https://docs.abacatepay.com/pages/testing
