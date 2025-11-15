"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NextNavbar from "@/components/NextNavbar";
import NextFooter from "@/components/NextFooter";
import { handleLogin } from "./action";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NextNavbar isAuthenticated={false} />

      <main className="flex-grow flex items-center justify-center py-8 md:py-12 px-4">
        <div className="container">
          <Card className="mx-auto max-w-md w-full">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl md:text-2xl font-bold">
                Login
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Digite suas credenciais para acessar sua conta
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
              <form action={handleLogin}>
                <div className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      name="email"
                      placeholder="email"
                      autoComplete="off"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  {/* Senha */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-sm md:text-base"
                      >
                        Senha
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs md:text-sm text-barber-gold hover:underline"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  {/* Botão de login */}
                  <Button
                    type="submit"
                    className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black text-sm md:text-base"
                  >
                    Entrar
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              <div className="text-xs md:text-sm text-center text-muted-foreground">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-barber-gold hover:underline"
                >
                  Registre-se
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <NextFooter />
    </div>
  );
};

export default Login;
