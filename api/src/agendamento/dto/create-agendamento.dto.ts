import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateAgendamentoDto {
  @ApiProperty({ description: "ID do usuário", example: "1" })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ description: "ID do barbeiro", example: "1" })
  @IsInt()
  @IsOptional()
  barbeiroId: number;

  @ApiProperty({ description: "ID do serviço", example: "1" })
  @IsInt()
  servicoId: number;

  @ApiProperty({ description: "ID da empresa", example: "1" })
  @IsInt()
  empresaId: number;

  @ApiProperty({
    description: "Data e hora do agendamento",
    example: "2023-10-10T14:30:00Z",
    type: String,
  })
  dataHora: Date;

  status: string;

  @IsString()
  @ApiProperty({
    description: "Observações adicionais para o agendamento",
    example: "Observação 1\nObservação 2",
  })
  observacoes?: string;
}
