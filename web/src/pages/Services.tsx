import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    title: "Corte Clássico",
    description: "Corte preciso com modelagem especializada e finalização com toalha quente.",
    price: 25,
    image: "/model-barber.svg",
    duration: 30,
    slug: "haircut"
  },
  {
    title: "Aparo de Barba",
    description: "Modelagem e estilização da sua barba para um visual limpo e definido.",
    price: 15,
    image: "/model-barber.svg",
    duration: 15,
    slug: "beard-trim"
  },
  {
    title: "Combo Corte & Barba",
    description: "Pacote completo de cuidados para o cavalheiro moderno.",
    price: 35,
    image: "/model-barber.svg",
    duration: 45,
    slug: "haircut-beard"
  },
  {
    title: "Barbear com Toalha Quente",
    description: "Barbear tradicional com navalha e tratamento com toalha quente.",
    price: 30,
    image: "/model-barber.svg",
    duration: 30,
    slug: "hot-towel"
  },
  {
    title: "Coloração",
    description: "Aplicação profissional de cor para cobrir os grisalhos ou mudar seu visual.",
    price: 50,
    image: "/model-barber.svg",
    duration: 60,
    slug: "hair-color"
  },
  {
    title: "Tratamento Facial Masculino",
    description: "Tratamento facial rejuvenescedor projetado especificamente para a pele masculina.",
    price: 40,
    image: "/model-barber.svg",
    duration: 30,
    slug: "facial"
  },
  {
    title: "Raspagem de Cabeça",
    description: "Raspagem limpa da cabeça com navalha e tratamento pós-barba suavizante.",
    price: 35,
    image: "/model-barber.svg",
    duration: 30,
    slug: "head-shave"
  },
  {
    title: "Corte Infantil",
    description: "Cortes suaves para jovens cavalheiros menores de 12 anos.",
    price: 20,
    image: "/model-barber.svg",
    duration: 20,
    slug: "kids-haircut"
  }
];

const Services: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-barber-dark text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Descubra nossos serviços premium de cuidados pessoais, adaptados para atender às necessidades do cavalheiro moderno.
            </p>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Additional Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Informações sobre Serviços</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Membros do Clube VIP</h3>
                  <p className="text-muted-foreground">
                    Como membro do Clube VIP, você desfruta de descontos especiais em todos os nossos serviços.
                    Membros Standard recebem 10% de desconto, membros Premium 20% de desconto e membros Executive 30% de desconto.
                    Saiba mais sobre nossas opções de assinatura em nossa <a href="/membership" className="text-barber-gold hover:underline">página de Membros</a>.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reservas em Grupo</h3>
                  <p className="text-muted-foreground">
                    Planejando um evento especial ou sessão de cuidados em grupo? Oferecemos tarifas especiais para grupos
                    de 4 ou mais pessoas. Entre em contato diretamente conosco para organizar reservas em grupo para casamentos, eventos corporativos,
                    ou outras ocasiões especiais.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Serviços Personalizados</h3>
                  <p className="text-muted-foreground">
                    Não encontrou exatamente o que está procurando? Nossos barbeiros qualificados podem fornecer serviços personalizados
                    adaptados às suas necessidades específicas. Por favor, discuta seus requisitos ao fazer seu agendamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-barber-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Pronto para Agendar seu Serviço?</h2>
            <p className="mb-6">
              Agende seu horário agora e experimente cuidados premium na Barba VIP.
            </p>
            <a href="/appointments" className="inline-block bg-barber-gold hover:bg-barber-gold/90 text-black px-6 py-3 rounded-md font-semibold">
              Agendar Horário
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
