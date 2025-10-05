import { defineCommand, runMain } from "citty";
import { version, description } from "./package";

const main = defineCommand({
	meta: {
		name: "styleframe",
		version,
		description,
	},
	subCommands: {
		init: () => import("./commands/init").then((m) => m.default),
		build: () => import("./commands/build").then((m) => m.default),
	},
});

runMain(main);
