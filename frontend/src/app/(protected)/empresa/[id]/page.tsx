import { z } from "zod";
import { api } from "@/http/api";
import ServicesListClient from "../EmpresaServerPage";

export const empresaSchema = z.object({
  id: z.number(),
  nomeFantasia: z.string(),
  cnpj: z.string(),
  telefone: z.string(),
  email: z.string(),
  endereco: z.string(),
  descricao: z.string().nullable(),
  logo: z.string().nullable(),
  horariosFuncionamento: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Empresa = z.infer<typeof empresaSchema>;

export const servicoSchema = z.object({
  id: z.number(),
  nome: z.string(),
  descricao: z.string(),
  duracaoMin: z.number(),
  preco: z.number(),
  empresaId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Servico = z.infer<typeof servicoSchema>;
export const servicosSchema = z.array(servicoSchema);

async function getEmpresaById(id: number): Promise<Empresa> {
  const data = await api.get(`empresa/${id}`).json();
  return empresaSchema.parse(data);
}

async function getServicosByEmpresaId(empresaId: number): Promise<Servico[]> {
  const data = await api
    .get("servico-barbearia", { searchParams: { empresaID: empresaId } })
    .json();
  return servicosSchema.parse(data);
}

type EmpresaPageProps = {
  params: { id: string };
};

export default async function EmpresaPage({ params }: EmpresaPageProps) {
  const empresaId = Number(params.id);
  const empresa = await getEmpresaById(empresaId);
  const servicos = await getServicosByEmpresaId(empresaId);

  return <ServicesListClient empresa={empresa} servicos={servicos} />;
}
