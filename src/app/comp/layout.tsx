import styles from "./sb.module.css";

import { Fragment, ReactNode } from "react";
import menu from "./menu.json";
import SideBar from "@/components/SideBar";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<SideBar menu={menu} />
			<div
				className={`overflow-hidden overflow-y-scroll h-[calc(100vh-150px)] w-full ${styles.sb} items-center justify-center flex`}
			>
				{children}
			</div>
		</Fragment>
	);
}
