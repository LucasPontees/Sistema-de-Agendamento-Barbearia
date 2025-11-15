import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AbacatePayService } from "./abacatepay.service";
import { CreateEmpresaUseCase } from "@/empresa/create-empresa.usecase";
import { WebhookPayload } from "./interfaces/abacatepay.interface";

@ApiTags("payment")
@Controller("payment")
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  private readonly pendingRegistrations = new Map<string, any>(); // Temporário: armazena dados da empresa aguardando pagamento

  constructor(
    private readonly abacatePayService: AbacatePayService,
    private readonly createEmpresaUseCase: CreateEmpresaUseCase
  ) {}

  /**
   * Cria uma cobrança para registro de empresa
   * Armazena os dados da empresa temporariamente até confirmação do pagamento
   */
  @Post("create-company-billing")
  @ApiOperation({ summary: "Cria cobrança para registro de empresa" })
  @ApiResponse({
    status: 201,
    description: "Cobrança criada com sucesso",
  })
  async createCompanyBilling(@Body() empresaData: any) {
    try {
      this.logger.log(
        `Criando cobrança para empresa: ${empresaData.nomeFantasia}`
      );

      // Cria cobrança de R$ 1,00 (100 centavos) - valor mínimo da AbacatePay
      const billing = await this.abacatePayService.createBilling({
        amount: 100, // R$ 1,00 (valor mínimo aceito)
        methods: ["PIX"], // Apenas PIX (Cartão não habilitado na conta)
        frequency: "ONE_TIME",
        metadata: {
          email: empresaData.email,
          empresaNome: empresaData.nomeFantasia,
          tipo: "registro-empresa",
        },
      });

      if (billing.error || !billing.data) {
        throw new BadRequestException(
          billing.error || "Erro ao criar cobrança"
        );
      }

      // Armazena dados da empresa temporariamente
      this.pendingRegistrations.set(billing.data.id, empresaData);

      this.logger.log(
        `✅ Cobrança criada: ${billing.data.id} | URL: ${billing.data.url}`
      );

      return {
        success: true,
        billingId: billing.data.id,
        paymentUrl: billing.data.url,
        amount: billing.data.amount,
        status: billing.data.status,
      };
    } catch (error) {
      this.logger.error("❌ Erro ao criar cobrança:", error);
      throw error;
    }
  }

  /**
   * Consulta status de uma cobrança
   */
  @Get("billing/:id")
  @ApiOperation({ summary: "Consulta status de uma cobrança" })
  async getBillingStatus(@Param("id") billingId: string) {
    const billing = await this.abacatePayService.getBilling(billingId);

    if (billing.error || !billing.data) {
      throw new BadRequestException(billing.error || "Cobrança não encontrada");
    }

    return {
      id: billing.data.id,
      status: billing.data.status,
      amount: billing.data.amount,
      url: billing.data.url,
    };
  }

  /**
   * Webhook da AbacatePay
   * Recebe notificações de pagamentos confirmados
   */
  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Webhook para notificações da AbacatePay" })
  async handleWebhook(
    @Headers("x-abacatepay-signature") signature: string,
    @Body() payload: WebhookPayload
  ) {
    this.logger.log(`📨 Webhook recebido: ${payload.kind}`);

    // Valida assinatura do webhook
    const isValid = this.abacatePayService.validateWebhookSignature(
      signature,
      JSON.stringify(payload)
    );

    if (!isValid) {
      this.logger.error("❌ Assinatura do webhook inválida");
      throw new BadRequestException("Assinatura inválida");
    }

    // Processa apenas pagamentos confirmados
    if (payload.kind === "billing.paid") {
      const billingId = payload.data.id;
      const empresaData = this.pendingRegistrations.get(billingId);

      if (!empresaData) {
        this.logger.warn(
          `⚠️  Dados da empresa não encontrados para cobrança: ${billingId}`
        );
        return { received: true, message: "Dados não encontrados" };
      }

      try {
        this.logger.log(
          `💰 Pagamento confirmado! Criando empresa: ${empresaData.nomeFantasia}`
        );

        // Cria a empresa no banco de dados
        const empresa = await this.createEmpresaUseCase.execute(empresaData);

        // Remove dos registros pendentes
        this.pendingRegistrations.delete(billingId);

        this.logger.log(`✅ Empresa criada com sucesso: ${empresa.id}`);

        // TODO: Enviar email de confirmação com credenciais

        return {
          received: true,
          message: "Empresa criada com sucesso",
          empresaId: empresa.id,
        };
      } catch (error) {
        this.logger.error("❌ Erro ao criar empresa após pagamento:", error);
        // Mantém os dados para retry manual
        return {
          received: true,
          message: "Erro ao criar empresa, será reprocessado",
        };
      }
    }

    return { received: true };
  }

  /**
   * Lista registros pendentes (para debug)
   */
  @Get("pending")
  @ApiOperation({ summary: "Lista registros pendentes de pagamento (DEBUG)" })
  getPendingRegistrations() {
    return {
      count: this.pendingRegistrations.size,
      billingIds: Array.from(this.pendingRegistrations.keys()),
    };
  }

  /**
   * Verifica pagamento e cria empresa manualmente (para testes sem webhook)
   * Aceita dados da empresa via body caso o servidor tenha reiniciado
   */
  @Post("check-and-create/:billingId")
  @ApiOperation({
    summary: "Verifica pagamento e cria empresa (para testes locais)",
  })
  async checkPaymentAndCreateCompany(
    @Param("billingId") billingId: string,
    @Body() empresaData?: any
  ) {
    try {
      this.logger.log(`🔍 Verificando pagamento: ${billingId}`);

      // Busca status do pagamento na AbacatePay
      const billing = await this.abacatePayService.getBilling(billingId);

      this.logger.log(`📊 Resposta da AbacatePay:`, JSON.stringify(billing));

      if (billing.error) {
        this.logger.error(`❌ Erro na AbacatePay: ${billing.error}`);
        return {
          success: false,
          message: `Erro ao consultar pagamento: ${billing.error}`,
          status: "ERROR",
        };
      }

      if (!billing.data) {
        this.logger.error(`❌ Cobrança não encontrada: ${billingId}`);
        return {
          success: false,
          message: "Cobrança não encontrada na AbacatePay",
          status: "NOT_FOUND",
        };
      }

      this.logger.log(`📌 Status do pagamento: ${billing.data.status}`);

      // Se pagamento confirmado, cria empresa
      if (billing.data.status === "PAID") {
        // Tenta pegar dados da memória ou do body
        let dataToUse = this.pendingRegistrations.get(billingId) || empresaData;

        // Se tem dados no body mas não está mais na memória,
        // recria a partir dos metadados da cobrança
        if (!dataToUse && billing.data.metadata?.metadata) {
          this.logger.log(
            `🔄 Reconstruindo dados da empresa a partir dos metadados`
          );

          const metadata = billing.data.metadata.metadata;

          // Verifica se é um registro de empresa
          if (metadata.tipo === "registro-empresa") {
            return {
              success: false,
              message:
                "Pagamento confirmado, mas dados da empresa foram perdidos. Entre em contato com o suporte informando o billingId.",
              status: billing.data.status,
              billingId,
              empresaNome: metadata.empresaNome,
              email: metadata.email,
            };
          }
        }

        if (!dataToUse) {
          this.logger.warn(
            `⚠️  Dados da empresa não encontrados para: ${billingId}`
          );
          return {
            success: false,
            message:
              "Dados da empresa não encontrados (pode já ter sido criada ou servidor foi reiniciado)",
            status: billing.data.status,
            hint: "Se o pagamento foi feito, tente reenviar os dados da empresa via POST body",
          };
        }

        this.logger.log(
          `💰 Pagamento confirmado! Criando empresa: ${dataToUse.nomeFantasia}`
        );

        // Cria a empresa
        const empresa = await this.createEmpresaUseCase.execute(dataToUse);

        // Remove dos registros pendentes
        this.pendingRegistrations.delete(billingId);

        this.logger.log(`✅ Empresa criada com sucesso: ${empresa.id}`);

        return {
          success: true,
          message: "Empresa criada com sucesso",
          empresaId: empresa.id,
          status: billing.data.status,
        };
      }

      return {
        success: false,
        message: `Pagamento ainda não confirmado. Status: ${billing.data.status}`,
        status: billing.data.status,
      };
    } catch (error) {
      this.logger.error("❌ Erro ao verificar e criar empresa:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Erro desconhecido",
        status: "ERROR",
      };
    }
  }
}
