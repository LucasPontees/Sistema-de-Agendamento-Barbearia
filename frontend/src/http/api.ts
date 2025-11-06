import ky from "ky";

// Criando instância
export const api = ky.create({
  prefixUrl: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});
