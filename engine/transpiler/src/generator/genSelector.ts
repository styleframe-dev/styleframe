import { genDeclarationsBlock } from "./genDeclarationsBlock";

export function genSelector(query: string, declarations: string[]): string {
	return `${query} ${genDeclarationsBlock(declarations)}`;
}
