// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const unprotectedRoutes = ["/login", "/register", "/notfound"];

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

// Função auxiliar para verificar JWT de forma compatível com Edge
async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Libera rotas públicas
  if (unprotectedRoutes.includes(pathname)) return NextResponse.next();

  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await verifyJWT(token);

    // Usuário logado tentando acessar /login
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.warn("Token inválido ou expirado:", error);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}
