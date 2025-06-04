"use client";

import React from 'react';
import NextNavbar from '@/components/layout/NextNavbar';
import NextSidebar from '@/components/layout/NextSidebar';
import { useSidebarStore } from '@/store/sidebarStore';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Copyright } from 'lucide-react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebarStore();

  return (
    <div className="h-screen flex flex-col">
      <div className={cn(
        "ml-16 transition-all duration-300",
        isOpen && "ml-64"
      )}>
        <NextNavbar />
      </div>
      <NextSidebar />
      <div className={cn(
        "flex-1 p-4 ml-16 transition-all duration-300 overflow-auto flex flex-col",
        isOpen && "ml-64"
      )}>
        <div className="container mx-auto py-4 flex-1">
          {children}
        </div>

        <footer className="mt-4">
          <Separator className="mb-2" />
          <div className="flex justify-between items-center text-sm text-muted-foreground px-1">
            <div className="flex items-center gap-1">
              <Copyright className="h-3.5 w-3.5" />
              <span>2025 - Cash Alto</span>
            </div>
            <div>
              versão 1.0.0 | ambiente
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 