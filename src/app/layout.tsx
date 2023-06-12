import './globals.scss';
import { Inter } from 'next/font/google';
import menus from './menus.json';
import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import RootLayout from '@/components/RootLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: '5** ICT',
    description: 'note for ict',
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} relative`}>
                <RootLayout menus={menus}>
                    {children}
                </RootLayout>
            </body>
            <Analytics />
        </html>
    );
}

export const runtime = 'edge';
