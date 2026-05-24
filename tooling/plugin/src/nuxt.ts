import type { NuxtModule } from "@nuxt/schema";
import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from "@nuxt/kit";
import type { Options } from "./plugin";
import vite from "./vite";
import webpack from "./webpack";

export interface ModuleOptions extends Options {}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "nuxt-unplugin-starter",
		configKey: "unpluginStarter",
	},
	defaults: {},
	setup(options, nuxt) {
		if (nuxt.options.builder === "@nuxt/webpack-builder") {
			addWebpackPlugin(webpack(options));
		} else {
			addVitePlugin(vite(options));
		}
	},
}) satisfies NuxtModule<ModuleOptions>;
