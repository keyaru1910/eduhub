import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/app/components/ScrollToTop";
import AppProviders from "@/app/components/Providers/AppProviders";
import Aoscompo from "@/utils/aos";
const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${font.className}`}>
                <style>{`:root{--banner-url: url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/banner/background.png'); --newsletter-url: url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/newsletter/hands.svg');}`}</style>
                <AppProviders>
                    <Aoscompo>
                        {children}
                    </Aoscompo>
                    <ScrollToTop />
                </AppProviders>
            </body>
        </html>
    );
}
