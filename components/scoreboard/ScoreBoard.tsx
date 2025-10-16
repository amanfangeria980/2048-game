import React from "react";
import { GameStatus } from "@/app/hooks/useGameLogic";

interface ScoreBoardProps {
    score: number;
    bestScore: number;
    gameStatus: GameStatus;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
    score,
    bestScore,
    gameStatus,
}) => {
    return (
        <div className="flex flex-col gap-4 items-center">
            {/* Score Display */}
            <div className="flex gap-4">
                {/* Current Score */}
                <div className="bg-yellow-400 border-4 border-black rounded-lg p-4 shadow-lg min-w-[120px]">
                    <div className="text-xs font-bold text-gray-800 uppercase">
                        Score
                    </div>
                    <div className="text-3xl font-bold text-black">{score}</div>
                </div>

                {/* Best Score */}
                <div className="bg-orange-400 border-4 border-black rounded-lg p-4 shadow-lg min-w-[120px]">
                    <div className="text-xs font-bold text-gray-800 uppercase">
                        Best
                    </div>
                    <div className="text-3xl font-bold text-black">
                        {bestScore}
                    </div>
                </div>
            </div>

            {/* Game Status Badge */}
            {gameStatus === "won" && (
                <div className="bg-green-400 border-4 border-black rounded-lg px-6 py-3 shadow-lg animate-bounce">
                    <div className="text-xl font-bold text-black">
                        🎉 You Won! 🎉
                    </div>
                </div>
            )}

            {gameStatus === "lost" && (
                <div className="bg-red-400 border-4 border-black rounded-lg px-6 py-3 shadow-lg">
                    <div className="text-xl font-bold text-white">
                        Game Over!
                    </div>
                </div>
            )}

            {gameStatus === "playing" && (
                <div className="bg-blue-400 border-4 border-black rounded-lg px-6 py-3 shadow-lg">
                    <div className="text-lg font-bold text-black">
                        Keep Going! 🎮
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScoreBoard;
