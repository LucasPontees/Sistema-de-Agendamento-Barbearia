"use client";
import React, { useState } from "react";

import AppointmentForm from "@/components/AppointmentForm";

const Appointments: React.FC = () => {
  // Estado para controlar o modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Agende seu Horário</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Agende sua próxima visita com nossos barbeiros especialistas.
              Escolha seu serviço preferido, barbeiro, data e horário para uma
              experiência de cuidado personalizado.
            </p>
          </div>

          {/* Botão para abrir o modal */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                setSelectedService("Corte de Cabelo"); // 👈 exemplo de serviço inicial
                setOpenModal(true);
              }}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition"
            >
              Agendar Agora
            </button>
          </div>

          <AppointmentForm
            open={openModal}
            onOpenChange={setOpenModal}
            initialService={selectedService}
          />
        </div>
      </main>
    </div>
  );
};

export default Appointments;
