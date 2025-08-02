
import React from 'react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { services, barbers } from '@/data/appointmentData';

interface ContactDetailsTabProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  date: Date | undefined;
  timeSlot: string;
  service: string;
  barber: string;
  onBack: () => void;
}

const ContactDetailsTab: React.FC<ContactDetailsTabProps> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  notes,
  setNotes,
  date,
  timeSlot,
  service,
  barber,
  onBack,
}) => {
  const selectedService = services.find(s => s.id === service);
  const selectedBarber = barbers.find(b => b.id === barber);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="(123) 456-7890"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="john@example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Special Requests (Optional)</Label>
        <Textarea 
          id="notes" 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          placeholder="Any special requests or notes for your barber..."
          rows={3}
        />
      </div>
      
      <Separator />
      
      {date && service && (
        <div className="bg-secondary p-4 rounded-md">
          <h3 className="font-semibold text-center mb-2">Appointment Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Date:</div>
            <div>{date ? format(date, 'MMMM d, yyyy') : 'Not selected'}</div>
            
            <div>Time:</div>
            <div>{timeSlot || 'Not selected'}</div>
            
            <div>Service:</div>
            <div>{selectedService?.name || 'Not selected'}</div>
            
            <div>Price:</div>
            <div>${selectedService?.price || '0'}</div>
            
            <div>Barber:</div>
            <div>{selectedBarber?.name || 'Not selected'}</div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="bg-barber-gold hover:bg-barber-gold/90 text-black">
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default ContactDetailsTab;
