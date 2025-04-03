"use client";

import { SessionProvider } from "next-auth/react";

/*Wrapping children elements to ustilise session management in landing page*/

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
