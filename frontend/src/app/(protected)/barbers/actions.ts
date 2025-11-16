"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7777";

export async function getBarbeirosEmpresa() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(`${API_BASE_URL}/barbers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar barbeiros");
    }

    const data = await response.json();
    return { success: true, data: Array.isArray(data) ? data : [] };
  } catch (error: any) {
    console.error("Erro ao buscar barbeiros da empresa:", error);
    return { success: false, data: [], error: error.message };
  }
}

export async function createBarbeiro(formData: {
  nome: string;
  email: string;
  telefone: string;
  fotoPerfil?: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(`${API_BASE_URL}/barbers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Não foi possível criar o barbeiro");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("Erro ao criar barbeiro:", error);
    return { success: false, error: error.message };
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
