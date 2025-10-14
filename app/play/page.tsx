import React from "react";

const GameScreen = () => {
    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/images/game.gif')" }}
        >
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                2048 Game
            </h1>
        </div>
    );
};

export default GameScreen;
