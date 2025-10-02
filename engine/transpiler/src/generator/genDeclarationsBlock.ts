import { indentLines } from "../utils";

export function genDeclarationsBlock(declarations: string[]) {
	return `{${declarations.length > 0 ? "\n" : ""}${declarations
		.map((declaration) => `${indentLines(`${declaration}`)}\n`)
		.join("")}}`;
}
