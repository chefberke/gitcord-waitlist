import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gitcord | Waitlist",
  description:
    "Gitcord is a platform for developers to connect with other developers and share their projects.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>{children}</body>
    </html>
  );
}
