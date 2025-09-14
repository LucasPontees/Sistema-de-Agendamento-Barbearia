"use client";

import { useState } from "react";
import { Empresa, Servico } from "./[id]/page";
import AppointmentForm from "@/components/AppointmentForm";

type Props = {
  empresa: Empresa;
  servicos: Servico[];
};

export default function ServicesListClient({ empresa, servicos }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Servico | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Header Empresa */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{empresa.nomeFantasia}</h1>
          {empresa.descricao && (
            <p className="text-gray-700 mb-2">{empresa.descricao}</p>
          )}
          <p className="text-gray-500 mb-2">Telefone: {empresa.telefone}</p>
          <p className="text-gray-500 mb-2">Endereço: {empresa.endereco}</p>
          {empresa.horariosFuncionamento && (
            <p className="text-gray-500 mb-2">
              Horário: {empresa.horariosFuncionamento}
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
                  onClick={() => {
                    setSelectedService(servico);
                    setOpenModal(true);
                  }}
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

        {/* Modal de agendamento */}
        <AppointmentForm
          open={openModal}
          onOpenChange={setOpenModal}
          initialService={selectedService?.nome ?? undefined}
        />
      </main>
    </div>
  );
}
