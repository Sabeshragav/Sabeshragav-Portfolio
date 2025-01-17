import "@styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
// import UnderDevelopment from "@/components/UnderDevelopment";
import AllProvider from "@providers/AllProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const logo = "/icons/logo.svg";

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
  title: "Sabeshragav's Portfolio",
  description:
    "A professional portfolio to explore and connect with Sabeshragav G K",
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
          <SpeedInsights />
          <Analytics />
        </AllProvider>
      </body>
    </html>
  );
}
