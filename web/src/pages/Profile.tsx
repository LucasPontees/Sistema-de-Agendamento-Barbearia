
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCog, Mail, Calendar, History } from 'lucide-react';
import Header from '@/components/Header';

const Profile = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';

  // Verifica se o usuário está autenticado
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Informações do Perfil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-6 w-6" />
                Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>UV</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">Usuário VIP</h3>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{userEmail}</span>
                </div>
              </div>
              <Button className="w-full">Editar Perfil</Button>
            </CardContent>
          </Card>

          {/* Histórico de Agendamentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-6 w-6" />
                Últimos Agendamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Corte de Cabelo</p>
                    <p className="text-sm text-muted-foreground">15/04/2025 - 14:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Barba</p>
                    <p className="text-sm text-muted-foreground">10/04/2025 - 15:30</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
