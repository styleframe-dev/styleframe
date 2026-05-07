import { defineCommand } from "citty";

export default defineCommand({
	meta: {
		name: "figma",
		description: "Sync Styleframe variables with Figma",
	},
	subCommands: {
		import: () => import("./import").then((m) => m.default),
	},
});
