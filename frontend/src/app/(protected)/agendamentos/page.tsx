"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Scissors, Building2 } from "lucide-react";
import {
  getAgendamentos,
  getUserInfo,
  aceitarAgendamento,
  rejeitarAgendamento,
} from "../appointments/actions";
import Link from "next/link";

interface Agendamento {
  id: number;
  dataHora: string;
  status: string;
  observacoes?: string;
  servico?: {
    nome: string;
    preco: number;
    duracaoMin: number;
  };
  usuario?: {
    nome: string;
    email: string;
  };
  barbeiro?: {
    nome: string;
  };
}

interface UserInfo {
  role: "EMPRESA" | "USUARIO";
  name: string;
  email: string;
}

const AgendamentosPage: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [agendamentosResult, user] = await Promise.all([
      getAgendamentos(),
      getUserInfo(),
    ]);

    if (agendamentosResult.success) {
      setAgendamentos(agendamentosResult.data);
    }

    setUserInfo(user);
    setLoading(false);
  };

  const handleAceitar = async (agendamentoId: number) => {
    setActionLoading(agendamentoId);
    try {
      const result = await aceitarAgendamento(agendamentoId);
      if (result.success) {
        alert("Agendamento aceito com sucesso!");
        await loadData(); // Recarrega a lista
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error("Erro ao aceitar agendamento:", error);
      alert("Erro ao aceitar agendamento");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejeitar = async (agendamentoId: number) => {
    if (!confirm("Tem certeza que deseja rejeitar este agendamento?")) {
      return;
    }

    setActionLoading(agendamentoId);
    try {
      const result = await rejeitarAgendamento(agendamentoId);
      if (result.success) {
        alert("Agendamento rejeitado com sucesso!");
        await loadData(); // Recarrega a lista
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error("Erro ao rejeitar agendamento:", error);
      alert("Erro ao rejeitar agendamento");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        label: string;
        variant: "default" | "destructive" | "secondary" | "outline";
      }
    > = {
      PENDENTE: { label: "Pendente", variant: "secondary" },
      CONFIRMADO: { label: "Confirmado", variant: "default" },
      CANCELADO: { label: "Cancelado", variant: "destructive" },
      CONCLUIDO: { label: "Concluído", variant: "outline" },
      REJEITADO: { label: "Rejeitado", variant: "destructive" },
    };

    const statusInfo = statusMap[status] || {
      label: status,
      variant: "secondary" as const,
    };

    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Carregando agendamentos...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {userInfo?.role === "EMPRESA"
                  ? "Agendamentos da Empresa"
                  : "Meus Agendamentos"}
              </h1>
              <p className="text-muted-foreground">
                {userInfo?.role === "EMPRESA"
                  ? "Gerencie todos os agendamentos recebidos"
                  : "Acompanhe seus agendamentos"}
              </p>
            </div>
            {userInfo?.role === "USUARIO" && (
              <Link href="/appointments">
                <Button className="bg-barber-gold hover:bg-barber-gold/90 text-black">
                  Novo Agendamento
                </Button>
              </Link>
            )}
          </div>

          {agendamentos.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-muted-foreground mb-4">
                  {userInfo?.role === "EMPRESA"
                    ? "Você ainda não recebeu nenhum agendamento."
                    : "Você ainda não fez nenhum agendamento."}
                </p>
                {userInfo?.role === "USUARIO" && (
                  <Link href="/appointments">
                    <Button className="bg-barber-gold hover:bg-barber-gold/90 text-black">
                      Fazer Primeiro Agendamento
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {agendamentos.map((agendamento) => (
                <Card
                  key={agendamento.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <Scissors className="h-5 w-5 text-barber-gold" />
                        {agendamento.servico?.nome || "Serviço"}
                      </CardTitle>
                      {getStatusBadge(agendamento.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(agendamento.dataHora)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatTime(agendamento.dataHora)}</span>
                      </div>
                      {agendamento.servico && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Duração: {agendamento.servico.duracaoMin} min
                          </span>
                        </div>
                      )}
                      {userInfo?.role === "EMPRESA" && agendamento.usuario && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{agendamento.usuario.nome}</span>
                        </div>
                      )}
                      {agendamento.barbeiro && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Barbeiro: {agendamento.barbeiro.nome}</span>
                        </div>
                      )}
                      {agendamento.servico && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-barber-gold">
                            R$ {agendamento.servico.preco.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                    {agendamento.observacoes && (
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <p className="text-sm">
                          <span className="font-semibold">Observações:</span>{" "}
                          {agendamento.observacoes}
                        </p>
                      </div>
                    )}
                    {userInfo?.role === "EMPRESA" &&
                      agendamento.status === "PENDENTE" && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAceitar(agendamento.id)}
                            disabled={actionLoading === agendamento.id}
                          >
                            {actionLoading === agendamento.id
                              ? "Processando..."
                              : "Aceitar"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejeitar(agendamento.id)}
                            disabled={actionLoading === agendamento.id}
                          >
                            {actionLoading === agendamento.id
                              ? "Processando..."
                              : "Rejeitar"}
                          </Button>
                        </div>
                      )}
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

export default AgendamentosPage;
