"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import NextNavbar from "@/components/NextNavbar";
import NextFooter from "@/components/NextFooter";
import { api } from "@/http/api";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [statusList, setStatusList] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [loadingStatus, setLoadingStatus] = useState(true);
  const router = useRouter();

  // 🔹 Buscar lista de status na API
  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await api.get("users/status").json<string[]>();
        setStatusList(response);
      } catch (error) {
        console.error("Erro ao carregar status:", error);
      } finally {
        setLoadingStatus(false);
      }
    }
    fetchStatus();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) return;

    try {
      await api.post("auth/login", {
        json: { email: form.email, password: form.password },
      });

      router.push("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
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
              <form onSubmit={handleSubmit}>
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

                  {/* Dropdown de status */}
                  <div className="space-y-2">
                    <Label>Status</Label>
                    {loadingStatus ? (
                      <div className="w-full p-2 text-center border rounded text-gray-500">
                        Carregando status...
                      </div>
                    ) : (
                      <Select
                        value={selectedStatus}
                        onValueChange={(value) => setSelectedStatus(value)}
                      >
                        <SelectTrigger className="w-full border border-gray-300 rounded-lg bg-white">
                          <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusList.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0) + status.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
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
