import React from "react";
import { api } from "@/http/api";
import { z } from "zod";
import Link from "next/link";

// schema de validação com Zod
export const empresaSchema = z.object({
  id: z.number(),
  nomeFantasia: z.string(),
  cnpj: z.string(),
  telefone: z.string(),
  email: z.string(),
  endereco: z.string(),
  descricao: z.string().nullable(), // pode ser nulo
  logo: z.string().nullable(),
  horariosFuncionamento: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const empresasSchema = z.array(empresaSchema);

// Função para buscar empresas da API
export async function getEmpresas() {
  const data = await api.get("empresa").json();
  return empresasSchema.parse(data);
}

// Usamos o infer do Zod para tipar automaticamente
export type Empresa = z.infer<typeof empresaSchema>;

export default async function Services() {
  const empresas: Empresa[] = await getEmpresas();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-barber-dark text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Nossas Barbearias</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Descubra serviços premium de cuidados pessoais, adaptados para
              atender às necessidades do cavalheiro moderno.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {empresas.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Nenhuma empresa cadastrada.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {empresas.map((empresa) => (
                  <Link
                    key={empresa.id}
                    href={`empresa/${empresa.id}`} // leva para a página da empresa
                    className="block p-6 bg-white shadow-md rounded-2xl border hover:shadow-xl transition cursor-pointer"
                  >
                    <h2 className="text-lg font-bold mb-2">
                      {empresa.nomeFantasia}
                    </h2>
                    {empresa.descricao && (
                      <p className="text-sm text-gray-600">
                        {empresa.descricao}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Telefone: {empresa.telefone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Endereço: {empresa.endereco}
                    </p>
                    {empresa.horariosFuncionamento && (
                      <p className="text-sm text-gray-600">
                        Horário: {empresa.horariosFuncionamento}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
