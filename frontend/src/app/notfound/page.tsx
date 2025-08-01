import { usePathname } from 'next/navigation';

import { useEffect } from "react";

const NotFound = () => {
    const pathname = usePathname();

    useEffect(() => {
        console.error(
            "Erro 404: Usuário tentou acessar uma rota inexistente:",
            pathname
        );
    }, [pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <img src="/error-404.png" alt="Barber VIP Club" className="h-100 w-100" />
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-4">Ops! Página não encontrada</p>
                <a href="/" className="text-blue-500 hover:text-blue-700 underline">
                    Voltar para a Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
