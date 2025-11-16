"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const PaymentWaiting: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("🔄 [WAITING] Página /payment/waiting carregada!");

    // Pega o billingId do sessionStorage
    if (typeof window !== "undefined") {
      console.log("🔍 [WAITING] Todos os itens no sessionStorage:");
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        console.log(`  - ${key}: ${sessionStorage.getItem(key!)}`);
      }

      const billingId = sessionStorage.getItem("pendingBillingId");

      console.log("🔄 [WAITING] Redirecionando para /payment/success");
      console.log("🆔 [WAITING] billingId encontrado:", billingId);

      if (billingId) {
        console.log(
          "✅ [WAITING] billingId existe! Redirecionando com parâmetro..."
        );
        // Redireciona para a página de sucesso com o billingId
        router.push(`/payment/success?billingId=${billingId}`);
      } else {
        console.error(
          "❌ [WAITING] billingId NÃO encontrado! Redirecionando sem parâmetro..."
        );
        // Se não tem billingId, vai para success de qualquer forma
        router.push("/payment/success");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Processando...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <Loader2 className="h-16 w-16 text-barber-gold animate-spin" />
          <p className="text-center text-muted-foreground">
            Aguarde um momento...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentWaiting;
