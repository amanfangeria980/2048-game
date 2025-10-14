"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeOff } from "lucide-react";
import { Button } from "./retroui/Button";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = true;

        const playAudio = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
                // ✅ unmute after playback starts
                audio.muted = false;
                setIsMuted(false);
            } catch (error) {
                console.log("Autoplay prevented, waiting for user interaction");
                const handleFirstClick = async () => {
                    try {
                        await audio.play();
                        setIsPlaying(true);
                        audio.muted = false;
                        setIsMuted(false);
                        document.removeEventListener("click", handleFirstClick);
                    } catch (err) {
                        console.error("Failed to play audio:", err);
                    }
                };
                document.addEventListener("click", handleFirstClick);
            }
        };

        playAudio();

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, []);

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const newMuteState = !audio.muted;
        audio.muted = newMuteState;
        setIsMuted(newMuteState);

        // ✅ ensure it plays once unmuted
        if (!newMuteState && !isPlaying) {
            audio.play().catch((err) => console.error("Playback error:", err));
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/assets/audio/retro-music.mp3"
                loop
                autoPlay
                preload="auto"
            />

            {/* Floating music control */}
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    size="icon"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="rounded-full"
                >
                    {isMuted ? (
                        <VolumeOff className="h-8 w-8" />
                    ) : (
                        <Volume2 className="h-8 w-8" />
                    )}
                </Button>
            </div>
        </>
    );
}
