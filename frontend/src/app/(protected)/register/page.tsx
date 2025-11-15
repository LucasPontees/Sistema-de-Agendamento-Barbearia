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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Phone, Calendar, Lock, Image } from "lucide-react";
import { createUser } from "./actions";

interface RegisterUserForm {
  nome: string;
  email: string;
  role: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  dataNascimento: string;
  fotoPerfil: string;
}

const RegisterUser: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterUserForm>({
    nome: "",
    email: "",
    role: "USUARIO",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    dataNascimento: "",
    fotoPerfil: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (form.senha !== form.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem!",
        variant: "destructive",
      });
      return;
    }

    if (form.senha.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter no mínimo 6 caracteres!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await createUser({
        nome: form.nome,
        email: form.email,
        role: form.role,
        telefone: form.telefone,
        senha: form.senha,
        dataNascimento: form.dataNascimento,
        fotoPerfil: form.fotoPerfil,
      });

      if (!result.success) {
        throw new Error(result.error || "Erro ao registrar cliente");
      }

      toast({
        title: "Sucesso!",
        description: "Cliente registrado com sucesso!",
      });

      // Limpa o formulário
      setForm({
        nome: "",
        email: "",
        role: "USUARIO",
        telefone: "",
        senha: "",
        confirmarSenha: "",
        dataNascimento: "",
        fotoPerfil: "",
      });

      // Redireciona para o dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Erro ao registrar cliente:", error);
      toast({
        title: "Erro ao registrar",
        description:
          error instanceof Error
            ? error.message
            : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center py-8 md:py-12 px-4 bg-gray-50">
        <div className="container max-w-3xl">
          <Card className="w-full">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <User className="h-6 w-6 text-barber-gold" />
                Registrar Cliente
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Cadastre um novo cliente/usuário para sua barbearia
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informações Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                    <User className="h-5 w-5 text-barber-gold" />
                    Informações Pessoais
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nome Completo */}
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        type="text"
                        required
                        placeholder="João Silva"
                        value={form.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="cliente@exemplo.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>

                    {/* Telefone */}
                    <div className="space-y-2">
                      <Label htmlFor="telefone">
                        <Phone className="h-4 w-4 inline mr-1" />
                        Telefone *
                      </Label>
                      <Input
                        id="telefone"
                        type="tel"
                        required
                        placeholder="(00) 00000-0000"
                        value={form.telefone}
                        onChange={(e) =>
                          handleChange("telefone", formatPhone(e.target.value))
                        }
                        maxLength={15}
                      />
                    </div>

                    {/* Data de Nascimento */}
                    <div className="space-y-2">
                      <Label htmlFor="dataNascimento">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Data de Nascimento *
                      </Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        required
                        value={form.dataNascimento}
                        onChange={(e) =>
                          handleChange("dataNascimento", e.target.value)
                        }
                      />
                    </div>

                    {/* Tipo de Usuário */}
                    <div className="space-y-2">
                      <Label htmlFor="role">Tipo de Usuário *</Label>
                      <Select
                        value={form.role}
                        onValueChange={(value) => handleChange("role", value)}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USUARIO">Cliente</SelectItem>
                          <SelectItem value="BARBEIRO">Barbeiro</SelectItem>
                          <SelectItem value="EMPRESA">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Foto de Perfil (Opcional) */}
                    <div className="space-y-2">
                      <Label htmlFor="fotoPerfil">
                        <Image className="h-4 w-4 inline mr-1" />
                        Foto de Perfil (URL - Opcional)
                      </Label>
                      <Input
                        id="fotoPerfil"
                        type="url"
                        placeholder="https://exemplo.com/foto.jpg"
                        value={form.fotoPerfil}
                        onChange={(e) =>
                          handleChange("fotoPerfil", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Credenciais de Acesso */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                    <Lock className="h-5 w-5 text-barber-gold" />
                    Credenciais de Acesso
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Senha */}
                    <div className="space-y-2">
                      <Label htmlFor="senha">Senha *</Label>
                      <Input
                        id="senha"
                        type="password"
                        required
                        placeholder="Mínimo 6 caracteres"
                        value={form.senha}
                        onChange={(e) => handleChange("senha", e.target.value)}
                        minLength={6}
                      />
                    </div>

                    {/* Confirmar Senha */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                      <Input
                        id="confirmarSenha"
                        type="password"
                        required
                        placeholder="Digite a senha novamente"
                        value={form.confirmarSenha}
                        onChange={(e) =>
                          handleChange("confirmarSenha", e.target.value)
                        }
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="w-full sm:flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:flex-1 bg-barber-gold hover:bg-barber-gold/90 text-black"
                  >
                    {loading ? "Registrando..." : "Registrar Cliente"}
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              <div className="text-xs md:text-sm text-center text-muted-foreground">
                <Link
                  href="/dashboard"
                  className="text-barber-gold hover:underline"
                >
                  Voltar ao Dashboard
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RegisterUser;
