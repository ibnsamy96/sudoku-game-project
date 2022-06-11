import { initLoginPage } from "./pages/login/login.js";
import { initThemeSelectionPage } from "./pages/theme-selection/theme-selection.js";
import { initGamePage, clearGamePage } from "./pages/game/game.js";

import { getFromLocalStorage, saveToLocalStorage } from "./js/local-storage.js";

/*
 TODO 
the router imports the right js file and remove d-none from the right element
*/

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

// const loginForm = document.querySelector("form");
// loginForm.addEventListener("submit", function (event) {
// 	document.querySelector("#login-page").classList.add("d-none");
// 	document.querySelector("#theme-selection-page").classList.remove("d-none");
// 	// initThemeSelectionPage();
// 	document.body.dispatchEvent(page2Shown);
// });

// const page3Shown = new Event("page3Shown");

document.body.addEventListener("page1Shown", function (event) {
	event.stopPropagation();
	document.querySelector("#login-page").classList.remove("d-none");
	document.querySelector("#theme-selection-page").classList.add("d-none");
	document.querySelector("#game-page").classList.add("d-none");
	initLoginPage();
	// document.body.dispatchEvent(page2Shown);
});

document.body.addEventListener("page2Shown", function (event) {
	event.stopPropagation();
	document.querySelector("#login-page").classList.add("d-none");
	document.querySelector("#theme-selection-page").classList.remove("d-none");
	document.querySelector("#game-page").classList.add("d-none");
	initThemeSelectionPage();
	// document.body.dispatchEvent(page2Shown);
});

document.body.addEventListener("page3Shown", function (event) {
	event.stopPropagation();
	if (document.querySelector("#game-page")) clearGamePage();
	document.querySelector("#login-page").classList.add("d-none");
	document.querySelector("#theme-selection-page").classList.add("d-none");
	// document.querySelector("#game-page").classList.remove("d-none");
	document.querySelector("#loader-container").classList.remove("d-none");
	console.log("eventFired");
	initGamePage();
});
