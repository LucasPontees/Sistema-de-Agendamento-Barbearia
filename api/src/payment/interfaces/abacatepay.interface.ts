export interface AbacatePayCustomer {
  id: string;
  metadata: {
    email: string;
    [key: string]: any;
  };
}

export interface AbacatePayBilling {
  id: string;
  url: string;
  amount: number;
  status: "PENDING" | "PAID" | "CANCELLED" | "REFUNDED";
  devMode: boolean;
  methods: ("PIX" | "CARD")[];
  frequency: "ONE_TIME" | "MONTHLY" | "YEARLY";
  nextBilling?: string | null;
  customer?: AbacatePayCustomer;
  metadata?: {
    fee?: number;
    returnUrl?: string;
    completionUrl?: string;
    metadata?: {
      email?: string;
      empresaNome?: string;
      tipo?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  products?: Array<{
    id: string;
    externalId: string;
    quantity: number;
    price: number;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface AbacatePayResponse<T> {
  data: T | null;
  error: string | null;
}

export interface CreateBillingDto {
  amount: number; // Valor em centavos (10 = R$ 0,10)
  methods?: ("PIX" | "CARD")[];
  frequency?: "ONE_TIME" | "MONTHLY" | "YEARLY";
  customerId?: string;
  metadata?: {
    email: string;
    empresaNome?: string;
    [key: string]: any;
  };
}

export interface WebhookPayload {
  id: string;
  kind: "billing.paid" | "billing.cancelled" | "billing.refunded";
  createdAt: string;
  data: {
    id: string;
    status: string;
    amount: number;
    customer: {
      id: string;
      metadata: {
        email: string;
        [key: string]: any;
      };
    };
    metadata?: {
      [key: string]: any;
    };
  };
}
