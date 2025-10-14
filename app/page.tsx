"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/retroui/Button";

export default function Home() {
    const router = useRouter();
    return (
        <div
            className="flex flex-col items-center justify-center h-screen blink-1-time"
            style={{
                backgroundImage: "url(/assets/images/bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Button
                variant="default"
                size={"lg"}
                onClick={() => {
                    router.push("/play");
                }}
            >
                Start Game
            </Button>
        </div>
    );
}
