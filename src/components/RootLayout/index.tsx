'use client';

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import NavBar from '../NavBar';
import SideBar, { Menu } from '../SideBar';
import { createContext } from 'react';

export const LayoutContext = createContext<{
    sideBarMenu?: Menu
    setSideBarMenu: Dispatch<SetStateAction<Menu | undefined>>;
    setDisplaySideBar: Dispatch<SetStateAction<boolean>>;
    windowDimensions: {
        width: number;
        height: number;
        isWindow: boolean;
    };
}>({
    setSideBarMenu: () => {
        return;
    },
    setDisplaySideBar: () => {
        return;
    },
    windowDimensions: { width: 0, height: 0, isWindow: false },
    sideBarMenu: undefined,
});

export default function RootLayout({
    menus,
    children,
}: {
    menus: Menu[];
    children: ReactNode;
}) {
    const [sideBarMenu, setSideBarMenu] = useState<Menu | undefined>(undefined);
    const [displaySideBar, setDisplaySideBar] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions(),
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <LayoutContext.Provider
            value={{
                sideBarMenu,
                setSideBarMenu,
                setDisplaySideBar,
                windowDimensions,
            }}
        >
            <NavBar menus={menus} />
            <main>
                <div className="px-4 max-w-[1300px] h-[calc(100vh-64px)] flex relative mx-auto gap-x-4">
                    {(windowDimensions.isWindow || displaySideBar) && (
                        <SideBar />
                    )}
                    <div className="w-full justify-center flex">{children}</div>
                </div>
            </main>
        </LayoutContext.Provider>
    );
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
        isWindow: width > 1000,
    };
}
