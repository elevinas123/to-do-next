import { useEffect, useState } from "react";






export default function ProgressBar (props) {
    const [animatedProgress, setAnimatedProgress] = useState(props.progress);
    useEffect(() => {
        const interval = setInterval(() => {
          setAnimatedProgress((currentProgress) => {
            if (currentProgress < props.progress) {
              return Math.min(currentProgress + 1, props.progress); // Increment progress
            } else if (currentProgress > props.progress) {
              return Math.max(currentProgress - 1, props.progress); // Decrement progress
            } else {
              clearInterval(interval);
              return currentProgress; // Progress reached target
            }
          });
        }, 15); // Adjust the interval for smoother or faster animation
      
        return () => clearInterval(interval);
      }, [props.progress]);

    return(
        <div className={`radial-progress  font-bold transition-colors duration-300 bg-secondary text-lg  text-${props.progress==100?"green-500":"black"} `} style={{ "--value": animatedProgress, "--size": "6rem", "--thickness": "0.75rem" }} role="progressbar">{props.progress}%</div>
    )
}