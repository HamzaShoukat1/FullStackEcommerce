import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ReduxProvider from "./Store/provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tremenda - Best Clothes",
  description: "Tremenda is a best place to find clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="mx-auto  p-4  sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl ">
      <ReduxProvider>
  <Navbar />
  {children}
  <Footer />
</ReduxProvider>
        </div>
      </body>
    </html>
  );
}
