"use client";
import React, { useState, useRef } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import NextNavbar from "@/components/NextNavbar";
import NextFooter from "@/components/NextFooter";
import { z } from "zod";
import { api } from "@/http/api";

interface User {
  name: string;
  surname: string;
  login: string;
  password: string;
}

const userSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  surname: z.string().min(3, "Sobrenome obrigatório"),
  login: z.string().min(3, "Login obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  //   const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [mensagem, setMensagem] = useState("");

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // setErrors({});
    const userData: User = { name, surname, password, login };
    const result = userSchema.safeParse(userData);
    // if (!result.success) {
    //   const fieldErrors: { [key: string]: string } = {};
    //   result.error.errors.forEach((err: any) => {
    //     if (err.path[0]) fieldErrors[err.path[0]] = err.message;
    //   });
    //   setErrors(fieldErrors);
    //   return;
    // }

    try {
      await api.post("users/create", {
        json: { name, surname, login, password },
      });
      setMensagem("Usuário criado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setMensagem("Falha na criação do usuário!");
      setTimeout(() => setMensagem(""), 1000);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NextNavbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container px-4">
          <Card className="mx-auto max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Criar uma Conta
              </CardTitle>
              <CardDescription>
                Registre-se para agendar horários e juntar-se ao nosso clube VIP
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="João Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surname">Sobrenome</Label>
                    <Input
                      id="surname"
                      type="text"
                      placeholder="Silva"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login">Login</Label>
                    <Input
                      id="login"
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* <Checkbox
                                            id="terms"
                                            checked={acceptTerms}
                                            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                        /> */}
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Eu aceito os{" "}
                      <Link
                        href="/terms"
                        className="text-barber-gold hover:underline"
                      >
                        termos e condições
                      </Link>
                      <Link
                        href="/login"
                        className="text-barber-gold hover:underline"
                      >
                        Já tenho conta
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Já possui uma conta?{" "}
                <Link
                  href="/login"
                  className="text-barber-gold hover:underline"
                >
                  Entrar
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

export default Register;
