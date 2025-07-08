import React, { useEffect, useState } from 'react';
import { UserCircle2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated: propIsAuthenticated, onLogout }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(propIsAuthenticated || false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for authentication state
    const authState = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authState);
  }, [propIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    if (onLogout) {
      onLogout();
    }
    
    toast({
      title: "Desconectado com sucesso",
      description: "Esperamos vê-lo novamente em breve!",
    });
    
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-barber-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="/favicon.ico" alt="Barber VIP Club" className="h-10 w-10" />
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            {menuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-barber-dark p-4 z-50 animate-fade-in">
                <nav className="flex flex-col space-y-4">
                  <Link to="/" className="text-white hover:text-barber-gold" onClick={toggleMenu}>Home</Link>
                  <Link to="/services" className="text-white hover:text-barber-gold" onClick={toggleMenu}>Serviços</Link>
                  <Link to="/appointments" className="text-white hover:text-barber-gold" onClick={toggleMenu}>Agendamentos</Link>
                  <Link to="/membership" className="text-white hover:text-barber-gold" onClick={toggleMenu}>Clube VIP</Link>
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard" className="text-white hover:text-barber-gold" onClick={toggleMenu}>Painel</Link>
                      <Button variant="destructive" onClick={handleLogout}>Sair</Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="text-white hover:text-barber-gold" onClick={toggleMenu}>Login</Link>
                      <Link to="/register">
                        <Button variant="default" className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black">Registrar</Button>
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link to="/" className="text-white hover:text-barber-gold">Home</Link>
              <Link to="/services" className="text-white hover:text-barber-gold">Serviços</Link>
              <Link to="/appointments" className="text-white hover:text-barber-gold">Agendamentos</Link>
              <Link to="/membership" className="text-white hover:text-barber-gold">Clube VIP</Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="text-white hover:text-barber-gold">Painel</Link>
              )}
            </nav>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-white hover:text-barber-gold">
                    <UserCircle2 size={24} />
                  </Link>
                  <Button variant="outline" onClick={handleLogout} className="border-barber-gold text-barber-gold hover:bg-barber-gold hover:text-black">
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-white hover:text-barber-gold">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="default" className="bg-barber-gold hover:bg-barber-gold/90 text-black">Registrar</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
