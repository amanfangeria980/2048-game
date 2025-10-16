// Board utility functions - Pure functional programming approach
// All functions are immutable and return new board states

export type Cell = number;
export type Board = Cell[][];

export interface MoveResult {
    board: Board;
    score: number;
    moved: boolean;
}

// Creates an empty board of given size
export const createEmptyBoard = (size: number): Board => {
    return Array.from({ length: size }, () => Array(size).fill(0));
};

// Gets all empty cell positions on the board
export const getEmptyCells = (board: Board): Array<[number, number]> => {
    const emptyCells: Array<[number, number]> = [];
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 0) {
                emptyCells.push([row, col]);
            }
        }
    }
    return emptyCells;
};

// Adds a random tile (2 or 4) to a random empty cell
// Returns new board (immutable)
export const addRandomTile = (board: Board): Board => {
    const emptyCells = getEmptyCells(board);
    if (emptyCells.length === 0) return board;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomIndex];
    const value = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4

    // Create new board with the new tile
    return board.map((r, i) =>
        i === row ? r.map((cell, j) => (j === col ? value : cell)) : [...r]
    );
};

// Initialize board with 2 random tiles
export const initializeBoard = (size: number = 4): Board => {
    let board = createEmptyBoard(size);
    board = addRandomTile(board);
    board = addRandomTile(board);
    return board;
};

// Slide and merge a single row to the left
// Returns { row: new row, score: points earned }
const slideAndMergeRow = (row: Cell[]): { row: Cell[]; score: number } => {
    // Filter out zeros (slide)
    let newRow = row.filter((cell) => cell !== 0);
    let score = 0;

    // Merge adjacent equal tiles
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            score += newRow[i];
            newRow[i + 1] = 0;
            i++; // Skip next tile as it's been merged
        }
    }

    // Filter out zeros again after merging
    newRow = newRow.filter((cell) => cell !== 0);

    // Pad with zeros to maintain row length
    while (newRow.length < row.length) {
        newRow.push(0);
    }

    return { row: newRow, score };
};

// Check if two boards are equal
const boardsEqual = (board1: Board, board2: Board): boolean => {
    if (board1.length !== board2.length) return false;
    for (let i = 0; i < board1.length; i++) {
        for (let j = 0; j < board1[i].length; j++) {
            if (board1[i][j] !== board2[i][j]) return false;
        }
    }
    return true;
};

// Move tiles left
export const moveLeft = (board: Board): MoveResult => {
    let totalScore = 0;
    const newBoard = board.map((row) => {
        const { row: newRow, score } = slideAndMergeRow(row);
        totalScore += score;
        return newRow;
    });

    return {
        board: newBoard,
        score: totalScore,
        moved: !boardsEqual(board, newBoard),
    };
};

// Move tiles right (reverse, move left, reverse back)
export const moveRight = (board: Board): MoveResult => {
    let totalScore = 0;
    const newBoard = board.map((row) => {
        const reversed = [...row].reverse();
        const { row: newRow, score } = slideAndMergeRow(reversed);
        totalScore += score;
        return newRow.reverse();
    });

    return {
        board: newBoard,
        score: totalScore,
        moved: !boardsEqual(board, newBoard),
    };
};

// Transpose board (swap rows and columns)
const transpose = (board: Board): Board => {
    return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
};

// Move tiles up (transpose, move left, transpose back)
export const moveUp = (board: Board): MoveResult => {
    const transposed = transpose(board);
    const { board: movedBoard, score, moved } = moveLeft(transposed);
    return {
        board: transpose(movedBoard),
        score,
        moved,
    };
};

// Move tiles down (transpose, move right, transpose back)
export const moveDown = (board: Board): MoveResult => {
    const transposed = transpose(board);
    const { board: movedBoard, score, moved } = moveRight(transposed);
    return {
        board: transpose(movedBoard),
        score,
        moved,
    };
};

// Check if player has won (has 2048 tile)
export const hasWon = (board: Board): boolean => {
    return board.some((row) => row.some((cell) => cell >= 2048));
};

// Check if any moves are possible
export const canMove = (board: Board): boolean => {
    // Check if there are empty cells
    if (getEmptyCells(board).length > 0) return true;

    // Check if any adjacent cells can merge horizontally
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length - 1; col++) {
            if (board[row][col] === board[row][col + 1]) return true;
        }
    }

    // Check if any adjacent cells can merge vertically
    for (let row = 0; row < board.length - 1; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === board[row + 1][col]) return true;
        }
    }

    return false;
};

// Get all tiles with their positions for rendering
export interface TilePosition {
    id: string;
    value: number;
    row: number;
    col: number;
}

export const getTilesWithPositions = (board: Board): TilePosition[] => {
    const tiles: TilePosition[] = [];
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] !== 0) {
                tiles.push({
                    id: `${row}-${col}-${board[row][col]}`,
                    value: board[row][col],
                    row,
                    col,
                });
            }
        }
    }
    return tiles;
};
