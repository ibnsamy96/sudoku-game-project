import { initLoginPage } from "../pages/login/login.js";
import { initThemeSelectionPage } from "../pages/theme-selection/theme-selection.js";
import { initGamePage, clearGamePage } from "../pages/game/game.js";

import { getFromLocalStorage, saveToLocalStorage } from "./local-storage.js";

(function () {
	const savedTheme = getFromLocalStorage("theme");
	if (savedTheme) {
		document.body.dataset.theme = savedTheme;
		return;
	}
	document.body.dataset.theme = "egyptian";
	saveToLocalStorage("theme", "egyptian");
})();

window.addEventListener("load", initLoginPage);

document.body.addEventListener("showLogin", function (event) {
	event.stopPropagation();
	document.querySelector("#login-page").classList.remove("d-none");
	document.querySelector("#theme-selection-page").classList.add("d-none");
	document.querySelector("#game-page").classList.add("d-none");
	initLoginPage();
});

document.body.addEventListener("showThemeSelector", function (event) {
	event.stopPropagation();
	document.querySelector("#login-page").classList.add("d-none");
	document.querySelector("#theme-selection-page").classList.remove("d-none");
	document.querySelector("#game-page").classList.add("d-none");
	initThemeSelectionPage();
});

document.body.addEventListener("showGame", function (event) {
	event.stopPropagation();
	if (document.querySelector("#game-page")) clearGamePage();
	document.querySelector("#login-page").classList.add("d-none");
	document.querySelector("#theme-selection-page").classList.add("d-none");
	document.querySelector("#loader-container").classList.remove("d-none");
	console.log("eventFired");
	initGamePage();
});
