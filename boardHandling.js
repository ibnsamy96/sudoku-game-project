import { Board } from "./components/board.js";

const problem = ".31.1.....2.2.43".split("");
const solution = "4312123434212143".split("");

const problem2 =
	"...98.2.....13..8.7..2.6..4.23..5..8....1..2669837..5...1...9..86....51.972.418..".split(
		""
	);
const solution2 =
	"316984275245137689789256134123465798457819326698372451531628947864793512972541863".split(
		""
	);

window.x = new Board(4, problem, solution).cellsArray;
window.y = new Board(9, problem2, solution2).cellsArray;

// console.log(board[0]);
