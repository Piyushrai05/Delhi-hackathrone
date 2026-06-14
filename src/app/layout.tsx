import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Route Resilience | ISRO Geospatial Analytics",
  description: "Futuristic Geospatial Analytics Platform for Urban Mobility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-space text-foreground">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 ml-64 p-6 min-h-screen relative overflow-hidden bg-space">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-96 bg-isro/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 h-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
