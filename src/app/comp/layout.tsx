'use client'

import { LayoutContext } from '@/components/RootLayout';
import { ReactNode, useContext, useEffect } from 'react';
import menu from "./menu.json"

export default function Layout({ children }: { children: ReactNode }) {
    const {setSideBarMenu} = useContext(LayoutContext)
    useEffect(() => {
        setSideBarMenu(menu)
    }, [])
    return children;
}
