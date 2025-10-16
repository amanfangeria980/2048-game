"use client";

import GameBox from "@/components/game-box/GameBox";
import ScoreBoard from "@/components/scoreboard/ScoreBoard";
import Controls from "@/components/controls/Controls";
import React from "react";
import { Text } from "../../components/retroui/Text";
import { useGameLogic } from "../hooks/useGameLogic";

const GameScreen = () => {
    const { board, score, bestScore, gameStatus, boardSize, restartGame } =
        useGameLogic(4); // Start with 4x4 board

    const handleBoardSizeChange = (size: number) => {
        restartGame(size);
    };

    return (
        <div
            className="flex flex-col items-center min-h-screen bg-cover bg-center py-8 px-4"
            style={{ backgroundImage: "url('/assets/images/game.gif')" }}
        >
            {/* Title */}
            <div className="mb-6">
                <Text as="h2" className="line-through text-4xl md:text-5xl">
                    2048 Game
                </Text>
            </div>

            {/* Main Game Layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
                {/* Left Side - Scoreboard and Controls */}
                <div className="flex flex-col gap-6">
                    <ScoreBoard
                        score={score}
                        bestScore={bestScore}
                        gameStatus={gameStatus}
                    />
                    <Controls
                        onNewGame={() => restartGame()}
                        onBoardSizeChange={handleBoardSizeChange}
                        currentBoardSize={boardSize}
                        gameStatus={gameStatus}
                    />
                </div>

                {/* Right Side - Game Board */}
                <div>
                    <GameBox
                        board={board}
                        boardSize={boardSize}
                        gameStatus={gameStatus}
                        onRestart={() => restartGame()}
                    />
                </div>
            </div>

            {/* Game Info */}
            <div className="mt-8 bg-white/90 border-4 border-black rounded-lg p-6 max-w-2xl shadow-xl">
                <h3 className="text-xl font-bold mb-3 text-center">
                    How to Play
                </h3>
                <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>
                        Use <strong>Arrow Keys</strong> or <strong>WASD</strong>{" "}
                        to move tiles
                    </li>
                    <li>
                        When two tiles with the same number touch, they{" "}
                        <strong>merge into one</strong>
                    </li>
                    <li>
                        Reach the <strong>2048</strong> tile to win!
                    </li>
                    <li>
                        Game ends when no more moves are possible or you reach
                        2048
                    </li>
                    <li>
                        Choose different board sizes (3×3 to 6×6) for different
                        challenges
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default GameScreen;
