import { genDeclaration } from "./genDeclaration";
import { genSafeVariableName } from "./genSafeVariableName";

export function genDeclareVariable(name: string, value: string) {
	return genDeclaration(genSafeVariableName(name), value);
}
