import { notFound } from "next/navigation";
import { z } from "zod";
import { api } from "@/http/api";
import { da } from "zod/v4/locales";

// =========================
// Schema Empresa
// =========================
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

// =========================
// Schema Serviço
// =========================
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
export const servicosSchema = z.array(servicoSchema);
export type Servico = z.infer<typeof servicoSchema>;

// =========================
// Funções tipadas
// =========================
export async function getEmpresaById(id: number): Promise<Empresa> {
  const data = await api.get(`empresa/${id}`).json();
  console.log("listando data:", data);
  return empresaSchema.parse(data);
}

export async function getServicosByEmpresaId(id: number): Promise<Servico[]> {
  const data = await api.get(`servico/empresa/${id}`).json();
  return servicosSchema.parse(data);
}

// =========================
// Página
// =========================
type EmpresaPageProps = {
  params: Promise<{ id: string }>; // 👈 precisa ser Promise
};

export default async function EmpresaPage({ params }: EmpresaPageProps) {
  const { id } = await params; // 👈 await antes de usar
  const empresaId = Number(id);

  // Busca a empresa
  const empresa = await getEmpresaById(empresaId).catch(() => null);
  console.log("listando empresa:", empresa);
  // if (!empresa) return notFound();

  // Busca serviços
  const servicos = await getServicosByEmpresaId(empresaId).catch(() => []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Header Empresa */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{empresa?.nomeFantasia}</h1>
          {empresa?.descricao && (
            <p className="text-gray-700 mb-2">{empresa.descricao}</p>
          )}
          <p className="text-gray-500 mb-2">Telefone: {empresa?.telefone}</p>
          <p className="text-gray-500 mb-2">Endereço: {empresa?.endereco}</p>
          {empresa?.horariosFuncionamento && (
            <p className="text-gray-500 mb-2">
              Horário: {empresa?.horariosFuncionamento}
            </p>
          )}
        </section>

        {/* Serviços */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Serviços Disponíveis</h2>
          {servicos.length === 0 ? (
            <p>Nenhum serviço disponível.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicos.map((servico) => (
                <div
                  key={servico.id}
                  className="p-6 bg-white shadow-md rounded-2xl border hover:shadow-xl transition cursor-pointer"
                >
                  <h3 className="text-lg font-semibold mb-2">{servico.nome}</h3>
                  <p className="text-gray-600 mb-2">{servico.descricao}</p>
                  <p className="text-gray-600 mb-2">
                    Duração: {servico.duracaoMin} min
                  </p>
                  <p className="text-gray-600 font-bold">
                    Preço: R$ {servico.preco}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
