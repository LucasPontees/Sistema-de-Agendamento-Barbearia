import ky from "ky";
import { z } from "zod";

// Criando instância
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});
