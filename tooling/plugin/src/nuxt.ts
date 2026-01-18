import type { NuxtModule } from "@nuxt/schema";
import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from "@nuxt/kit";
import type { Options } from "./types";
import vite from "./vite";
import webpack from "./webpack";

export interface ModuleOptions extends Options {}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "nuxt-unplugin-starter",
		configKey: "unpluginStarter",
	},
	defaults: {},
	setup(options, _nuxt) {
		addVitePlugin(vite(options));
		addWebpackPlugin(webpack(options));
	},
}) satisfies NuxtModule<ModuleOptions>;
