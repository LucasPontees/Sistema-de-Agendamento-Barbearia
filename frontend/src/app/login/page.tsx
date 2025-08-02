
'use client';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import NextNavbar from '@/components/NextNavbar';
import NextFooter from '@/components/NextFooter';
import { api } from '@/http/api'; // Adjust the import based on your API service setup

const Login: React.FC = () => {

    const [form, setForm] = useState({
        login: '',
        password: ''
    });

    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();
    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState("");



    const { toast } = useToast();



    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.login || !form.password) return;
        setCarregando(true);
        setErro('');
        try {

            await api.post("auth/login", {
                json: { login: form.login, password: form.password },
            });

            setMensagem("Login realizado com sucesso!");
            setTimeout(() => {
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);
            }, 1000);
        } catch (error) {
            setMensagem("Credenciais inválidas!");
            setTimeout(() => (setMensagem("")), 1000);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NextNavbar isAuthenticated={false} />

            <main className="flex-grow flex items-center justify-center py-12">
                <div className="container px-4">
                    <Card className="mx-auto max-w-md">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Login</CardTitle>
                            <CardDescription>
                                Digite suas credenciais para acessar sua conta
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login">Email</Label>
                                        <Input
                                            id="login"
                                            type="login"
                                            required
                                            name="login"
                                            placeholder="Login"
                                            value={form.login}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Senha</Label>
                                            <Link href="/forgot-password" className="text-sm text-barber-gold hover:underline">
                                                Esqueceu a senha?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-barber-gold hover:bg-barber-gold/90 text-black" disabled={isLoading}>
                                        {isLoading ? "Entrando..." : "Entrar"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-sm text-center text-muted-foreground">
                                Não tem uma conta?{" "}
                                <Link href="/register" className="text-barber-gold hover:underline">
                                    Registre-se
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </main>

            <NextFooter />
        </div>
    );
};

export default Login;
