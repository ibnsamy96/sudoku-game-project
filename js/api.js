const api = "https://sudoku-api.deta.dev/?type=";

export async function fetchBoard(cellsPerRow) {
	try {
		const response = await fetch(
			"https://sudoku-api.deta.dev/?type=" + cellsPerRow
		);
		const board = await response.json();
		return board;
	} catch (error) {
		console.error(error);
	}
}

// fetchBoard(4);
