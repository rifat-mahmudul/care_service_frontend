import "./globals.css";
import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";

const merriWeather = Merriweather({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", merriWeather.className)}>
        <ReactQueryProvider>  
        {children}
        </ReactQueryProvider>
        </body>
    </html>
  );
}
