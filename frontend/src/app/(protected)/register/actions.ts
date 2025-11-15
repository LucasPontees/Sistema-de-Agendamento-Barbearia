"use server";

import { cookies } from "next/headers";

export async function createUser(formData: {
  nome: string;
  email: string;
  role: string;
  telefone: string;
  senha: string;
  dataNascimento: string;
  fotoPerfil: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          role: formData.role,
          telefone: formData.telefone,
          senha: formData.senha,
          dataNascimento: new Date(formData.dataNascimento),
          fotoPerfil: formData.fotoPerfil || "default-avatar.png",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao registrar cliente");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error("Erro ao registrar cliente:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
