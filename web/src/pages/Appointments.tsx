
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';

const Appointments: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Agende seu Horário</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Agende sua próxima visita com nossos barbeiros especialistas. Escolha seu serviço preferido,
              barbeiro, data e horário para uma experiência de cuidado personalizado.
            </p>
          </div>
          
          <AppointmentForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Appointments;
