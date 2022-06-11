import {
	saveToLocalStorage,
	getFromLocalStorage,
} from "../../js/local-storage.js";
import { page2Shown } from "../../js/router.js";

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

		// const page2Shown = new Event("page2Shown");
		document.body.dispatchEvent(page2Shown);
	});

	isInitDone = true;
}
