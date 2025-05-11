'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/store/sidebarStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function NextNavbar() {
  const { toggle } = useSidebarStore();
  const router = useRouter();

  return (
    <div className="h-16 border-b border-border flex items-center px-4 justify-between bg-primary">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggle} className="mr-4">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="text-lg font-semibold text-ecoleta-primary hidden sm:block">Cash Alto</div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-ecoleta-accent rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-ecoleta-primary text-white">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/')}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 