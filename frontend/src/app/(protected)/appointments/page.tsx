"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Scissors } from "lucide-react";
import { useRouter } from "next/navigation";
import { createAgendamento, getServices } from "./actions";
import { useUser } from "@/contexts/UserContext";

interface Service {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMin: number;
}

const Appointments: React.FC = () => {
  const router = useRouter();
  const { role, loading: userLoading } = useUser();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    servicoId: "",
    dataHora: "",
    observacoes: "",
  });

  useEffect(() => {
    // Se for EMPRESA, redireciona para a página de agendamentos
    if (!userLoading && role === "EMPRESA") {
      router.replace("/agendamentos");
    }
  }, [role, userLoading, router]);

  useEffect(() => {
    if (role === "USUARIO") {
      fetchServices();
    }
  }, [role]);

  const fetchServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createAgendamento({
        servicoId: parseInt(formData.servicoId),
        dataHora: formData.dataHora,
        observacoes: formData.observacoes || undefined,
      });

      if (result.success) {
        alert("Agendamento criado com sucesso!");
        router.push("/agendamentos");
      } else {
        alert(
          `Erro: ${result.error || "Não foi possível criar o agendamento"}`
        );
      }
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      alert("Erro ao criar agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Se ainda está carregando ou é EMPRESA, mostra loading
  if (userLoading || role === "EMPRESA") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Agende seu Horário</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Agende sua próxima visita com nossos barbeiros especialistas.
              Escolha seu serviço preferido, data e horário para uma experiência
              de cuidado personalizado.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Novo Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Serviço */}
                <div className="space-y-2">
                  <Label
                    htmlFor="servicoId"
                    className="flex items-center gap-2"
                  >
                    <Scissors className="h-4 w-4" />
                    Serviço
                  </Label>
                  <Select
                    value={formData.servicoId}
                    onValueChange={(value) => handleChange("servicoId", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id.toString()}
                        >
                          {service.nome} - R$ {service.preco.toFixed(2)} (
                          {service.duracaoMin} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Data e Hora */}
                <div className="space-y-2">
                  <Label htmlFor="dataHora" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Data e Hora
                  </Label>
                  <Input
                    id="dataHora"
                    type="datetime-local"
                    value={formData.dataHora}
                    onChange={(e) => handleChange("dataHora", e.target.value)}
                    required
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações (opcional)</Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Alguma preferência ou observação?"
                    value={formData.observacoes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange("observacoes", e.target.value)
                    }
                    rows={4}
                  />
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      loading || !formData.servicoId || !formData.dataHora
                    }
                    className="flex-1 bg-barber-gold hover:bg-barber-gold/90 text-black"
                  >
                    {loading ? "Agendando..." : "Confirmar Agendamento"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
