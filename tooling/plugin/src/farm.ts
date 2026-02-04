// biome-ignore:lint/correctness/noUnusedImports
import type { CompilationContext, JsPlugin } from "@farmfe/core";
import { createFarmPlugin } from "unplugin";
import { unpluginFactory } from "./plugin";

export default createFarmPlugin(unpluginFactory);
