
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MembershipCard from '@/components/MembershipCard';
import { Check, AlertCircle } from 'lucide-react';

// Simulated subscription check - in a real app, this would come from an API
const mockUserSubscription = {
  status: false,
  tier: null
};

// Mock function to simulate Stripe checkout - in a real app, this would call a Supabase edge function
const handleSubscription = async (priceId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock redirect to Stripe checkout
  alert(`Redirecting to Stripe checkout for price ID: ${priceId}`);
  
  // In a real implementation, this would be something like:
  // const { data, error } = await supabase.functions.invoke('create-checkout', {
  //   body: { priceId },
  // });
  // if (data?.url) window.location.href = data.url;
};

const membershipPlans = {
  monthly: [
    {
      title: "Standard",
      price: 19.99,
      features: [
        "2 cortes por mês",
        "10% de desconto em serviços adicionais",
        "Privilégios de agendamento padrão",
        "Corte de barba grátis com corte",
        "Acesso a produtos padrão"
      ],
      isPopular: false,
      priceId: "price_standard_monthly"
    },
    {
      title: "Premium",
      price: 39.99,
      features: [
        "4 cortes por mês",
        "20% de desconto em serviços adicionais",
        "Agendamento prioritário (24h de antecedência)",
        "Corte de barba grátis e serviço com toalha quente",
        "Bebida complementar",
        "Acesso a produtos premium",
        "Produto de cuidado mensal"
      ],
      isPopular: true,
      priceId: "price_premium_monthly"
    },
    {
      title: "Executive",
      price: 69.99,
      features: [
        "Corte ilimitado",
        "30% de desconto em serviços adicionais",
        "Agendamento VIP (48h de antecedência)",
        "Pacote de cuidado completo com cada visita",
        "Bebida complementar",
        "Acesso a todos os produtos premium",
        "Kit de cuidado mensal premium",
        "Acesso a eventos exclusivos"
      ],
      isPopular: false,
      priceId: "price_executive_monthly"
    }
  ],
  yearly: [
    {
      title: "Standard Annual",
      price: 199.99,
      features: [
        "2 cortes por mês",
        "15% de desconto em serviços adicionais",
        "Privilégios de agendamento padrão",
        "Corte de barba grátis com corte",
        "Acesso a produtos padrão",
        "Economize $40 em comparação ao mensal"
      ],
      isPopular: false,
      priceId: "price_standard_yearly"
    },
    {
      title: "Premium Annual",
      price: 399.99,
      features: [
        "4 cortes por mês",
        "25% de desconto em serviços adicionais",
        "Agendamento prioritário (24h de antecedência)",
        "Corte de barba grátis e serviço com toalha quente",
        "Bebida complementar",
        "Acesso a produtos premium",
        "Produto de cuidado mensal",
        "Economize $80 em comparação ao mensal"
      ],
      isPopular: true,
      priceId: "price_premium_yearly"
    },
    {
      title: "Executive Annual",
      price: 699.99,
      features: [
        "Corte ilimitado",
        "35% de desconto em serviços adicionais",
        "Agendamento VIP (48h de antecedência)",
        "Pacote de cuidado completo com cada visita",
        "Bebida complementar",
        "Acesso a todos os produtos premium",
        "Kit de cuidado mensal premium",
        "Acesso a eventos exclusivos",
        "Economize $140 em comparação ao mensal"
      ],
      isPopular: false,
      priceId: "price_executive_yearly"
    }
  ]
};

const benefits = [
  {
    title: "Corte ilimitado",
    description: "Dependendo do seu plano, obtenha até cortes ilimitados todos os meses.",
    icon: <Check className="w-8 h-8 text-green-500" />
  },
  {
    title: "Descontos em serviços",
    description: "Aproveite descontos em todos os serviços adicionais, de 10% a 30%.",
    icon: <Check className="w-8 h-8 text-green-500" />
  },
  {
    title: "Agendamento prioritário",
    description: "Pule a fila com privilégios de agendamento prioritário e VIP.",
    icon: <Check className="w-8 h-8 text-green-500" />
  },
  {
    title: "Adicionais complementares",
    description: "Aproveite cortes de barba grátis, serviço com toalha quente e produtos premium.",
    icon: <Check className="w-8 h-8 text-green-500" />
  },
  {
    title: "Produtos mensais",
    description: "Receba produtos de cuidado personalizados mensalmente com planos premium.",
    icon: <Check className="w-8 h-8 text-green-500" />
  },
  {
    title: "Eventos exclusivos",
    description: "Acesso a eventos exclusivos, lançamentos de produtos e mais.",
    icon: <Check className="w-8 h-8 text-green-500" />
  }
];

