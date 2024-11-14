import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GABAY | Guided AI Business Adviser for You",
  description: "Empowering businesses with the power of data and AI.",
  keywords: ["business", "empowerment", "GABAY", "next.js"],
  author: "JBEG Clutchers",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  robots: "index, follow",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="sm:hidden">{children}</div>
      </body>
    </html>
  );
} 
