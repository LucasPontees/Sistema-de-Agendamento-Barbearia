import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  duration: number;
  slug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  price, 
  image, 
  duration,
  slug 
}) => {
  return (
    <Card className="overflow-hidden card-hover border-2 border-barber-brown/10">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <span className="text-barber-gold">R${price}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-2">{description}</p>
        <div className="text-sm text-muted-foreground">
          Duração: {duration} minutos
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Link to={`/services/${slug}`}>
          <Button variant="outline" className="border-barber-brown text-barber-brown hover:bg-barber-brown hover:text-white">
            Detalhes
          </Button>
        </Link>
        <Link to={`/appointments?service=${slug}`}>
          <Button className="bg-barber-gold hover:bg-barber-gold/90 text-black">
            Agendar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
