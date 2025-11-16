"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Plus, X, UserCircle2 } from "lucide-react";
import { getBarbeirosEmpresa, createBarbeiro } from "./actions";
import { useToast } from "@/components/ui/use-toast";

interface Barbeiro {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  fotoPerfil?: string;
  empresaId: number;
}

const BarbersPage: React.FC = () => {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    fotoPerfil: "",
  });

  useEffect(() => {
    loadBarbeiros();
  }, []);

  const loadBarbeiros = async () => {
    setLoading(true);
    const result = await getBarbeirosEmpresa();

    if (result.success) {
      setBarbeiros(result.data);
    } else {
      toast({
        title: "Erro ao carregar barbeiros",
        description: result.error,
        variant: "destructive",
      });
    }

    setLoading(false);
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
    if (!formData.nome || !formData.email || !formData.telefone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido",
        variant: "destructive",
      });
      return;
    }

    // Validação de telefone (mínimo 10 dígitos)
    const phoneNumbers = formData.telefone.replace(/\D/g, "");
    if (phoneNumbers.length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um telefone válido",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const result = await createBarbeiro({
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      fotoPerfil: formData.fotoPerfil || "default-barber.png",
    });

    if (result.success) {
      toast({
        title: "Sucesso!",
        description: "Barbeiro cadastrado com sucesso",
      });

      // Limpa o formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        fotoPerfil: "",
      });

      setShowForm(false);
      await loadBarbeiros();
    } else {
      toast({
        title: "Erro ao cadastrar barbeiro",
        description: result.error,
        variant: "destructive",
      });
    }

    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "telefone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Carregando barbeiros...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-6 md:pt-8 pb-12 md:pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Gerenciar Barbeiros
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Cadastre e gerencie os barbeiros da sua barbearia
              </p>
            </div>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto bg-barber-gold hover:bg-barber-gold/90 text-black"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Barbeiro
              </Button>
            )}
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Novo Barbeiro</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowForm(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        placeholder="Ex: João Silva"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Ex: joao@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        placeholder="(11) 98765-4321"
                        value={formData.telefone}
                        onChange={handleChange}
                        maxLength={15}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fotoPerfil">URL da Foto (opcional)</Label>
                      <Input
                        id="fotoPerfil"
                        name="fotoPerfil"
                        placeholder="https://..."
                        value={formData.fotoPerfil}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:flex-1 bg-barber-gold hover:bg-barber-gold/90 text-black"
                    >
                      {submitting ? "Cadastrando..." : "Cadastrar Barbeiro"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="w-full sm:flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {barbeiros.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-8 md:py-12">
                <UserCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhum barbeiro cadastrado
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  Comece cadastrando seu primeiro barbeiro
                </p>
                {!showForm && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="w-full sm:w-auto bg-barber-gold hover:bg-barber-gold/90 text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Primeiro Barbeiro
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {barbeiros.map((barbeiro) => (
                <Card
                  key={barbeiro.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-barber-gold/20 flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-barber-gold" />
                      </div>
                      <CardTitle className="text-lg md:text-xl break-words">
                        {barbeiro.nome}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm md:text-base break-all">
                          {barbeiro.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm md:text-base">
                          {barbeiro.telefone}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BarbersPage;
