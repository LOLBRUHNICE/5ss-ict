import { Fragment, ReactNode } from 'react';
import SideBar, { Menu } from '../SideBar';
import styles from './sb.module.css';

export default function MenuLayout({
    children,
    menu,
}: {
    children: ReactNode;
    menu: Menu;
}) {
    return (
        <Fragment>
            <SideBar menu={menu} />
            <div
                className={`overflow-hidden overflow-y-scroll h-[calc(100vh-64px-2.5rem-2.5rem)] w-full ${styles.sb} justify-center flex`}
            >
                {children}
            </div>
        </Fragment>
    );
}
