
import { ServiceOption, BarberOption } from '@/types/appointment';

export const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM"
];

export const services: ServiceOption[] = [
  { id: "haircut", name: "Classic Haircut", duration: 30, price: 25 },
  { id: "beard-trim", name: "Beard Trim", duration: 15, price: 15 },
  { id: "haircut-beard", name: "Haircut & Beard Combo", duration: 45, price: 35 },
  { id: "hot-towel", name: "Hot Towel Shave", duration: 30, price: 30 },
  { id: "hair-color", name: "Hair Coloring", duration: 60, price: 50 },
  { id: "facial", name: "Men's Facial", duration: 30, price: 40 },
];

export const barbers: BarberOption[] = [
  { id: "john", name: "John Smith", specialties: ["haircut", "beard-trim", "haircut-beard"] },
  { id: "mike", name: "Mike Johnson", specialties: ["haircut", "hair-color", "beard-trim"] },
  { id: "dave", name: "Dave Williams", specialties: ["hot-towel", "facial", "haircut-beard"] },
  { id: "carlos", name: "Carlos Rodriguez", specialties: ["haircut", "beard-trim", "hot-towel"] },
];
