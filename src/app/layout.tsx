import { Nunito, Oswald, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import ScrollToTop from '@/app/components/ScrollToTop';
import AppProviders from '@/app/components/Providers/AppProviders';
import Aoscompo from '@/utils/aos';
import NextTopLoader from 'nextjs-toploader';

const nunito = Nunito({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-nunito',
});

const oswald = Oswald({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-oswald',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
    title: {
        default: "Edu Hub",
        template: "%s | Edu Hub",
    },
    description:
        "Nền tảng giới thiệu khóa học, mentor và tiếp nhận nhu cầu tư vấn cho bản demo Edu Hub.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='vi' suppressHydrationWarning data-scroll-behavior='smooth'>
            <body className={`${nunito.variable} ${oswald.variable} ${spaceGrotesk.variable}`}>
                <NextTopLoader color='#0052cc' showSpinner={false} />
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
