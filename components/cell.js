export class Cell {
	#element;
	#top;
	#left;
	#right;
	#bottom;
	#activeState;
	#currentValue = 0;
	#answerValue;

	constructor() {
		this.#element = document.createElement("div");
		// this.#currentValue = currentValue;
	}

	get element() {
		return this.#element;
	}

	get top() {
		return this.#top;
	}
	set top(squareObject) {
		this.#top = squareObject;
	}

	get left() {
		return this.#left;
	}
	set left(squareObject) {
		this.#left = squareObject;
	}

	get right() {
		return this.#right;
	}
	set right(squareObject) {
		this.#right = squareObject;
	}

	get bottom() {
		return this.#bottom;
	}
	set bottom(squareObject) {
		this.#bottom = squareObject;
	}

	get currentValue() {
		return this.#currentValue;
	}
	set currentValue(number) {
		const parsedNumber = parseInt(number);
		if (isNaN(parsedNumber)) return;
		this.#currentValue = parsedNumber;
	}

	get answerValue() {
		return this.#answerValue;
	}
	set answerValue(number) {
		const parsedNumber = parseInt(number);
		this.#answerValue = parsedNumber;
	}

	get activeState() {
		return this.#activeState;
	}
	focus() {
		this.#activeState = true;
		this.#element.classList.add("active");
	}
	unfocus() {
		this.#activeState = false;
		this.#element.classList.remove("active");
	}
}
