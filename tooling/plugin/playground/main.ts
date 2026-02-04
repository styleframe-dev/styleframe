// Import global CSS - includes all tokens from config + all styleframe files
import "virtual:styleframe.css";

// Import exports from virtual:styleframe (aggregated from all files)
import {
	h1,
	buttonRecipe,
	buttonSelector,
	badge,
	badgeSelector,
} from "virtual:styleframe";

console.log("h1:", h1());
console.log("buttonRecipe:", buttonRecipe());
console.log("buttonSelector:", buttonSelector);
console.log("badge:", badge());
console.log("badgeSelector:", badgeSelector);
