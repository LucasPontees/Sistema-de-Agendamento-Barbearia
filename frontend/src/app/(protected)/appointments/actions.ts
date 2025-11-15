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