const faqs = [
  {
    question: "Como funciona o membro?",
    answer: "Nosso membro é um serviço de assinatura que oferece acesso a um número de cortes e benefícios adicionais cada mês. Simplesmente escolha seu plano preferido, assine e comece a desfrutar dos benefícios imediatamente."
  },
  {
    question: "Posso cancelar meu membro a qualquer momento?",
    answer: "Sim, você pode cancelar seu membro a qualquer momento. Não há compromissos de longo prazo ou taxas de cancelamento. Seus benefícios continuarão até o final do seu ciclo de faturamento atual."
  },
  {
    question: "Como faço para agendar horários como membro?",
    answer: "Membros podem agendar horários através do nosso site, aplicativo ou por telefone. Dependendo do seu nível de membro, você terá privilégios de agendamento padrão, prioritário ou VIP."
  },
  {
    question: "O que acontece se não usar todos os meus cortes em um mês?",
    answer: "Cortes não rolam para o próximo mês. Encorajamos você a aproveitar ao máximo seu membro usando todos os serviços alocados cada mês."
  },
  {
    question: "Posso compartilhar meu membro com minha família ou amigos?",
    answer: "Membros não são transferíveis e podem apenas ser usados pelo membro registrado. Cada pessoa precisa de seu próprio membro para desfrutar dos benefícios."
  },
  {
    question: "Como faço para atualizar ou downgradear meu plano?",
    answer: "Você pode atualizar ou downgradear seu plano de membro a qualquer momento através das configurações da sua conta. As alterações entrarão em vigor no início do seu próximo ciclo de faturamento."
  }
];

const Membership: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login necessário",
        description: "Por favor, faça login ou crie uma conta para se inscrever.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await handleSubscription(priceId);
    } catch (error) {
      toast({
        title: "Erro de assinatura",
        description: "Ocorreu um problema ao processar sua assinatura. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isLoggedIn} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-barber-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Clube VIP da Barba</h1>
              <p className="text-xl mb-8">
                Torne-se um membro do nosso clube VIP exclusivo e eleve sua experiência de cuidado,
                com benefícios premium, serviço prioritário e economias significativas.
              </p>
              {isLoggedIn && mockUserSubscription.status ? (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 inline-block">
                  <p className="font-semibold">
                    Você está inscrito no nosso plano {mockUserSubscription.tier || "VIP"}
                  </p>
                </div>
              ) : (
                <p className="text-barber-gold font-semibold">
                  Escolha um plano abaixo para começar
                </p>
              )}
            </div>
          </div>
        </section>
        
        {/* Membership Plans */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Selecione seu Plano de Membro</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Escolha o plano que se adapta às suas necessidades e orçamento.
                Todos os planos incluem benefícios essenciais com aumento de benefícios em níveis mais altos.
              </p>
              
              <div className="flex justify-center mt-6">
                <Tabs
                  value={billingPeriod}
                  onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")}
                  className="w-full max-w-xs"
                >
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="monthly">Mensal</TabsTrigger>
                    <TabsTrigger value="yearly">Anual (Economize)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {membershipPlans[billingPeriod].map((plan, index) => (
                <MembershipCard
                  key={index}
                  title={plan.title}
                  price={plan.price}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  isSubscribed={isLoggedIn && mockUserSubscription.status && mockUserSubscription.tier === plan.title}
                  priceId={plan.priceId}
                  onSubscribe={handleSubscribe}
                />
              ))}
            </div>
            
            {!isLoggedIn && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <AlertCircle className="text-amber-500 mr-2" size={20} />
                  <p className="text-amber-800">
                    Por favor, <Link to="/login" className="font-semibold underline">faça login</Link> ou <Link to="/register" className="font-semibold underline">crie uma conta</Link> para se inscrever
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Membership Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Membership Benefits</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Desfrute destes benefícios exclusivos quando se tornar um membro do nosso clube VIP.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Encontre respostas para perguntas comuns sobre nosso programa de membros.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="mb-4">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-barber-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para se tornar um membro?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Torne-se um membro do Clube VIP da Barba hoje e comece a desfrutar de benefícios exclusivos e economias em serviços de cuidado premium.
            </p>
            {isLoggedIn ? (
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-barber-gold hover:bg-barber-gold/90 text-black">
                  Ver Planos de Membro
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-barber-dark hover:bg-dark/10">
                    Faça Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" className="bg-barber-gold hover:bg-barber-gold/90 text-black">
                    Crie uma conta
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Membership;
