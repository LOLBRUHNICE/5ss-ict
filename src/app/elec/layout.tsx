import { ReactNode } from 'react';
import menu from './menu.json';
import MenuLayout from '@/components/MenuLayout';

export default function Layout({ children }: { children: ReactNode }) {
    return <MenuLayout menu={menu}>{children}</MenuLayout>;
}
