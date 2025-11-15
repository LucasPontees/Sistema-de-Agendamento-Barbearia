import React from "react";
import NextNavbar from "@/components/NextNavbar";
import NextFooter from "@/components/NextFooter";
import { UserProvider } from "@/contexts/UserContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="h-screen flex flex-col">
        <NextNavbar />

        <main className="flex-grow">{children}</main>

        <NextFooter />
      </div>
    </UserProvider>
  );
}
