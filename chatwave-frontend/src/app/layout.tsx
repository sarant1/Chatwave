
import dotenv from "dotenv";
dotenv.config();


import { Inter } from "next/font/google";

import { AppChakraProvider } from "@/providers/chakra.provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatWave",
  description: "A messaging app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppChakraProvider>{children}</AppChakraProvider>
      </body>
    </html>
  );
}
