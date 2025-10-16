import React from "react";
import Tile from "../tile/Tile";
import { getTilesWithPositions, Board } from "@/app/utils/boardUtils";
import { GameStatus } from "@/app/hooks/useGameLogic";

interface GameBoxProps {
    board: Board;
    boardSize: number;
    gameStatus: GameStatus;
    onRestart: () => void;
}

const GameBox: React.FC<GameBoxProps> = ({
    board,
    boardSize,
    gameStatus,
    onRestart,
}) => {
    const tiles = getTilesWithPositions(board);

    // Calculate grid size based on board size
    const getGridSize = () => {
        if (boardSize <= 4)
            return "w-[350px] h-[350px] md:w-[420px] md:h-[420px]";
        if (boardSize === 5)
            return "w-[350px] h-[350px] md:w-[420px] md:h-[420px]";
        return "w-[350px] h-[350px] md:w-[420px] md:h-[420px]";
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Game Board Container */}
            <div
                className={`
          ${getGridSize()}
          bg-gray-300 rounded-xl p-2
          border-4 border-black shadow-xl
          relative
        `}
            >
                {/* Grid Background */}
                <div
                    className="absolute inset-2 grid gap-2"
                    style={{
                        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
                    }}
                >
                    {Array.from({ length: boardSize * boardSize }).map(
                        (_, index) => (
                            <div
                                key={index}
                                className="bg-gray-400 rounded-lg border-2 border-gray-500"
                            />
                        )
                    )}
                </div>

                {/* Tiles */}
                <div className="absolute inset-0 p-2">
                    {tiles.map((tile) => (
                        <Tile
                            key={tile.id}
                            value={tile.value}
                            row={tile.row}
                            col={tile.col}
                            boardSize={boardSize}
                        />
                    ))}
                </div>

                {/* Game Over Overlay */}
                {(gameStatus === "won" || gameStatus === "lost") && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                        <div className="bg-white border-4 border-black rounded-xl p-8 text-center shadow-2xl">
                            {gameStatus === "won" ? (
                                <>
                                    <div className="text-5xl mb-4">🎉</div>
                                    <h2 className="text-3xl font-bold mb-2 text-green-600">
                                        You Won!
                                    </h2>
                                    <p className="text-gray-700 mb-6">
                                        You reached 2048! Congratulations!
                                    </p>
                                    <div className="flex gap-3 justify-center">
                                        <button
                                            onClick={onRestart}
                                            className="bg-green-400 hover:bg-green-500 border-2 border-black px-6 py-2 rounded-lg font-bold shadow-md transition-all"
                                        >
                                            New Game
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-5xl mb-4">😢</div>
                                    <h2 className="text-3xl font-bold mb-2 text-red-600">
                                        Game Over!
                                    </h2>
                                    <p className="text-gray-700 mb-6">
                                        No more moves available. Try again!
                                    </p>
                                    <button
                                        onClick={onRestart}
                                        className="bg-red-400 hover:bg-red-500 border-2 border-black px-6 py-2 rounded-lg font-bold shadow-md transition-all"
                                    >
                                        Try Again
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Instructions */}
            <div className="text-center mt-2">
                <p className="text-sm font-bold text-gray-800 bg-yellow-100 px-4 py-2 rounded-lg border-2 border-black">
                    Use Arrow Keys or WASD to play
                </p>
            </div>
        </div>
    );
};

export default GameBox;
