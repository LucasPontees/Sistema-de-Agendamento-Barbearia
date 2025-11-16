"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Scissors, Clock, DollarSign, Plus, X } from "lucide-react";
import { getServicosEmpresa, createServico } from "./actions";
import { useToast } from "@/components/ui/use-toast";

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMin: number;
  empresaId: number;
}

const ServicesPage: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    duracaoMin: "",
  });

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = async () => {
    setLoading(true);
    const result = await getServicosEmpresa();

    if (result.success) {
      setServicos(result.data);
    } else {
      toast({
        title: "Erro ao carregar serviços",
        description: result.error,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (
      !formData.nome ||
      !formData.descricao ||
      !formData.preco ||
      !formData.duracaoMin
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    const preco = parseFloat(formData.preco);
    const duracaoMin = parseInt(formData.duracaoMin);

    if (preco <= 0) {
      toast({
        title: "Preço inválido",
        description: "O preço deve ser maior que zero",
        variant: "destructive",
      });
      return;
    }

    if (duracaoMin <= 0) {
      toast({
        title: "Duração inválida",
        description: "A duração deve ser maior que zero",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const result = await createServico({
      nome: formData.nome,
      descricao: formData.descricao,
      preco,
      duracaoMin,
    });

    if (result.success) {
      toast({
        title: "Sucesso!",
        description: "Serviço criado com sucesso",
      });

      // Limpa o formulário
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        duracaoMin: "",
      });

      setShowForm(false);
      await loadServicos();
    } else {
      toast({
        title: "Erro ao criar serviço",
        description: result.error,
        variant: "destructive",
      });
    }

    setSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Carregando serviços...</p>
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
                Gerenciar Serviços
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Cadastre e gerencie os serviços oferecidos pela sua barbearia
              </p>
            </div>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto bg-barber-gold hover:bg-barber-gold/90 text-black"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Serviço
              </Button>
            )}
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Novo Serviço</CardTitle>
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
                      <Label htmlFor="nome">Nome do Serviço *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        placeholder="Ex: Corte Masculino"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preco">Preço (R$) *</Label>
                      <Input
                        id="preco"
                        name="preco"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Ex: 35.00"
                        value={formData.preco}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duracaoMin">Duração (minutos) *</Label>
                    <Input
                      id="duracaoMin"
                      name="duracaoMin"
                      type="number"
                      min="1"
                      placeholder="Ex: 30"
                      value={formData.duracaoMin}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição *</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      placeholder="Descreva os detalhes do serviço..."
                      value={formData.descricao}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:flex-1 bg-barber-gold hover:bg-barber-gold/90 text-black"
                    >
                      {submitting ? "Criando..." : "Criar Serviço"}
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

          {servicos.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-8 md:py-12">
                <Scissors className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhum serviço cadastrado
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  Comece criando seu primeiro serviço
                </p>
                {!showForm && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="w-full sm:w-auto bg-barber-gold hover:bg-barber-gold/90 text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Serviço
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {servicos.map((servico) => (
                <Card
                  key={servico.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <Scissors className="h-5 w-5 text-barber-gold flex-shrink-0" />
                      <span className="break-words">{servico.nome}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
                      {servico.descricao}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-barber-gold flex-shrink-0" />
                        <span className="font-semibold text-barber-gold">
                          R$ {servico.preco.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm md:text-base text-muted-foreground">
                          {servico.duracaoMin} minutos
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

export default ServicesPage;
