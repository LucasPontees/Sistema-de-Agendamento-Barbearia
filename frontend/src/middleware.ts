import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     
Match all request paths except for the ones starting with:
api (API routes)
_next/static (static files)
_next/image (image optimization files)
favicon.ico, sitemap.xml, robots.txt (metadata files)
*/
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

const unprotectedRoutes = ["/login", "/notfound", "/register-company"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (unprotectedRoutes.includes(pathname)) {
    return response;
  }
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    console.log("Middleware: Token não encontrado, redirecionando para /login");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

//regra de token é válido
//
// se tiver token ao acessar o site, ele redireciona para o dashboard
