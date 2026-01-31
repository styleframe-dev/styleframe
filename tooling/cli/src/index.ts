#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import { description, version } from "./package";

const main = defineCommand({
	meta: {
		name: "styleframe",
		version,
		description,
	},
	subCommands: {
		init: () => import("./commands/init").then((m) => m.default),
		build: () => import("./commands/build").then((m) => m.default),
		figma: () => import("./commands/figma").then((m) => m.default),
	},
});

export default function run() {
	runMain(main);
}

run();
