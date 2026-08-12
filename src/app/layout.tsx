import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LifeLink",
    template: "%s | LifeLink",
  },

  description:
    "LifeLink connects blood donors with people in need across Bangladesh.",
};

const themeScript = `
(function () {
  try {
    const savedTheme =
      localStorage.getItem("lifelink_theme");

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    const theme =
      savedTheme ||
      (prefersDark ? "dark" : "light");

    if (theme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body className="min-h-screen bg-[#F8FAFC] text-[#102A43] antialiased transition-colors duration-300 dark:bg-[#090D14] dark:text-slate-100">
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <div className="flex-1">
            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}