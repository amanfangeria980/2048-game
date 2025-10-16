import React from "react";

interface TileProps {
    value: number;
    row: number;
    col: number;
    boardSize: number;
}

/**
 * Get background color based on tile value
 */
const getTileColor = (value: number): string => {
    const colors: { [key: number]: string } = {
        2: "bg-yellow-100 text-gray-800",
        4: "bg-yellow-200 text-gray-800",
        8: "bg-orange-300 text-white",
        16: "bg-orange-400 text-white",
        32: "bg-orange-500 text-white",
        64: "bg-red-400 text-white",
        128: "bg-yellow-400 text-white",
        256: "bg-yellow-500 text-white",
        512: "bg-yellow-600 text-white",
        1024: "bg-yellow-700 text-white",
        2048: "bg-yellow-800 text-white",
    };

    return colors[value] || "bg-purple-600 text-white";
};

/**
 * Get font size based on tile value
 */
const getFontSize = (value: number): string => {
    if (value < 100) return "text-3xl md:text-4xl";
    if (value < 1000) return "text-2xl md:text-3xl";
    return "text-xl md:text-2xl";
};

const Tile: React.FC<TileProps> = ({ value, row, col, boardSize }) => {
    if (value === 0) return null;

    const tileColor = getTileColor(value);
    const fontSize = getFontSize(value);

    // Calculate tile size based on board size
    const getTileSize = () => {
        if (boardSize <= 4) return "w-20 h-20 md:w-24 md:h-24";
        if (boardSize === 5) return "w-16 h-16 md:w-20 md:h-20";
        return "w-14 h-14 md:w-16 md:h-16";
    };

    const tileSize = getTileSize();

    return (
        <div
            className={`
        absolute ${tileSize} ${tileColor} ${fontSize}
        rounded-lg font-bold flex items-center justify-center
        shadow-lg transition-all duration-200 ease-in-out
        border-2 border-gray-800
        animate-[scale-in_0.2s_ease-in-out]
      `}
            style={{
                top: `calc(${row} * (100% / ${boardSize}) + 0.5rem)`,
                left: `calc(${col} * (100% / ${boardSize}) + 0.5rem)`,
                width: `calc(100% / ${boardSize} - 1rem)`,
                height: `calc(100% / ${boardSize} - 1rem)`,
            }}
        >
            {value}
        </div>
    );
};

export default Tile;
