import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1️⃣ Rotas não protegidas (livres de login)
const unprotectedRoutes = ["/login", "/register", "/forgot-password"];

// 2️⃣ Configura quais rotas o middleware intercepta
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // =====================================================
  // 🚀 PARTE 1 — PROXY DE API (chamadas para /api/*)
  // =====================================================
  if (pathname.startsWith("/api/")) {
    const target = new URL(
      pathname.replace("/api", ""),
      "https://sistema-de-agendamento-barbearia.onrender.com"
    );

    // Clona os headers originais
    const requestHeaders = new Headers(request.headers);

    // Cria a requisição ao backend real
    const response = await fetch(target, {
      method: request.method,
      headers: requestHeaders,
      body: request.body,
      credentials: "include",
    });

    // Retorna a resposta para o frontend
    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  }

  // =====================================================
  // 🔒 PARTE 2 — PROTEÇÃO DE ROTAS (páginas Next.js)
  // =====================================================
  const response = NextResponse.next();

  // Permite acesso às rotas não protegidas
  if (unprotectedRoutes.includes(pathname)) {
    return response;
  }

  // Verifica se o cookie de autenticação existe
  const token = request.cookies.get("access_token");

  if (!token) {
    console.log("🔒 Token não encontrado — redirecionando para /login");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log("✅ Token encontrado — acesso permitido");
  return response;
}
