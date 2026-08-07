import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Org-Vote | Stellar Governance",
  description:
    "Open-source organizational voting on Stellar and Soroban. Create polls, cast votes, and view live results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
