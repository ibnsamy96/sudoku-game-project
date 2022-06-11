const loginForm = document.querySelector("form");

// loginForm.parentElement

loginForm.addEventListener("submit", function (event) {
	event.preventDefault();
	console.log(event.target);
});
