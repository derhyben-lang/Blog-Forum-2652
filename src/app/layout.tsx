import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "@/visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "sonner";
import { ChatProvider } from "@/lib/context/ChatContext";
import ChatWidget from "@/components/chat/ChatWidget";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog & Forum - Communauté Tech",
  description: "Découvrez nos articles sur le développement web, partagez vos idées et rejoignez une communauté passionnée de développeurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <Suspense fallback={<div className="h-16 border-b" />}>
          <Header />
        </Suspense>
        <ChatProvider>
          {children}
          <ChatWidget />
        </ChatProvider>
        <Footer />
        <Toaster position="top-center" richColors />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}