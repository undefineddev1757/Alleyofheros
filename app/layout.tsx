import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import { LanguageProvider } from "./context/LanguageContext";
import TitleUpdater from "./components/TitleUpdater";

const eUkraineHead = localFont({
  src: [
    { path: "./fonts/e-UkraineHead-Thin.otf", weight: "100", style: "normal" },
    {
      path: "./fonts/e-UkraineHead-UltraLight.otf",
      weight: "200",
      style: "normal",
    },
    { path: "./fonts/e-UkraineHead-Light.otf", weight: "300", style: "normal" },
    {
      path: "./fonts/e-UkraineHead-Regular.otf",
      weight: "400",
      style: "normal",
    },
    { path: "./fonts/e-UkraineHead-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/e-UkraineHead-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-eukraine-head",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Алея Друзів",
  description: "Тут ми пам'ятаємо не лише подвиги, а й людину за ними",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${eUkraineHead.variable} ${eUkraineHead.className}`}>
        <LanguageProvider>
          <TitleUpdater />
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

