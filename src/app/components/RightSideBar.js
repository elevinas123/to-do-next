import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import DailyTask from "./DailyTask";
import { CgOptions } from "react-icons/cg";
import EditingModeDailyTasks from "./EditingModeDailyTasks";


export default function RightSideBar(props) {

    const [tasks, setTasks] = useState([{text:"Meditate for 15 minutes", id:"121", completed: false, order:1}, {text:"Program for 2 hours", id:"122", completed: true, order:2}, {text:"Read for 1 hour", id:"123", completed: false, order:3}, {text:"200 words of german learned", id:"124", completed: false, order:4}])
    const [progress, setProgress] = useState(0)
    const [animatedProgress, setAnimatedProgress] = useState(progress);
    const [editing, setEditing] = useState(false)
    const handleTaskClick = (id) => {
        console.log(tasks)
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

    const handleSettingsClick = () => {
        setEditing(i => !i)
    }
    const handleEdit = (id, newText) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === id ? { ...task, text: newText } : task
        ));
    };
    
    const handleDelete = (id) => {
        console.log("hi")
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
    const handleTaskCreate = (id, text) => {
        setTasks(prevTasks => [...prevTasks, {id, text, completed: false, order:prevTasks.length+2}])
    }
    
    
    return(
        <div className="w-20vw pl-2   ">
            <div className=" flex flex-row menu border-l-2 h-100vh border-accent bg-secondary shadow-md shadow-gray-400  ">
                <div className="flex flex-col bg-accent rounded-xl ml-4 w-80 ">
                    <div className="flex flex-row justify-between">
                        <div className="font-semibold text-lg m-4 ">
                            Daily Tasks
                        </div>
                        <button onClick={handleSettingsClick} className="shadow-lg rounded-full bg-secondary p-1 m-4">
                            <CgOptions className="w-6 h-6" />
                        </button>
                    </div>
                    <div  className="flex flex-col">
                        {editing?<EditingModeDailyTasks handleTaskCreate={handleTaskCreate}  handleEdit={handleEdit} handleDelete={handleDelete}  tasks={tasks} />:
                        <div className="ml-4">
                        {tasks.map((i, index) => (<DailyTask key={index} handleTaskClick={handleTaskClick} {...tasks[index]} />))}
                        </div>
                    }
                    </div>
                    <div className="flex flex-row justify-between ml-4 mt-2">
                        <div className="text-center flex items-center justify-center font-semibold text-lg ">Completed</div>
                        <div className="flex justify-center">
                            <div className={`radial-progress  font-bold transition-colors duration-300 bg-secondary text-lg  text-${progress==100?"green-500":"black"} `} style={{ "--value": animatedProgress, "--size": "6rem", "--thickness": "0.75rem" }} role="progressbar">{progress}%</div>
                        </div>
                    </div>
                </div>
                <Calendar />
            </div>
        </div>
    )
}