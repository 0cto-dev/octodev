import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OctoDev",
  description: "OctoDev é uma aplicação web educacional voltada para o ensino de programação por meio de uma abordagem gamificada.",
  
};

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  viewportFit:'cover'
  // Other viewport properties can be added here
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" >
      <body>{children}</body>
    </html>
  );
}
