"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createAgendamento(formData: {
  servicoId: number;
  dataHora: string;
  observacoes?: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/agendamento`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          servicoId: formData.servicoId,
          dataHora: new Date(formData.dataHora).toISOString(),
          observacoes: formData.observacoes || undefined,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Não foi possível criar o agendamento");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("Erro ao criar agendamento:", error);
    return { success: false, error: error.message };
  }
}

export async function getServices() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/servico-barbearia`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar serviços");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return [];
  }
}

export async function getAgendamentos() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    // Decodifica o token para obter o role e empresaId
    const tokenPayload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    const role = tokenPayload.role;
    const empresaId = tokenPayload.empresaId;

    // Se for EMPRESA, busca agendamentos da empresa
    // Se for USUARIO, busca agendamentos do usuário
    const endpoint =
      role === "EMPRESA"
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/agendamento?empresaId=${empresaId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/agendamento/user`;

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar agendamentos");
    }

    const data = await response.json();
    return { success: true, data: Array.isArray(data) ? data : [], role };
  } catch (error: any) {
    console.error("Erro ao buscar agendamentos:", error);
    return { success: false, data: [], error: error.message, role: null };
  }
}

export async function getAgendamentosCliente() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/agendamento/cliente`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar agendamentos");
    }

    const data = await response.json();
    return { success: true, data: Array.isArray(data) ? data : [] };
  } catch (error: any) {
    console.error("Erro ao buscar agendamentos do cliente:", error);
    return { success: false, data: [], error: error.message };
  }
}

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return null;
    }

    // Decodifica o token JWT
    const tokenPayload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    return {
      sub: tokenPayload.sub,
      email: tokenPayload.email,
      name: tokenPayload.name,
      empresaId: tokenPayload.empresaId,
      role: tokenPayload.role as "EMPRESA" | "USUARIO",
    };
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export async function aceitarAgendamento(agendamentoId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/agendamento/status/${agendamentoId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acao: "CONFIRMADO",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao aceitar agendamento");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("Erro ao aceitar agendamento:", error);
    return { success: false, error: error.message };
  }
}

export async function rejeitarAgendamento(agendamentoId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/agendamento/status/${agendamentoId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acao: "REJEITADO",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao rejeitar agendamento");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("Erro ao rejeitar agendamento:", error);
    return { success: false, error: error.message };
  }
}
