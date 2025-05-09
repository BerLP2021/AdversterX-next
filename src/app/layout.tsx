import type { Metadata } from "next";
import Image from "next/image";
import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google";
import Header from "@/components/header";
import { MatchMediaProvider } from "@/components/context";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test App for AdversterX",
  description: "Made with care by @ThalerTimm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} mx-auto flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MatchMediaProvider>
            <Header />
            <main className="container flex flex-1 flex-col items-center gap-[32px]">
              {children}
            </main>
            <footer className="mt-5 lg:mt-10 border-t border-gray-200 flex flex-wrap items-center justify-center gap-3 lg:gap-6 py-5 lg:py-10">
              <Image
                src="/logo.png"
                alt="It's me"
                width={70}
                height={70}
                className="rounded-full"
              />
              <p className="text-lg text-center">
                Created for <span className="font-bold">AdversterX</span> by{' '}
                <a
                  href="https://t.me/ThalerTimm"
                  target="_blank"
                  className="font-bold text-blue-400 [text-underline-position:under] text-shadow-blue-200 hover:underline"
                >
                  @ThalerTimm
                </a>
              </p>
            </footer>
          </MatchMediaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
