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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
} from "lucide-react";
import { createCompanyBilling } from "./actions";

interface RegisterCompanyForm {
  // Dados da Empresa
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
  descricao: string;
  logo: string;
  horariosFuncionamento: string;

  // Dados do Usuário Admin
  usuario: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    confirmarSenha: string;
    dataNascimento: string;
    fotoPerfil: string;
  };
}

const RegisterCompany: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterCompanyForm>({
    nomeFantasia: "",
    cnpj: "",
    telefone: "",
    email: "",
    endereco: "",
    descricao: "",
    logo: "",
    horariosFuncionamento: "",
    usuario: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      confirmarSenha: "",
      dataNascimento: "",
      fotoPerfil: "",
    },
  });

  const handleChange = (field: string, value: string, isNested = false) => {
    if (isNested) {
      setForm((prev) => ({
        ...prev,
        usuario: {
          ...prev.usuario,
          [field]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return value;
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
    if (form.usuario.senha !== form.usuario.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem!",
        variant: "destructive",
      });
      return;
    }

    if (form.usuario.senha.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter no mínimo 6 caracteres!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nomeFantasia: form.nomeFantasia,
        cnpj: form.cnpj,
        telefone: form.telefone,
        email: form.email,
        endereco: form.endereco,
        descricao: form.descricao,
        logo: form.logo || "default-logo.png",
        horariosFuncionamento: form.horariosFuncionamento,
        usuario: {
          nome: form.usuario.nome,
          email: form.usuario.email,
          role: "EMPRESA",
          telefone: form.usuario.telefone,
          senha: form.usuario.senha,
          dataNascimento: new Date(form.usuario.dataNascimento),
          fotoPerfil: form.usuario.fotoPerfil || "default-avatar.png",
        },
      };

      // Cria cobrança na AbacatePay
      const result = await createCompanyBilling(payload);

      if (!result.success || !result.data) {
        throw new Error(result.error || "Erro ao criar cobrança");
      }

      toast({
        title: "Redirecionando para pagamento...",
        description:
          "Você será redirecionado para completar o pagamento de R$ 1,00",
      });

      // Salva o billingId no sessionStorage para usar depois
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pendingBillingId", result.data.billingId);
        console.log(
          "💾 [REGISTER] billingId salvo no sessionStorage:",
          result.data.billingId
        );
      }

      console.log(
        "🔀 [REGISTER] Redirecionando para pagamento:",
        result.data.paymentUrl
      );

      // Redireciona para página de pagamento da AbacatePay (mesma aba)
      window.location.href = result.data.paymentUrl;
    } catch (error: unknown) {
      console.error("Erro ao processar registro:", error);
      toast({
        title: "Erro ao processar registro",
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
      <NextNavbar isAuthenticated={false} />

      <main className="flex-grow flex items-center justify-center py-8 md:py-12 px-4 bg-gray-50">
        <div className="container max-w-4xl">
          <Card className="w-full">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Building2 className="h-6 w-6 text-barber-gold" />
                Registrar Empresa
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Cadastre sua barbearia e comece a gerenciar seus agendamentos
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados da Empresa */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                    <Building2 className="h-5 w-5 text-barber-gold" />
                    Dados da Empresa
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nome Fantasia */}
                    <div className="space-y-2">
                      <Label htmlFor="nomeFantasia">Nome Fantasia *</Label>
                      <Input
                        id="nomeFantasia"
                        type="text"
                        required
                        placeholder="Ex: Barber Shop Zenit"
                        value={form.nomeFantasia}
                        onChange={(e) =>
                          handleChange("nomeFantasia", e.target.value)
                        }
                      />
                    </div>

                    {/* CNPJ */}
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ *</Label>
                      <Input
                        id="cnpj"
                        type="text"
                        required
                        placeholder="00.000.000/0000-00"
                        value={form.cnpj}
                        onChange={(e) =>
                          handleChange("cnpj", formatCNPJ(e.target.value))
                        }
                        maxLength={18}
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
                        placeholder="empresa@exemplo.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Endereço */}
                  <div className="space-y-2">
                    <Label htmlFor="endereco">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Endereço Completo *
                    </Label>
                    <Input
                      id="endereco"
                      type="text"
                      required
                      placeholder="Rua, Número, Bairro, Cidade, Estado"
                      value={form.endereco}
                      onChange={(e) => handleChange("endereco", e.target.value)}
                    />
                  </div>

                  {/* Descrição */}
                  <div className="space-y-2">
                    <Label htmlFor="descricao">
                      <FileText className="h-4 w-4 inline mr-1" />
                      Descrição *
                    </Label>
                    <textarea
                      id="descricao"
                      required
                      placeholder="Descreva sua barbearia..."
                      value={form.descricao}
                      onChange={(e) =>
                        handleChange("descricao", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Horário de Funcionamento */}
                    <div className="space-y-2">
                      <Label htmlFor="horariosFuncionamento">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Horário de Funcionamento *
                      </Label>
                      <Input
                        id="horariosFuncionamento"
                        type="text"
                        required
                        placeholder="Ex: 09:00 - 18:00"
                        value={form.horariosFuncionamento}
                        onChange={(e) =>
                          handleChange("horariosFuncionamento", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Dados do Administrador */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                    <User className="h-5 w-5 text-barber-gold" />
                    Dados do Administrador
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="space-y-2">
                      <Label htmlFor="usuario.nome">Nome Completo *</Label>
                      <Input
                        id="usuario.nome"
                        type="text"
                        required
                        placeholder="João Silva"
                        value={form.usuario.nome}
                        onChange={(e) =>
                          handleChange("nome", e.target.value, true)
                        }
                      />
                    </div>

                    {/* Email do Admin */}
                    <div className="space-y-2">
                      <Label htmlFor="usuario.email">Email *</Label>
                      <Input
                        id="usuario.email"
                        type="email"
                        required
                        placeholder="admin@exemplo.com"
                        value={form.usuario.email}
                        onChange={(e) =>
                          handleChange("email", e.target.value, true)
                        }
                      />
                    </div>

                    {/* Telefone do Admin */}
                    <div className="space-y-2">
                      <Label htmlFor="usuario.telefone">Telefone *</Label>
                      <Input
                        id="usuario.telefone"
                        type="tel"
                        required
                        placeholder="(00) 00000-0000"
                        value={form.usuario.telefone}
                        onChange={(e) =>
                          handleChange(
                            "telefone",
                            formatPhone(e.target.value),
                            true
                          )
                        }
                        maxLength={15}
                      />
                    </div>

                    {/* Data de Nascimento */}
                    <div className="space-y-2">
                      <Label htmlFor="usuario.dataNascimento">
                        Data de Nascimento *
                      </Label>
                      <Input
                        id="usuario.dataNascimento"
                        type="date"
                        required
                        value={form.usuario.dataNascimento}
                        onChange={(e) =>
                          handleChange("dataNascimento", e.target.value, true)
                        }
                      />
                    </div>

                    {/* Senha */}
                    <div className="space-y-2">
                      <Label htmlFor="usuario.senha">Senha *</Label>
                      <Input
                        id="usuario.senha"
                        type="password"
                        required
                        placeholder="Mínimo 6 caracteres"
                        value={form.usuario.senha}
                        onChange={(e) =>
                          handleChange("senha", e.target.value, true)
                        }
                        minLength={6}
                      />
                    </div>

                    {/* Confirmar Senha */}
                    <div className="space-y-2">
                      <Label htmlFor="usuario.confirmarSenha">
                        Confirmar Senha *
                      </Label>
                      <Input
                        id="usuario.confirmarSenha"
                        type="password"
                        required
                        placeholder="Digite a senha novamente"
                        value={form.usuario.confirmarSenha}
                        onChange={(e) =>
                          handleChange("confirmarSenha", e.target.value, true)
                        }
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>

                {/* Botão de Submit */}
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
                    className="w-full sm:flex-1 bg-barber-gold hover:bg-barber-gold/90 text-black font-semibold"
                  >
                    {loading
                      ? "Processando..."
                      : "Pagar R$ 1,00 e Registrar 🥑"}
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              <div className="text-xs md:text-sm text-center text-muted-foreground">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-barber-gold hover:underline"
                >
                  Faça login
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

export default RegisterCompany;
