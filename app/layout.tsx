import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteMate",
  description: "Order your own thoughts using NoteMate!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="h-[100vh] w-[100vw] bg-pink-50">
            <Navbar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
