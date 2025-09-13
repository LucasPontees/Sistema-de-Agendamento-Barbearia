import React from "react";
import { api } from "@/http/api";
import { z } from "zod";
import Link from "next/link";

// schema de validação
export const empresaSchema = z.object({
  id: z.number(),
  nomeFantasia: z.string(),
  cnpj: z.string(),
  telefone: z.string(),
  email: z.string(),
  endereco: z.string(),
  descricao: z.string(),
  logo: z.string(),
  horariosFuncionamento: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const empresasSchema = z.array(empresaSchema);

export async function getEmpresas() {
  const data = await api.get("empresa").json();
  return empresasSchema.parse(data);
}

type Empresa = {
  id: number;
  nome: string;
  cnpj: string;
};

export default async function Services() {
  const empresas = await getEmpresas();
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
                    href={`/empresa/${empresa.id}`} // página da empresa
                    className="block p-6 bg-white shadow-md rounded-2xl border hover:shadow-xl transition cursor-pointer"
                  >
                    <h2 className="text-lg font-bold mb-2">
                      {empresa.nomeFantasia}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Telefone: {empresa.telefone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Descrição: {empresa.descricao}
                    </p>
                    <p className="text-sm text-gray-600">
                      Endereço: {empresa.endereco}
                    </p>
                    <p className="text-sm text-gray-600">
                      Horário de funcionamento: {empresa.horariosFuncionamento}
                    </p>
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
