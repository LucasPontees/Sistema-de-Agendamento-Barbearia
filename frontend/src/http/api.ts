import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', 
})

export async function getEmpresaById(id: number) {
  const data = await api.get(`empresa/${id}`).json();
  return data; // opcionalmente validar com zod
}

export async function getServicosByEmpresaId(id: number) {
  const data = await api.get(`empresa/${id}/servicos`).json();
  return data; // opcionalmente validar com zod
}
