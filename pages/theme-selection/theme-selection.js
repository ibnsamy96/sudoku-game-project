const themeSelectorElement = document.querySelectorAll(".theme-selector");

themeSelectorElement.forEach((el) => {
	el.addEventListener("click", function () {
		const currentTheme = document.body.dataset.theme;
		document.querySelector("." + currentTheme).classList.remove("selected");
		document.body.dataset.theme = this.classList[1];
		this.classList.add("selected");
	});
});

const carousalPreviousBTNs = document.querySelectorAll(".previous");
const carousalNextBTNs = document.querySelectorAll(".next");

function carousalMovement(event) {
	event.stopPropagation();

	const imagesElementContainer =
		this.classList[0] === "previous"
			? this.nextElementSibling
			: this.previousElementSibling;
	const imagesElement = imagesElementContainer.querySelector(".images");

	let imagesElementCurrentLeft = imagesElement.style.left || "0px";
	imagesElementCurrentLeft = parseInt(imagesElementCurrentLeft);

	const imagesElementWidth = imagesElement.scrollWidth;
	const containerElementWidth = imagesElement.parentElement.clientWidth;

	if (this.classList[0] === "previous") {
		if (imagesElementCurrentLeft + 100 >= 0) {
			imagesElement.style.left = 0 + "px";
		} else {
			imagesElement.style.left = imagesElementCurrentLeft + 100 + "px";
		}
	} else {
		if (
			imagesElementCurrentLeft - 100 <=
			-(imagesElementWidth - containerElementWidth)
		) {
			imagesElement.style.left =
				-(imagesElementWidth - containerElementWidth) + "px";
		} else {
			imagesElement.style.left = imagesElementCurrentLeft - 100 + "px";
		}
	}
}

carousalPreviousBTNs.forEach((btn) => {
	btn.addEventListener("click", carousalMovement);
});

carousalNextBTNs.forEach((btn) => {
	btn.addEventListener("click", carousalMovement);
});
