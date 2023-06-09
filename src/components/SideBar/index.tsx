'use client';

import styles from './sb.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useState } from 'react';
import { RiArrowRightSFill } from 'react-icons/ri';

export default function SideBar({ menu }: { menu: Menu }) {
    const pathList = usePathname().slice(1).split('/');
    const router = useRouter();
    const currentConfig = [menu];
    for (const p of pathList.slice(1, -1)) {
        const segment = currentConfig.at(-1)?.items.find(
            (item) => item.path === `/${p}`,
        );
        if (!segment) break;
        currentConfig.push(segment as Menu);
    }
    const [path, setPath] = useState([...currentConfig]);
    return (
        <div className="justify-between flex-col flex min-w-[250px] top-[121px] sticky [border-right:_1px_solid_#6e6e6e]">
            <div className="text-[12.5px] h-[70px]">
                {path.length !== 1 && (
                    <div className="flex">
                        {path.map(
                            (m, i) =>
                                i !== path.length - 1 && (
                                    <div key={m.path} className="flex">
                                        <div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const newPath = [...path];
                                                newPath.length = i + 1;
                                                setPath(newPath);
                                                if (newPath[i].isPage) {
                                                    router.push(
                                                        newPath[i]
                                                            .cumulativePath,
                                                    );
                                                }
                                            }}
                                            className="text-gray-400 hover:text-gray-200 cursor-pointer [transition:color_.2s_ease]"
                                        >
                                            {m.title}
                                        </div>
                                        <pre>{' > '}</pre>
                                    </div>
                                ),
                        )}
                    </div>
                )}
                <div className="text-[30px]">{path.at(-1)?.title}</div>
            </div>
            <div className="overflow-hidden relative">
                <nav
                    className={`overflow-y-scroll flex-col flex h-[calc(100vh-250px)] ${styles.sb}`}
                >
                    <ul>
                        {path.at(-1)?.items.map((item) => (
                            <li
                                key={item.path}
                                className={`my-1.5 ${
                                    item.path === `/${pathList[path.length]}`
                                        ? 'text-[#0074de]'
                                        : 'text-gray-300 hover:text-white'
                                } cursor-pointer text-[17.5px] [transition:color_.2s_ease] h-[30px]`}
                            >
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (item.items)
                                            setPath([...path, item]);
                                        if (item.isPage || !item.items)
                                            router.push(item.cumulativePath);
                                    }}
                                    className="flex items-center justify-between pr-[20px]"
                                >
                                    {item.title}{' '}
                                    {item.items && <RiArrowRightSFill />}
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export const MenuContext = createContext<string>('');

export type MenuLink = {
    title: string;
    items?: undefined;
    isPage?: undefined;
    path: string;
    cumulativePath: string;
};

export type Item = Menu | MenuLink;

export type Items = Item[];

export type Menu = {
    title: string;
    items: Items;
    path: string;
    isPage: boolean;
    cumulativePath: string;
};
