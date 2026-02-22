import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import SelectorsPage from "./pages/SelectorsPage.vue";
import UtilitiesPage from "./pages/UtilitiesPage.vue";

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: "/", component: HomePage },
		{ path: "/selectors", component: SelectorsPage },
		{ path: "/utilities", component: UtilitiesPage },
	],
});
