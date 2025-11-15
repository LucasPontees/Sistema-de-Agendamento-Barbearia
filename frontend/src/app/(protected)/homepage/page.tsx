import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import { Star } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const testimonials = [
  {
    name: "João Silva",
    role: "Executivo de Marketing",
    content:
      "A assinatura VIP vale absolutamente a pena. Economizo dinheiro todos os meses e a reserva prioritária é um divisor de águas para minha agenda ocupada.",
    avatar: "/avatar.png",
  },
  {
    name: "Miguel Santos",
    role: "Desenvolvedor de Software",
    content:
      "Já estive em muitas barbearias, mas a atenção aos detalhes e o serviço personalizado aqui é incomparável. Meu lugar preferido para cuidados pessoais.",
    avatar: "/avatar.png",
  },
  {
    name: "David Oliveira",
    role: "Consultor Financeiro",
    content:
      "Desde que me juntei ao clube VIP, nunca mais tive um corte de cabelo ruim. A consistência e qualidade são impressionantes, e os benefícios extras tornam a decisão óbvia.",
    avatar: "/avatar.png",
  },
];

async function getUserRole() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return null;
    }

    // Decodifica o token JWT para obter o role
    const tokenPayload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    return tokenPayload.role as "EMPRESA" | "USUARIO" | null;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

async function getServices() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      console.error("Token não encontrado nos cookies");
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/servico-barbearia`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Erro na resposta da API:", response.status);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return [];
  }
}

const Index = async () => {
  // Verifica o role do usuário
  const userRole = await getUserRole();

  // Se for EMPRESA, redireciona para agendamentos
  if (userRole === "EMPRESA") {
    redirect("/agendamentos");
  }

  const servicesFromApi = await getServices();

  // Mapear os dados da API para o formato esperado pelo ServiceCard
  const services = servicesFromApi.map((service: any) => ({
    title: service.nome || service.title,
    description: service.descricao || service.description,
    price: service.preco || service.price,
    duration: service.duracaoMin || service.duration,
    image: "/model-barber.svg",
    slug:
      service.slug ||
      service.nome?.toLowerCase().replace(/\s+/g, "-") ||
      "service",
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-barber-dark text-white">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url(/hero-bg.jpg)" }}
          ></div>
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Experiência de cuidados pessoais premium para o cavalheiro
                moderno
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-gray-200">
                Barbeiros especialistas, produtos premium e serviço excepcional.
                Junte-se ao nosso clube VIP para vantagens exclusivas e reservas
                prioritárias.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/appointments" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-barber-gold hover:bg-barber-gold/90 text-black"
                  >
                    Agendar Horário
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                Nossos Serviços Premium
              </h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Descubra nossa gama de serviços especializados projetados para
                manter seu visual impecável.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {services.length > 0 ? (
                services.map((service: any, index: number) => (
                  <ServiceCard key={index} {...service} />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground">
                  Nenhum serviço cadastrado ainda.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
              O Que Nossos Clientes Dizem
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4"></div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Pronto para um Novo Visual?
            </h2>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Agende seu horário hoje e experimente a diferença Barba VIP.
            </p>
            <Link
              href="/appointments"
              className="inline-block w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-barber-gold hover:bg-barber-gold/90 text-black"
              >
                Agendar seu Horário
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
