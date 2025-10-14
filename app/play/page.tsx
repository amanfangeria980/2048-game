import GameBox from "@/components/game-box/GameBox";
import React from "react";
import { Text } from "../../components/retroui/Text";

const GameScreen = () => {
    return (
        <div
            className="flex flex-col items-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/images/game.gif')" }}
        >
            <div className="flex-[20%] flex items-center justify-center">
                <Text as="h2" className="line-through">
                    2048 Game
                </Text>
            </div>
            <div className="flex-[80%] flex items-center justify-center">
                <GameBox />
            </div>
        </div>
    );
};

export default GameScreen;
