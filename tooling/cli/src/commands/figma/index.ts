import { defineCommand } from "citty";

export default defineCommand({
	meta: {
		name: "figma",
		description: "Sync Styleframe variables with Figma",
	},
	subCommands: {
		export: () => import("./export").then((m) => m.default),
		import: () => import("./import").then((m) => m.default),
	},
});
