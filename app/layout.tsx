import type { Metadata } from "next";
import { clashDisplay } from "@/app/fonts";
import "./globals.css";
import NavBar from "@/components/reuseable/navBar";
import Footer from "@/components/reuseable/Footer";
import SmoothScroller from "@/layout/SmoothScroller";
import Loader from "@/components/reuseable/loader";

export const metadata: Metadata = {
  title: "Cairn Hotel",
  description: "Experience premium luxury at Cairn Hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${clashDisplay.variable} antialiased`}>
      <body className={`${clashDisplay.className} min-h-screen flex flex-col antialiased`}>
        <SmoothScroller>
          <Loader/>
          <NavBar />
          {children}
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}
