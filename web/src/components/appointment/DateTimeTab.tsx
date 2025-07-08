
import React from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { timeSlots } from '@/data/appointmentData';

interface DateTimeTabProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  timeSlot: string;
  setTimeSlot: (time: string) => void;
  onContinue: () => void;
}

const DateTimeTab: React.FC<DateTimeTabProps> = ({
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  onContinue
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="date">Selecione a Data</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal mt-2",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Selecione uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => 
                date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                date.getDay() === 0
              }
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <Label htmlFor="time">Selecione o Horário</Label>
        <Select value={timeSlot} onValueChange={setTimeSlot}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Selecione um horário" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={time} value={time}>{time}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button type="button" className="w-full" onClick={onContinue}>
        Continuar para Serviços
      </Button>
    </div>
  );
};

export default DateTimeTab;
