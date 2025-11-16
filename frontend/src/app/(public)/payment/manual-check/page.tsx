"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { checkAndCreateCompany } from "../../register-company/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ManualPaymentCheck: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [billingId, setBillingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const handleCheck = async () => {
    if (!billingId.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira o ID da cobrança",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult({ status: "idle", message: "" });

    try {
      const response = await checkAndCreateCompany(billingId.trim());

      if (response.success && response.data.success) {
        setResult({
          status: "success",
          message: "Empresa criada com sucesso! Redirecionando para login...",
        });

        toast({
          title: "🎉 Sucesso!",
          description: "Sua empresa foi registrada!",
        });

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setResult({
          status: "error",
          message: response.data?.message || "Não foi possível criar a empresa",
        });
      }
    } catch (error) {
      setResult({
        status: "error",
        message: "Erro ao verificar pagamento. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Verificar Pagamento Manualmente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="billingId">ID da Cobrança (Billing ID)</Label>
            <Input
              id="billingId"
              type="text"
              placeholder="bill_xxxxx"
              value={billingId}
              onChange={(e) => setBillingId(e.target.value)}
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              O ID da cobrança está no email de confirmação da AbacatePay
            </p>
          </div>

          <Button
            onClick={handleCheck}
            disabled={loading}
            className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              "Verificar e Criar Empresa"
            )}
          </Button>

          {result.status === "success" && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-700">{result.message}</p>
            </div>
          )}

          {result.status === "error" && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-md">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{result.message}</p>
            </div>
          )}

          <div className="pt-4 border-t">
            <Link
              href="/register-company"
              className="text-sm text-barber-gold hover:underline"
            >
              ← Voltar ao Registro
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualPaymentCheck;
