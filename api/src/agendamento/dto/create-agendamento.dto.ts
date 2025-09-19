import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAgendamentoDto {
  @ApiProperty({
    example: "2023-10-15T14:30:00Z",
    description: "Data e hora do agendamento",
  })
  @IsDateString()
  dataHora: string;

  @ApiProperty({
    example: "1",
    description: "ID da empresa onde o agendamento será realizado",
  })
  @IsInt()
  empresaId: number;

  @ApiProperty({
    example: "1",
    description: "ID do serviço a ser realizado",
  })
  @IsInt()
  servicoId: number;

  @ApiProperty({
    example: "1",
    description: "ID do barbeiro a ser contratado",
  })
  @IsOptional()
  @IsInt()
  barbeiroId?: number;

  @ApiProperty({
    example: "Observações do agendamento",
    description: "Observações do agendamento",
  })
  @IsOptional()
  @IsString()
  observacoes?: string;
}
