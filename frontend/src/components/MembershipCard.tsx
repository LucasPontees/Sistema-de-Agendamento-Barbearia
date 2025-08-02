import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface MembershipCardProps {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  isSubscribed?: boolean;
  priceId: string;
  onSubscribe: (priceId: string) => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ 
  title, 
  price, 
  features, 
  isPopular = false,
  isSubscribed = false,
  priceId,
  onSubscribe
}) => {
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (isSubscribed) {
      toast({
        title: "Já inscrito",
        description: "Você já está inscrito neste plano.",
        variant: "default",
      });
      return;
    }
    
    onSubscribe(priceId);
  };

  return (
    <Card className={`overflow-hidden relative ${
      isPopular ? 'border-2 border-barber-gold shadow-lg' : 'border border-barber-brown/20'
    } ${isSubscribed ? 'border-green-500 border-2' : ''} card-hover`}>
      {isSubscribed && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Seu Plano
        </div>
      )}
      
      {isPopular && !isSubscribed && (
        <div className="absolute top-2 right-2 bg-barber-gold text-black text-xs px-2 py-1 rounded-full">
          Mais Popular
        </div>
      )}
      
      <CardHeader className={isPopular ? 'bg-barber-gold/10' : ''}>
        <CardTitle className="text-xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <span className="text-3xl font-bold">R${price}</span>
          <span className="text-muted-foreground">/mês</span>
        </div>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${
            isSubscribed 
              ? 'bg-green-500 hover:bg-green-600 cursor-default' 
              : 'bg-barber-gold hover:bg-barber-gold/90 text-black'
          }`}
          onClick={handleSubscribe}
          disabled={isSubscribed}
        >
          {isSubscribed ? 'Plano Atual' : 'Assinar Agora'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MembershipCard;
