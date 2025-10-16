import { useState, useEffect, useCallback } from "react";
import {
    Board,
    initializeBoard,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    addRandomTile,
    canMove,
    hasWon,
    MoveResult,
} from "../utils/boardUtils";

export type GameStatus = "playing" | "won" | "lost";

export interface GameState {
    board: Board;
    score: number;
    bestScore: number;
    gameStatus: GameStatus;
    boardSize: number;
}

const BEST_SCORE_KEY = "2048-best-score";

// Custom hook for managing 2048 game logic
export const useGameLogic = (initialSize: number = 4) => {
    const [boardSize, setBoardSize] = useState(initialSize);
    const [board, setBoard] = useState<Board>(() => initializeBoard(boardSize));
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

    // Load best score from localStorage on mount (client-side only)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(BEST_SCORE_KEY);
            if (saved) {
                setBestScore(parseInt(saved, 10));
            }
        }
    }, []);

    // Update best score in localStorage
    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
            if (typeof window !== "undefined") {
                localStorage.setItem(BEST_SCORE_KEY, score.toString());
            }
        }
    }, [score, bestScore]);

    // Check game status after each move
    useEffect(() => {
        if (gameStatus === "playing") {
            if (hasWon(board)) {
                setGameStatus("won");
            } else if (!canMove(board)) {
                setGameStatus("lost");
            }
        }
    }, [board, gameStatus]);

    // Handle a move in the specified direction
    const handleMove = useCallback(
        (moveFunction: (board: Board) => MoveResult) => {
            if (gameStatus !== "playing") return;

            const result = moveFunction(board);

            if (result.moved) {
                // Add score from merged tiles
                setScore((prev) => prev + result.score);

                // Add new tile after move
                const newBoard = addRandomTile(result.board);
                setBoard(newBoard);
            }
        },
        [board, gameStatus]
    );

    // Move handlers for each direction
    const handleMoveLeft = useCallback(() => {
        handleMove(moveLeft);
    }, [handleMove]);

    const handleMoveRight = useCallback(() => {
        handleMove(moveRight);
    }, [handleMove]);

    const handleMoveUp = useCallback(() => {
        handleMove(moveUp);
    }, [handleMove]);

    const handleMoveDown = useCallback(() => {
        handleMove(moveDown);
    }, [handleMove]);

    // Restart the game with current or new board size
    const restartGame = useCallback(
        (newSize?: number) => {
            const size = newSize || boardSize;
            setBoardSize(size);
            setBoard(initializeBoard(size));
            setScore(0);
            setGameStatus("playing");
        },
        [boardSize]
    );

    // Keyboard event handler
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Prevent default behavior for arrow keys
            if (
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
                    event.key
                )
            ) {
                event.preventDefault();
            }

            switch (event.key) {
                case "ArrowLeft":
                case "a":
                case "A":
                    handleMoveLeft();
                    break;
                case "ArrowRight":
                case "d":
                case "D":
                    handleMoveRight();
                    break;
                case "ArrowUp":
                case "w":
                case "W":
                    handleMoveUp();
                    break;
                case "ArrowDown":
                case "s":
                case "S":
                    handleMoveDown();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleMoveLeft, handleMoveRight, handleMoveUp, handleMoveDown]);

    return {
        board,
        score,
        bestScore,
        gameStatus,
        boardSize,
        handleMoveLeft,
        handleMoveRight,
        handleMoveUp,
        handleMoveDown,
        restartGame,
    };
};
