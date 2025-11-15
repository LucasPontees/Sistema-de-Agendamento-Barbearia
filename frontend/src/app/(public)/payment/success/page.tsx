"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { checkAndCreateCompany } from "../../register-company/actions";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [status, setStatus] = useState<
    "checking" | "success" | "error" | "pending"
  >("checking");
  const [message, setMessage] = useState("Verificando pagamento...");

  useEffect(() => {
    // Tenta obter o billingId da URL ou do sessionStorage
    let billingId = searchParams.get("billingId");

    if (!billingId && typeof window !== "undefined") {
      billingId = sessionStorage.getItem("pendingBillingId");
    }

    if (!billingId) {
      setStatus("error");
      setMessage(
        "ID de cobrança não encontrado. Por favor, tente registrar novamente."
      );
      return;
    }

    // Limpa o sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pendingBillingId");
    }

    const verifyPayment = async () => {
      try {
        const result = await checkAndCreateCompany(billingId!);

        if (result.success && result.data.success) {
          setStatus("success");
          setMessage("Empresa criada com sucesso! Você já pode fazer login.");

          toast({
            title: "🎉 Sucesso!",
            description:
              "Sua empresa foi registrada. Redirecionando para login...",
          });

          // Redireciona para login após 3 segundos
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else if (result.data.status === "PENDING") {
          setStatus("pending");
          setMessage(
            "Pagamento ainda está sendo processado. Aguarde alguns instantes..."
          );

          // Tenta novamente em 5 segundos
          setTimeout(() => verifyPayment(), 5000);
        } else {
          setStatus("error");
          setMessage(result.data.message || "Não foi possível criar a empresa");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Erro ao verificar pagamento. Tente novamente.");
      }
    };

    verifyPayment();
  }, [searchParams, router, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {status === "checking" && "Verificando Pagamento..."}
            {status === "pending" && "Processando Pagamento..."}
            {status === "success" && "Pagamento Confirmado! 🎉"}
            {status === "error" && "Ops! Algo deu errado"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          {/* Ícone de Status */}
          <div className="flex justify-center">
            {status === "checking" && (
              <Loader2 className="h-16 w-16 text-barber-gold animate-spin" />
            )}
            {status === "pending" && (
              <AlertCircle className="h-16 w-16 text-yellow-500 animate-pulse" />
            )}
            {status === "success" && (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>

          {/* Mensagem */}
          <p className="text-center text-muted-foreground">{message}</p>

          {/* Botões */}
          {status === "success" && (
            <div className="flex flex-col w-full gap-3">
              <Link href="/login" className="w-full">
                <Button className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black">
                  Ir para Login
                </Button>
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col w-full gap-3">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Tentar Novamente
              </Button>
              <Link href="/register-company" className="w-full">
                <Button variant="ghost" className="w-full">
                  Voltar ao Registro
                </Button>
              </Link>
            </div>
          )}

          {status === "pending" && (
            <div className="text-sm text-center text-muted-foreground">
              <p>Aguarde enquanto processamos seu pagamento...</p>
              <p className="mt-2">
                Esta página será atualizada automaticamente.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
