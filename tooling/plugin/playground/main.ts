import "virtual:styleframe.css";
import "./button.styleframe?css";
import "./badge.styleframe?css";

import { h1 } from "virtual:styleframe";
import { buttonRecipe, buttonSelector } from "./button.styleframe?ts";
import { badge } from "./badge.styleframe?ts";

console.log(h1(), buttonRecipe(), buttonSelector, badge());
