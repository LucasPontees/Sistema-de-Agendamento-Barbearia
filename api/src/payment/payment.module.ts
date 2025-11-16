import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AbacatePayService } from "./abacatepay.service";
import { PaymentController } from "./payment.controller";
import { EmpresaModule } from "@/empresa/empresa.module";

@Module({
  imports: [ConfigModule, EmpresaModule],
  controllers: [PaymentController],
  providers: [AbacatePayService],
  exports: [AbacatePayService],
})
export class PaymentModule {}
