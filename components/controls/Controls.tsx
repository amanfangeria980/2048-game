import React from "react";
import { Button } from "../retroui/Button";

interface ControlsProps {
    onNewGame: () => void;
    onBoardSizeChange: (size: number) => void;
    currentBoardSize: number;
    gameStatus: "playing" | "won" | "lost";
}

const Controls: React.FC<ControlsProps> = ({
    onNewGame,
    onBoardSizeChange,
    currentBoardSize,
    gameStatus,
}) => {
    const boardSizes = [3, 4, 5, 6];

    const handleBoardSizeChange = (size: number) => {
        onBoardSizeChange(size);
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            {/* New Game Button */}
            <Button
                onClick={onNewGame}
                className="bg-green-400 hover:bg-green-500 border-4 border-black px-8 py-3 text-lg font-bold shadow-lg transition-all"
            >
                🔄 New Game
            </Button>

            {/* Board Size Selector */}
            <div className="bg-white border-4 border-black rounded-lg p-4 shadow-lg">
                <div className="text-sm font-bold text-gray-800 mb-2 text-center">
                    Board Size
                </div>
                <div className="flex gap-2">
                    {boardSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => handleBoardSizeChange(size)}
                            className={`
                px-4 py-2 font-bold rounded-lg border-2 border-black
                transition-all shadow-md
                ${
                    currentBoardSize === size
                        ? "bg-yellow-400 text-black scale-110"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
                        >
                            {size}×{size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Direction Buttons for Mobile/Touch */}
            <div className="bg-white border-4 border-black rounded-lg p-4 shadow-lg md:hidden">
                <div className="text-sm font-bold text-gray-800 mb-2 text-center">
                    Touch Controls
                </div>
                <div className="grid grid-cols-3 gap-2 w-48">
                    <div></div>
                    <button
                        onClick={() => {
                            const event = new KeyboardEvent("keydown", {
                                key: "ArrowUp",
                            });
                            window.dispatchEvent(event);
                        }}
                        className="bg-blue-400 hover:bg-blue-500 border-2 border-black rounded-lg p-3 font-bold text-xl"
                    >
                        ⬆️
                    </button>
                    <div></div>
                    <button
                        onClick={() => {
                            const event = new KeyboardEvent("keydown", {
                                key: "ArrowLeft",
                            });
                            window.dispatchEvent(event);
                        }}
                        className="bg-blue-400 hover:bg-blue-500 border-2 border-black rounded-lg p-3 font-bold text-xl"
                    >
                        ⬅️
                    </button>
                    <button
                        onClick={() => {
                            const event = new KeyboardEvent("keydown", {
                                key: "ArrowDown",
                            });
                            window.dispatchEvent(event);
                        }}
                        className="bg-blue-400 hover:bg-blue-500 border-2 border-black rounded-lg p-3 font-bold text-xl"
                    >
                        ⬇️
                    </button>
                    <button
                        onClick={() => {
                            const event = new KeyboardEvent("keydown", {
                                key: "ArrowRight",
                            });
                            window.dispatchEvent(event);
                        }}
                        className="bg-blue-400 hover:bg-blue-500 border-2 border-black rounded-lg p-3 font-bold text-xl"
                    >
                        ➡️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
