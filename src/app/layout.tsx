import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/custom/footer/footer";
import Header from "@/components/custom/header/header";
import { Suspense } from "react";
import Loading from "./loading";

import dotenv from 'dotenv';
import { Toaster } from "sonner";
dotenv.config()
export const metadata: Metadata = {
  title: "NGUYÊN THỐNG JP - TƯ VẤN THIẾT KẾ & THI CÔNG XÂY DỰNG",
  description: "Đơn vị thiết kế thi công kiến trúc chuyên nghiệp và uy tín tại Đà Nẵng",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="vi" suppressHydrationWarning>
      {/* <body className={`${quicksand.variable} ${inter.variable} ${jetbrains.variable} font-mono antialiased`}> */}
      <body className="font-calibri antialiased">
        <Suspense fallback={<Loading />}>
          <Header />
        </Suspense>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
