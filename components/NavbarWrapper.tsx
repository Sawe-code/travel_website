// components/NavbarWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
