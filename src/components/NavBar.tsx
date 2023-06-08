"use client";

import { CountDown } from "./CountDown";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "./SideBar";

export default function NavBar({ menus }: { menus: Menu[] }) {
	const pathName = usePathname();
	const router = useRouter();
	return (
		<header className="w-full sticky top-0 h-[64px] flex items-center content-around z-[9999] px-[35px] bg-[#1e1e1e]">
			<nav className="w-full flex items-center">
				<div
					id="pcLinks"
					className="gap-[75px] flex items-center w-full"
				>
					<div className="font-[800] text-[30px]">5** ICT</div>
					{menus.map((menu) => (
						<div
							key={menu.path}
							className={`${
								pathName.startsWith(menu.path)
									? "text-[#0074de]"
									: "text-gray-300 hover:text-white"
							} [transition:color_.2s_ease] cursor-pointer h-full`}
							onClick={(e) => {
								e.preventDefault();
								router.push(menu.path);
							}}
						>
							{menu.title}
						</div>
					))}
				</div>
				<CountDown />
			</nav>
		</header>
	);
}
