"use client";
import React, { useEffect, useState } from "react";
import { UserCircle2, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter, usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useUser } from "@/contexts/UserContext";

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { role } = useUser();

  useEffect(() => {
    // Define rotas públicas (não autenticadas)
    const publicRoutes = [
      "/login",
      "/register-company",
      "/payment/success",
      "/payment/waiting",
      "/payment/manual-check",
    ];

    // Verifica se está em uma rota protegida ou se acabou de fazer login
    const protectedRoutes = [
      "/homepage",
      "/dashboard",
      "/profile",
      "/appointments",
      "/agendamentos",
      "/register",
      "/my-appointments",
      "/services",
      "/barbers",
    ];

    // Se está em uma rota pública, não está autenticado
    const isPublicRoute = publicRoutes.some((route) =>
      pathname?.startsWith(route)
    );

    if (isPublicRoute) {
      setIsAuthenticated(false);
      return;
    }

    // Se está em uma rota protegida, significa que está autenticado
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname?.startsWith(route)
    );

    setIsAuthenticated(isProtectedRoute);
  }, [pathname]);

  const getHomeLink = () => {
    if (!isAuthenticated) return "/login";
    // Se for EMPRESA, vai para agendamentos; se for USUARIO, vai para homepage
    return role === "EMPRESA" ? "/agendamentos" : "/homepage";
  };

  const handleLogout = async () => {
    try {
      // Remove o cookie de autenticação
      deleteCookie("access_token", { path: "/" });

      setIsAuthenticated(false);
      router.push("/login");
      toast({ title: "Desconectado com sucesso!" });
    } catch (error) {
      console.error("Erro ao fazer logout", error);
      toast({
        title: "Erro ao desconectar",
        variant: "destructive",
      });
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-barber-dark text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href={getHomeLink()}>
            <span className="text-xl md:text-2xl font-bold text-barber-gold">
              Barber Shop
            </span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {menuOpen && (
              <div className="fixed top-16 left-0 right-0 bg-barber-dark p-4 z-50 shadow-lg border-t border-barber-gold/20">
                <nav className="flex flex-col space-y-4">
                  {isAuthenticated ? (
                    <>
                      {/* Home - apenas para USUARIO */}
                      {role === "USUARIO" && (
                        <Link
                          href="/homepage"
                          className="text-white hover:text-barber-gold"
                          onClick={toggleMenu}
                        >
                          Home
                        </Link>
                      )}
                      {role === "USUARIO" && (
                        <>
                          <Link
                            href="/my-appointments"
                            className="text-white hover:text-barber-gold"
                            onClick={toggleMenu}
                          >
                            Meus Agendamentos
                          </Link>
                          <Link
                            href="/appointments"
                            className="text-white hover:text-barber-gold"
                            onClick={toggleMenu}
                          >
                            Novo Agendamento
                          </Link>
                        </>
                      )}
                      {role === "EMPRESA" && (
                        <>
                          <Link
                            href="/agendamentos"
                            className="text-white hover:text-barber-gold"
                            onClick={toggleMenu}
                          >
                            Meus Agendamentos
                          </Link>
                          <Link
                            href="/services"
                            className="text-white hover:text-barber-gold"
                            onClick={toggleMenu}
                          >
                            Serviços
                          </Link>
                          <Link
                            href="/barbers"
                            className="text-white hover:text-barber-gold"
                            onClick={toggleMenu}
                          >
                            Barbeiros
                          </Link>
                          <Link
                            href="/register"
                            className="text-white hover:text-barber-gold"
                            onClick={toggleMenu}
                          >
                            Registrar Cliente
                          </Link>
                        </>
                      )}
                      <Link
                        href="/dashboard"
                        className="text-white hover:text-barber-gold"
                        onClick={toggleMenu}
                      >
                        Painel
                      </Link>
                      <Link
                        href="/profile"
                        className="text-white hover:text-barber-gold"
                        onClick={toggleMenu}
                      >
                        Perfil
                      </Link>
                      <Button variant="destructive" onClick={handleLogout}>
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-white hover:text-barber-gold"
                        onClick={toggleMenu}
                      >
                        Login
                      </Link>
                      <Link href="/register-company" onClick={toggleMenu}>
                        <Button
                          variant="default"
                          className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black"
                        >
                          Registrar Empresa
                        </Button>
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
              {isAuthenticated && (
                <>
                  {/* Home - apenas para USUARIO */}
                  {role === "USUARIO" && (
                    <Link
                      href="/homepage"
                      className="text-white hover:text-barber-gold"
                    >
                      Home
                    </Link>
                  )}
                  {role === "USUARIO" && (
                    <>
                      <Link
                        href="/my-appointments"
                        className="text-white hover:text-barber-gold"
                      >
                        Meus Agendamentos
                      </Link>
                      <Link
                        href="/appointments"
                        className="text-white hover:text-barber-gold"
                      >
                        Novo Agendamento
                      </Link>
                    </>
                  )}
                  {role === "EMPRESA" && (
                    <Link
                      href="/agendamentos"
                      className="text-white hover:text-barber-gold"
                    >
                      Meus Agendamentos
                    </Link>
                  )}
                  {role === "EMPRESA" && (
                    <Link
                      href="/services"
                      className="text-white hover:text-barber-gold"
                    >
                      Serviços
                    </Link>
                  )}
                  {role === "EMPRESA" && (
                    <Link
                      href="/barbers"
                      className="text-white hover:text-barber-gold"
                    >
                      Barbeiros
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-barber-gold"
                  >
                    Painel
                  </Link>
                  {role === "EMPRESA" && (
                    <Link href="/register">
                      <Button
                        variant="default"
                        className="bg-barber-gold hover:bg-barber-gold/90 text-black"
                      >
                        Registrar Cliente
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="text-white hover:text-barber-gold"
                  >
                    <UserCircle2 size={24} />
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-barber-gold text-barber-gold hover:bg-barber-gold hover:text-black"
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-white hover:text-barber-gold"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register-company">
                    <Button
                      variant="default"
                      className="bg-barber-gold hover:bg-barber-gold/90 text-black"
                    >
                      Registrar Empresa
                    </Button>
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
