import type { Metadata } from "next";
import { Geist_Mono, Bricolage_Grotesque, Libre_Franklin } from "next/font/google";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyle Morimoto - Portfolio",
  description: "Portfolio of Kyle Morimoto",
};

const themeScript = `
  (function () {
    try {
      var stored = window.localStorage.getItem("theme-preference");
      var preference =
        stored === "light" || stored === "dark" || stored === "system"
          ? stored
          : "system";
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var resolvedTheme = preference === "system" ? (systemDark ? "dark" : "light") : preference;

      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.dataset.themePreference = preference;
    } catch (error) {
      document.documentElement.dataset.theme = "light";
      document.documentElement.dataset.themePreference = "system";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${bricolage.variable} ${libreFranklin.variable} ${geistMono.variable} m-0 bg-[var(--background)] text-[var(--text-primary)] antialiased transition-colors duration-300`}
      >
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
