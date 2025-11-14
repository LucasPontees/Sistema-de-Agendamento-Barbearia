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

      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container px-4">
          <Card className="mx-auto max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>
                Digite suas credenciais para acessar sua conta
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form action={handleLogin}>
                <div className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      name="email"
                      placeholder="email"
                      autoComplete="off"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Senha */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-barber-gold hover:underline"
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
                    />
                  </div>

                  {/* Botão de login */}
                  <Button
                    type="submit"
                    className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black"
                  >
                    Entrar
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
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
