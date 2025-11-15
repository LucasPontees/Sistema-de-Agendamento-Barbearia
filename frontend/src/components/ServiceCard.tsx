import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  duration,
  slug,
}) => {
  return (
    <Card className="overflow-hidden card-hover border-2 border-barber-brown/10 flex flex-col h-full">
      <div className="h-40 md:h-48 overflow-hidden bg-muted"></div>

      <CardHeader className="pb-3">
        <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 text-base md:text-lg">
          <span className="break-words">{title}</span>
          <span className="text-barber-gold text-sm md:text-base whitespace-nowrap">
            R${price}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow pb-3">
        <p className="text-sm md:text-base text-muted-foreground mb-2 line-clamp-2">
          {description}
        </p>
        <div className="text-xs md:text-sm text-muted-foreground">
          Duração: {duration} minutos
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-3">
        <Link href={`/services/${slug}`} className="w-full sm:flex-1">
          <Button
            variant="outline"
            className="w-full border-barber-brown text-barber-brown hover:bg-barber-brown hover:text-white text-sm"
          >
            Detalhes
          </Button>
        </Link>
        <Link
          href={`/appointments?service=${slug}`}
          className="w-full sm:flex-1"
        >
          <Button className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black text-sm">
            Agendar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
