"use server";

// Em Server Actions, use variáveis sem NEXT_PUBLIC_ ou hardcode para desenvolvimento
const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:7777";

export async function createCompanyBilling(empresaData: any) {
  try {
    console.log("[SERVER ACTION] API_URL:", API_URL);

    const response = await fetch(`${API_URL}/payment/create-company-billing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresaData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao criar cobrança");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error("Erro ao criar cobrança:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function checkPaymentStatus(billingId: string) {
  try {
    const response = await fetch(`${API_URL}/payment/billing/${billingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao consultar status do pagamento");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function checkAndCreateCompany(
  billingId: string,
  empresaData?: any
) {
  try {
    console.log("[SERVER ACTION] Verificando pagamento:", billingId);
    console.log(
      "[SERVER ACTION] Dados da empresa:",
      empresaData ? "PRESENTE" : "NÃO ENVIADO"
    );

    const response = await fetch(
      `${API_URL}/payment/check-and-create/${billingId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: empresaData ? JSON.stringify(empresaData) : undefined,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao verificar pagamento");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error("Erro ao verificar pagamento:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
