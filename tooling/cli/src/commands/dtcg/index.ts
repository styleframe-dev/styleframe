import { defineCommand } from "citty";

export default defineCommand({
	meta: {
		name: "dtcg",
		description: "Export Styleframe variables in DTCG format",
	},
	subCommands: {
		export: () => import("./export").then((m) => m.default),
	},
});
