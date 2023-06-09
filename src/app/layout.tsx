import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import menus from './menus.json';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: '5** ICT',
    description: 'note for ict',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#252525] relative`}>
                <NavBar menus={menus} />
                <main>
                    <div className="py-10 px-4 max-w-[1232px] min-h-[calc(100vh-64px-2.5rem-2.5rem)] items-center justify-center flex relative mx-auto gap-x-6">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}

export const runtime = 'edge';
