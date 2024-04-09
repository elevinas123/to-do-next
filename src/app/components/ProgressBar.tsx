import { useEffect, useState } from "react";


type ProgressProps = {
    progress: number
    
 }

export default function ProgressBar(props: ProgressProps) {
    const [animatedProgress, setAnimatedProgress] = useState(props.progress);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimatedProgress((currentProgress) => {
                if (currentProgress < props.progress) {
                    return Math.min(currentProgress + 1, props.progress); // Smoothly increment progress
                } else if (currentProgress > props.progress) {
                    return Math.max(currentProgress - 1, props.progress); // Smoothly decrement progress
                } else {
                    clearInterval(interval);
                    return currentProgress; // Progress reached target
                }
            });
        }, 15); // Adjust the interval for smoother or faster animation

        return () => clearInterval(interval);
    }, [props.progress]);

    return (
        <div
            className={`radial-progress font-bold transition-colors duration-300 bg-gray-200 text-lg text-${
                Math.ceil(props.progress) === 100 ? "green-500" : "gray-700"
            } rounded-full`}
            style={{ "--value": animatedProgress, "--size": "6rem", "--thickness": "0.75rem" }}
            role="progressbar"
        >
            {props.progress}%
        </div>
    );
}
