import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Mohit Verma · Product Builder",
    template: "%s · Mohit Verma",
  },
  description:
    "A living route through products, systems, experiments and the ideas connecting them.",
  keywords: [
    "Mohit Verma",
    "Product Builder",
    "Full-Stack Developer",
    "Next.js Developer",
    "AI Research",
    "Physics Research",
    "Healthcare Technology",
  ],
  authors: [
    {
      name: "Mohit Verma",
    },
  ],
  creator: "Mohit Verma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={spaceGrotesk.variable}
    >
      <body
        style={{
          fontFamily: "var(--font-space-grotesk)",
        }}
      >
        {children}
      </body>
    </html>
  );
}