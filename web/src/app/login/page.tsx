"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const router = useRouter();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
      }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.email || !form.password) return;
        setCarregando(true);
        setErro('');
        try {
          // Simulação de autenticação
          await new Promise(resolve => setTimeout(resolve, 1500));
          router.push('/dashboard');
        } catch (error) {
          setErro('Credenciais inválidas. Por favor, tente novamente.');
        } finally {
          setCarregando(false);
        }
      }

    return (
        <div className="min-h-screen bg-background text-text flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-background rounded-2xl shadow-ld p-8 border border-border">
                <h1 className="text-2xl text-text text-center mb-6">Entrar no Cash Alto</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="seu@email.com"
                            autoComplete="off"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm">Senha</label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="••••••••"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-primary" />
                            <span>Lembrar senha</span>
                        </label>
                        <a href="#" className="text-primary hover:underline">Esqueceu a senha?</a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium"
                    >
                        Entrar
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted">
                    Não tem uma conta?{' '}
                    <a href="#" className="text-primary hover:underline">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
}



