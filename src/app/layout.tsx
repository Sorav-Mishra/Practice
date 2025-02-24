"use client";

import NavBar from "@/pages/Navbar";
import "./globals.css";
// import NavBar from "@/pages/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
