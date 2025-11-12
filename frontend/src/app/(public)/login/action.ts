"use server";

import { cookies } from "next/headers";
import { api } from "@/http/api";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

// ✅ Schema de validação da resposta da API
const loginResponseSchema = z.object({
  token: z.string(),
});

export async function handleLogin(formdata: FormData) {
  const form = {
    email: formdata.get("email")?.toString() || "",
    password: formdata.get("password")?.toString() || "",
  };

  // 🚫 Caso não tenha e-mail ou senha, encerra sem erro
  if (!form.email || !form.password) return;

  // 🔥 Chamada ao backend
  const response = await api.post("auth/login", {
    json: { email: form.email, password: form.password },
  });

  // ✅ Validação e tipagem segura com Zod
  const data = loginResponseSchema.parse(await response.json());
  const { token } = data;

  // 🍪 Define o cookie seguro
  const cookiesStore = await cookies();
  cookiesStore.set("access_token", token, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
    httpOnly: true, // segurança extra contra XSS
    sameSite: "lax",
  });

  // 🚀 Redireciona após login
  redirect("/profile", RedirectType.replace);
}
