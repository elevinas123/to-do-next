import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import DailyTask from "./DailyTask";



export default function RightSideBar(props) {

    const [tasks, setTasks] = useState([{text:"Meditate for 15 minutes", id:"123", completed: false, order:1}, {text:"Program for 2 hours", id:"124", completed: true, order:2}, {text:"Read for 1 hour", id:"125", completed: false, order:3}, {text:"200 words of german learned", id:"126", completed: false, order:4}])
    const [progress, setProgress] = useState(0)
    const [animatedProgress, setAnimatedProgress] = useState(progress);

    const handleTaskClick = (id) => {
        setTasks(prevTasks => {
            return prevTasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
        });
    };
    

    useEffect(() => {
        let ammountCompleted = 0
        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].completed == true) {
                ammountCompleted++
            }
        }
        setProgress((ammountCompleted/tasks.length*100).toFixed(1))
    }, [tasks])
    useEffect(() => {
        const interval = setInterval(() => {
          setAnimatedProgress((currentProgress) => {
            if (currentProgress < progress) {
              return Math.min(currentProgress + 1, progress); // Increment progress
            } else if (currentProgress > progress) {
              return Math.max(currentProgress - 1, progress); // Decrement progress
            } else {
              clearInterval(interval);
              return currentProgress; // Progress reached target
            }
          });
        }, 15); // Adjust the interval for smoother or faster animation
      
        return () => clearInterval(interval);
      }, [progress]);


    return(
        <div className="w-20vw pl-2  ">
            <div className=" flex flex-row menu border-l-2 h-100vh border-accent w-full bg-secondary  ">
                <div>
                    <div>
                        Daily Tasks
                    </div>
                    <div  className="flex flex-col">
                        {tasks.map((i, index) => (<DailyTask handleTaskClick={handleTaskClick} {...tasks[index]} />))
}
                    </div>
                    <div className="flex flex-row justify-between ml-4 mt-2">
                        <div className="text-center flex items-center justify-center font-semibold text-lg ">Completed</div>
                        <div className="flex justify-center">
                            <div className={`radial-progress  text-${progress==100&&animatedProgress==progress?"green-500":"accent"} `} style={{ "--value": animatedProgress, "--size": "6rem", "--thickness": "0.75rem" }} role="progressbar">{progress}%</div>
                        </div>
                    </div>
                </div>
                <Calendar />
            </div>
        </div>
    )
}