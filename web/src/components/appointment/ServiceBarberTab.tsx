
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services, barbers } from '@/data/appointmentData';
import { ServiceOption } from '@/types/appointment';

interface ServiceBarberTabProps {
  service: string;
  setService: (service: string) => void;
  barber: string;
  setBarber: (barber: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const ServiceBarberTab: React.FC<ServiceBarberTabProps> = ({
  service,
  setService,
  barber,
  setBarber,
  onBack,
  onContinue
}) => {
  const selectedService = services.find(s => s.id === service);
  const availableBarbers = service 
    ? barbers.filter(b => b.specialties.includes(service))
    : barbers;

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="service">Select Service</Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name} - ${service.price} ({service.duration} mins)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedService && (
        <div className="bg-muted p-3 rounded-md text-sm">
          <div className="font-medium text-barber-brown">{selectedService.name}</div>
          <div className="flex justify-between mt-1">
            <span>Duration: {selectedService.duration} minutes</span>
            <span>Price: ${selectedService.price}</span>
          </div>
        </div>
      )}
      
      <div>
        <Label htmlFor="barber">Select Barber</Label>
        <Select value={barber} onValueChange={setBarber} disabled={!service}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder={service ? "Choose a barber" : "Select a service first"} />
          </SelectTrigger>
          <SelectContent>
            {availableBarbers.map((barber) => (
              <SelectItem key={barber.id} value={barber.id}>
                {barber.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onContinue} disabled={!service || !barber}>
          Continue to Details
        </Button>
      </div>
    </div>
  );
};

export default ServiceBarberTab;
