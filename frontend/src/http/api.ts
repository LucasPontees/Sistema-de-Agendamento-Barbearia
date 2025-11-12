import ky from "ky";
import { CookiesFn, getCookie } from "cookies-next";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookiesStore: CookiesFn | undefined;
        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers");
          cookiesStore = serverCookies;
        }
        const token = getCookie("access_token", { cookies: cookiesStore });
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
        console.log(request.headers.get("Authorization"));
      },
    ],
  },
});
