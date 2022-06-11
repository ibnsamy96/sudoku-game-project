// import {} from "./pages/login/login.js";
// import {} from "./pages/theme-selection/theme-selection.js";
// import {} from "./pages/game/game.js";

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
