import {
	saveToLocalStorage,
	getFromLocalStorage,
} from "../../js/local-storage.js";
import { showThemeSelector } from "../../js/router.js";

let isInitDone = false;

export function initLoginPage() {
	const loginForm = document.querySelector("form");

	(function () {
		document.querySelector("form #name").value =
			getFromLocalStorage("name") || "";
		document.querySelector("form #level").value =
			getFromLocalStorage("level") || "";
	})();

	if (isInitDone) return;

	loginForm.addEventListener("submit", function (event) {
		event.preventDefault();
		const name = event.target.elements.name.value;
		const level = event.target.elements.level.value;
		saveToLocalStorage("name", name);
		saveToLocalStorage("level", level);

		// const showThemeSelector = new Event("showThemeSelector");
		document.body.dispatchEvent(showThemeSelector);
	});

	isInitDone = true;
}
