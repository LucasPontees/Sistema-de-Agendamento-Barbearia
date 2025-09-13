import { IsEnum } from "class-validator";
import { StatusAgendamento } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class AtualizaStatusAgendamentoDto {
  @IsEnum(StatusAgendamento, {
    message: "Ação deve ser CONFIRMADO, CANCELADO ou REJEITADO",
  })
  @ApiProperty({
    description: "Ação do agendamento",
    example: "CONFIRMADO",
  })
  acao: Exclude<StatusAgendamento, "PENDENTE" | "CONCLUIDO">;
}
