import "@styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import UnderDevelopment from "@/components/UnderDevelopment";
import AllProvider from "@providers/AllProvider";

const logo = "/logo.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  icons: logo,
  title: "Sabeshragav",
  description:
    "A professional blogspot to explore and connect with Sabeshragav G K",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased black_gray_gradient`}
      >
        <AllProvider>
          {/* <UnderDevelopment /> */}
          {children}
        </AllProvider>
      </body>
    </html>
  );
}
