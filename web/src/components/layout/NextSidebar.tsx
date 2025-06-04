'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebarStore';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Trash2, 
  Users, 
  TruckIcon, 
  BarChart3, 
  Settings, 
  Calendar,
  User 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  const { isOpen } = useSidebarStore();
  
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center p-3 rounded-lg mb-1 transition-all",
        isOpen ? "px-4" : "px-3 justify-center",
        isActive 
          ? "bg-secondary text-sidebar-accent-foreground" 
          : "bg-white hover:bg-sidebar-accent/50"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {isOpen && <span className="ml-3 text-sm">{label}</span>}
    </Link>
  );
};

export default function NextSidebar() {
  const { isOpen } = useSidebarStore();
  const pathname = usePathname();

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', isActive: pathname === '/dashboard' },
    { icon: Trash2, label: 'Coletas', href: '/coletas', isActive: pathname === '/coletas' },
    { icon: Users, label: 'Clientes', href: '/clientes', isActive: pathname === '/clientes' },
    { icon: TruckIcon, label: 'Veículos', href: '/veiculos', isActive: pathname === '/veiculos' },
    { icon: Calendar, label: 'Agendamentos', href: '/agendamentos', isActive: pathname === '/agendamentos' },
    { icon: BarChart3, label: 'Relatórios', href: '/relatorios', isActive: pathname === '/relatorios' },
    { icon: Settings, label: 'Configurações', href: '/configuracoes', isActive: pathname === '/configuracoes' },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-primary fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out flex flex-col border-r border-sidebar-border",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center h-16 px-4">
        <div className={cn("flex items-center", isOpen ? "justify-start" : "justify-center w-full")}>
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <span className="font-bold text-xl"><img src="/favicon.ico" alt="Cash Alto" className="w-full h-full" /></span>
          </div>
          {isOpen && (
            <span className="ml-3 font-semibold text-white text-lg">Cash Alto</span>
          )}
        </div>
      </div>
      
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem 
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={item.isActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 