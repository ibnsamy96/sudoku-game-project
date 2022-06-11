import {
	saveToLocalStorage,
	getFromLocalStorage,
} from "../../js/local-storage.js";

const loginForm = document.querySelector("form");

// loginForm.parentElement

loginForm.addEventListener("submit", function (event) {
	event.preventDefault();
	// console.log(event.target.value);
	const name = event.target.elements.name.value;
	const level = event.target.elements.level.value;
	saveToLocalStorage("name", name);
	saveToLocalStorage("level", level);
});

(function () {
	document.querySelector("form #name").value =
		getFromLocalStorage("name") || "";
	document.querySelector("form #level").value =
		getFromLocalStorage("level") || "";
})();
