import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Scissors, Clock, Star, Users } from 'lucide-react';

const featuredServices = [
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
  }
];

const testimonials = [
  {
    name: "João Silva",
    role: "Executivo de Marketing",
    content: "A assinatura VIP vale absolutamente a pena. Economizo dinheiro todos os meses e a reserva prioritária é um divisor de águas para minha agenda ocupada.",
    avatar: "/avatar.png"
  },
  {
    name: "Miguel Santos",
    role: "Desenvolvedor de Software",
    content: "Já estive em muitas barbearias, mas a atenção aos detalhes e o serviço personalizado aqui é incomparável. Meu lugar preferido para cuidados pessoais.",
    avatar: "/avatar.png"
  },
  {
    name: "David Oliveira",
    role: "Consultor Financeiro",
    content: "Desde que me juntei ao clube VIP, nunca mais tive um corte de cabelo ruim. A consistência e qualidade são impressionantes, e os benefícios extras tornam a decisão óbvia.",
    avatar: "/avatar.png"
  }
];

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-barber-dark text-white">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
          ></div>
          <div className="container mx-auto px-4 py-24 relative z-20">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Experiência de cuidados pessoais premium para o cavalheiro moderno
              </h1>
              <p className="text-xl mb-8 text-gray-200">
              Barbeiros especialistas, produtos premium e serviço excepcional. Junte-se ao nosso clube VIP para vantagens exclusivas e reservas prioritárias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/appointments">
                  <Button size="lg" className="bg-barber-gold hover:bg-barber-gold/90 text-black">
                    Agendar Horário
                  </Button>
                </Link>
                <Link to="/membership">
                  <Button size="lg" variant="outline" className="border-barber-black text-barber-gold hover:bg-barber-white/10">
                    Junte-se ao Clube VIP
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Por Que Escolher Barba VIP</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 card-hover">
                <CardContent className="p-0 pt-6">
                  <div className="mx-auto w-16 h-16 bg-barber-gold/10 rounded-full flex items-center justify-center mb-4">
                    <Scissors size={28} className="text-barber-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Barbeiros Especialistas</h3>
                  <p className="text-muted-foreground">
                    Nossos barbeiros qualificados trazem anos de experiência e paixão para cada corte.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 card-hover">
                <CardContent className="p-0 pt-6">
                  <div className="mx-auto w-16 h-16 bg-barber-gold/10 rounded-full flex items-center justify-center mb-4">
                    <Star size={28} className="text-barber-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Produtos Premium</h3>
                  <p className="text-muted-foreground">
                    Utilizamos apenas os melhores produtos para resultados excepcionais.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 card-hover">
                <CardContent className="p-0 pt-6">
                  <div className="mx-auto w-16 h-16 bg-barber-gold/10 rounded-full flex items-center justify-center mb-4">
                    <Clock size={28} className="text-barber-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Serviço Eficiente</h3>
                  <p className="text-muted-foreground">
                    Respeito pelo seu tempo com agendamentos pontuais e eficientes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 card-hover">
                <CardContent className="p-0 pt-6">
                  <div className="mx-auto w-16 h-16 bg-barber-gold/10 rounded-full flex items-center justify-center mb-4">
                    <Users size={28} className="text-barber-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Experiência VIP</h3>
                  <p className="text-muted-foreground">
                    Benefícios exclusivos para membros e abordagem personalizada.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossos Serviços Premium</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Descubra nossa gama de serviços especializados projetados para manter seu visual impecável.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/services">
                <Button variant="outline" className="border-barber-brown text-barber-brown hover:bg-barber-brown hover:text-white">
                  Ver Todos os Serviços
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* VIP Club CTA */}
        <section className="py-20 bg-barber-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Junte-se ao Nosso Clube VIP</h2>
              <p className="text-xl mb-8">
                Torne-se um membro e desfrute de benefícios exclusivos como descontos em serviços, 
                agendamento prioritário, produtos gratuitos e muito mais.
              </p>
              <Link to="/membership">
                <Button size="lg" className="bg-barber-gold hover:bg-barber-gold/90 text-black">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">O Que Nossos Clientes Dizem</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground">"{testimonial.content}"</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Booking CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para um Novo Visual?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende seu horário hoje e experimente a diferença Barba VIP.
            </p>
            <Link to="/appointments">
              <Button size="lg" className="bg-barber-gold hover:bg-barber-gold/90 text-black">
                Agendar seu Horário
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
