import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RG restraunt",
  description: "Its a Next app project , Created by Rustam( Dipayan Chakraborty ) . A Restrraunt website .",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=" min-h-[90vh] relative bg-[#5b0017]">
          <div className=" h-[10vh] w-full absolute top-0 z-15">
            <Navbar />
          </div>
          
          {children}
        </div>
        <div className="bg-[#5b0017] ">
          <Footer />
        </div>
      </body>
    </html>
  );
}
