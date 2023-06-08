import path from "path";
import { promises as fs } from "fs";
import { Item, Items, Menu } from "@/components/SideBar";

async function getPaths(b: string, p: string): Promise<Item | null> {
	const currentP = path.join(b, p);
	let config: { title: string };
	try {
		config = await import(path.join(currentP, "config.json"));
	} catch (e) {
		return null;
	}

	const dirs = await fs.readdir(currentP);

	const hasDir = dirs.find((d) => !d.includes("."));

	const isPage = !!dirs.find((d) => d === "page.tsx");

	if (!hasDir) return { title: config.title, path: `/${p}` };

	const menu: Menu = {
		title: config.title,
		path: `/${p}`,
		isPage,
		items: [],
	};

	for (const dir of dirs) {
		const stats = await fs.stat(path.join(currentP, dir));
		if (!stats.isDirectory()) continue;
		const result = await getPaths(currentP, dir);
		result && menu.items.push(result);
	}

	return menu;
}

async function loopBase(p: string) {
	const dirs = await fs.readdir(p);

	const items: Items = [];

	for (const dir of dirs) {
		const stats = await fs.stat(path.join(p, dir));
		if (!stats.isDirectory()) continue;
		const result = await getPaths(p, dir);
		result && items.push(result);
	}

	return items;
}

function scanMenu(m: Menu, p: string, l: number = 0) {
	console.log("   ".repeat(l) + `└─ ${m.title}    ( ${p} )`);
	for (let i = 0; i < m.items.length; i++) {
		const item = m.items[i];
		item.cumulativePath = `${p}${item.path}`;
		if (!item.items) {
			console.log(
				"   ".repeat(l) + `   └─ ${item.title}    ( ${p}${item.path} )`
			);
		} else scanMenu(item, p + item.path, l + 1);
	}
}

async function collect(appDir: string) {
	const menus: Menu[] = [];

	const dirs = await fs.readdir(appDir);

	console.log("root    (/)");

	for (const dir of dirs) {
		const menuDir = path.join(appDir, dir);
		const stats = await fs.stat(menuDir);
		if (!stats.isDirectory()) continue;
		let config: { title: string };
		try {
			config = await import(path.join(menuDir, "config.json"));
		} catch (e) {
			continue;
		}
		const menu: Menu = {
			title: config.title,
			path: `/${dir}`,
			isPage: false,
			items: [],
		};
		menus.push({ ...menu });
		menu.items = await loopBase(menuDir);
		scanMenu(menu, `/${dir}`);
		const menuData = JSON.stringify(menu, null, 4);

		await fs.writeFile(path.join(menuDir, "menu.json"), menuData);
	}

	const menusTxt = JSON.stringify(menus, null, 4);

	await fs.writeFile(path.join(appDir, "menus.json"), menusTxt);
}

(async () => {
	await collect(path.join(__dirname, "../app"));
})();
