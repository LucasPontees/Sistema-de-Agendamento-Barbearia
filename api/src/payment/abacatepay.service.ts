import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance } from "axios";
import {
  AbacatePayResponse,
  AbacatePayBilling,
  CreateBillingDto,
} from "./interfaces/abacatepay.interface";

@Injectable()
export class AbacatePayService {
  private readonly logger = new Logger(AbacatePayService.name);
  private readonly client: AxiosInstance;
  private readonly apiKey: string;
  private readonly frontendUrl: string;
  private readonly baseUrl = "https://api.abacatepay.com/v1";

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>("ABACATEPAY_API_KEY") || "";
    this.frontendUrl =
      this.configService.get<string>("FRONTEND_URL") || "http://localhost:3000";

    if (!this.apiKey) {
      this.logger.warn(
        "⚠️  ABACATEPAY_API_KEY não configurada! Adicione no arquivo .env"
      );
    }

    // Voltando para Axios (SDK tem problemas)
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });

    this.logger.log("✅ AbacatePay Service inicializado (Axios)");
  }

  /**
   * Cria uma cobrança na AbacatePay
   * @param data Dados da cobrança
   * @returns Resposta com dados da cobrança ou erro
   */
  async createBilling(
    data: CreateBillingDto
  ): Promise<AbacatePayResponse<AbacatePayBilling>> {
    try {
      this.logger.log(`Criando cobrança: R$ ${(data.amount / 100).toFixed(2)}`);

      const returnUrl = `${this.frontendUrl}/payment/waiting`;
      const completionUrl = `${this.frontendUrl}/payment/waiting`;

      this.logger.log(`🔗 returnUrl configurado: ${returnUrl}`);
      this.logger.log(`🔗 completionUrl configurado: ${completionUrl}`);

      const payload = {
        frequency: "ONE_TIME",
        methods: ["PIX"], // Apenas PIX
        products: [
          {
            externalId: "registro-empresa",
            name: "Registro de Empresa - Barber Shop",
            description: "Taxa de registro de nova empresa no sistema",
            quantity: 1,
            price: data.amount,
          },
        ],
        returnUrl,
        completionUrl,
        metadata: data.metadata || {},
      };

      this.logger.log(`📦 Payload completo:`, JSON.stringify(payload, null, 2));

      const response = await this.client.post("/billing/create", payload);

      this.logger.log(`✅ Cobrança criada: ${response.data.data?.id}`);
      this.logger.log(`📋 URL pagamento: ${response.data.data?.url}`);

      return response.data as AbacatePayResponse<AbacatePayBilling>;
    } catch (error: any) {
      this.logger.error(
        "❌ Erro ao criar cobrança:",
        error.response?.data || error.message
      );
      return {
        data: null,
        error:
          error.response?.data?.error ||
          error.message ||
          "Erro ao criar cobrança no gateway",
      };
    }
  }

  /**
   * Busca informações de uma cobrança específica
   * @param billingId ID da cobrança
   * @returns Dados da cobrança ou erro
   */
  async getBilling(
    billingId: string
  ): Promise<AbacatePayResponse<AbacatePayBilling>> {
    try {
      this.logger.log(`Buscando cobrança: ${billingId}`);

      // Lista todas as cobranças e filtra
      const response = await this.client.get("/billing/list");

      if (!response.data?.data || !Array.isArray(response.data.data)) {
        this.logger.error("❌ Resposta inválida da API");
        return {
          data: null,
          error: "Resposta inválida da API",
        };
      }

      const billing = response.data.data.find(
        (b: AbacatePayBilling) => b.id === billingId
      );

      if (!billing) {
        this.logger.warn(`⚠️  Cobrança não encontrada: ${billingId}`);
        return {
          data: null,
          error: "Cobrança não encontrada",
        };
      }

      this.logger.log(`✅ Cobrança encontrada: ${billing.status}`);

      return {
        data: billing,
        error: null,
      };
    } catch (error: any) {
      this.logger.error(
        "❌ Erro ao buscar cobrança:",
        error.response?.data || error.message
      );
      return {
        data: null,
        error:
          error.response?.data?.error ||
          error.message ||
          "Erro ao buscar cobrança",
      };
    }
  }

  /**
   * Cancela uma cobrança pendente
   * @param billingId ID da cobrança
   * @returns Sucesso ou erro
   * @deprecated O SDK atual não suporta cancelamento direto
   */
  async cancelBilling(billingId: string): Promise<AbacatePayResponse<boolean>> {
    this.logger.warn(
      `⚠️  Cancelamento de cobrança não implementado no SDK: ${billingId}`
    );
    return {
      data: null,
      error: "Cancelamento não suportado pelo SDK atual",
    };
  }

  /**
   * Valida assinatura do webhook
   * @param signature Assinatura recebida no header
   * @param payload Corpo da requisição
   * @returns true se válido, false caso contrário
   */
  validateWebhookSignature(signature: string, payload: string): boolean {
    // A AbacatePay usa HMAC SHA256 para assinar webhooks
    // Por enquanto retorna true, mas implemente a validação real
    this.logger.warn("⚠️  Validação de assinatura do webhook não implementada");
    return true;
  }
}
