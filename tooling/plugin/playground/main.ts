import "virtual:styleframe.css";
import "./button.styleframe.css";
import "./badge.styleframe.css";

import { h1 } from "virtual:styleframe";
import { button } from "./button.styleframe";
import { badge } from "./badge.styleframe";

console.log(h1(), button(), badge());
