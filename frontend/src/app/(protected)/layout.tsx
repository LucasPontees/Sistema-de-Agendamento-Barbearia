import React from 'react';
import NextNavbar from '@/components/NextNavbar';
import NextFooter from '@/components/NextFooter';
export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="h-screen flex flex-col">

            <NextNavbar />

            <main >
                {children}
            </main>

            <NextFooter />
        </div>
    );
} 