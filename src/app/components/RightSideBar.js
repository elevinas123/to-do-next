import { useContext, useEffect, useState } from "react";
import Calendar from "./Calendar";
import DailyTask from "./DailyTask";
import { CgOptions } from "react-icons/cg";
import EditingModeDailyTasks from "./EditingModeDailyTasks";
import SetupDailyTasks from "./SetupDailyTasks";
import accountContext from "../context/accountContext";


export default function RightSideBar(props) {

    const [tasks, setTasks] = useState([])
    const [progress, setProgress] = useState(0)
    const [animatedProgress, setAnimatedProgress] = useState(progress);
    const [editing, setEditing] = useState(false)
    const [projectId, setProjectId] = useState("")
    const {account} = useContext(accountContext)

    const handleTaskClick = async (id) => {
        console.log(tasks)
        let state = null
        setTasks(prevTasks => {
            return prevTasks.map(task => 
                task._id === id ? { ...task, place: task.place=="completed"?"toDo":"completed"} : task
            );
        });
        for(let i=0; i<tasks.length; i++) {
            console.log("T", tasks[i])
            console.log("T", id)
            if (tasks[i]._id === id) {
                state = tasks[i].place==="completed"?"toDo":"completed"
            }
        }
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`
        console.log("state,", state)
        await fetch('/api/recurrentProject/editRecurrentTask', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({taskId: id, projectId: tasks[0].parent, date: fullDate , place: state}),
          });
    };
    
    useEffect(() => {
        const f = async() => {
            const date = new Date()
            const year = date.getFullYear();
            const month = date.getMonth() + 1
            const day = date.getDate();
            const fullDate = `${year}-${month}-${day}`
            const response = await fetch(`/api/recurrentProject/getRecurrentProject?date=${fullDate}&name=DailyTasks`)
            const responseBody = await response.json()
            setProjectId(responseBody[0]._id)
            setTasks(responseBody[0].tasks[fullDate])
        }
        f()
    }, [])
    useEffect(() => {
        console.log("projektas useefekte", projectId)
    }, [projectId])

    useEffect(() => {
        let ammountCompleted = 0
        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].place == "completed") {
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
    const handleEdit = async (id, newText) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task._id === id ? { ...task, name: newText } : task
        ));
        const task = await fetch('/api/recurrentProject/updateReferenceTask', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, name: newText}),
          });
        const taskBody = await task.json()
        console.log("taskBody", taskBody)
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`
        await fetch('/api/recurrentProject/editRecurrentTask', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({taskId, name: newText, projectId: taskBody.parent, date: fullDate}),
          });
        
    };
    
    const handleDelete = async (id) => {
        console.log("hi")
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
        await fetch("/api/recurrentProject/deleteReferenceTask", {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({taskId: id, projectId, date: fullDate}),
          })
    }
    const handleDailyTaskSetup = async (dailyTaskName) => {
        console.log("labas", dailyTaskName, account)
        let projectObject = {onModel:"Projects",  name: "DailyTasks", account:account.username, tasks:[], referenceTasks:[], isRootProject:true  }
        const project = await fetch('/api/recurrentProject/createRecurrentProject',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectObject),
        })
        if (!project.ok) {
            throw new Error(`Error: ${project.status}, ${project.json()}`);
          }
        
        const projectBody = await project.json()
        const taskObject = {parent: projectBody._id, onModel: "Projects", index: 0, name: dailyTaskName, text:"", place: "toDo"}
        const task = await fetch('/api/createTask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskObject),
          });
          if (!task.ok) {
            throw new Error(`Error: ${task.status}, ${task.json()}`);
          }
        
        let taskBody = await task.json()
        setTasks(i => [...i, taskBody])
        const taskId = taskBody._id
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`
        const addTaskToProject = await fetch('/api/recurrentProject/createRecurrentProject', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({taskId, projectId: projectBody._id, task: taskBody, date:fullDate}),
          });
        if (!addTaskToProject.ok) {
            throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
        }
        const newProjectBody = await addTaskToProject.json()
        console.log("response ", newProjectBody)

    }
    const handleTaskCreate = async (text) => {
        console.log("projectId", projectId)
        const taskObject = {parent: projectId, onModel: "Projects", index: tasks.length+1, name: text, text:"", place: "toDo"}
        const task = await fetch('/api/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskObject),
        });
        if (!task.ok) {
            throw new Error(`Error: ${task.status}, ${task.json()}`);
        }
        
        let taskBody = await task.json()
        console.log("taskBody", taskBody)
        setTasks(prevTasks => [...prevTasks, taskBody])
        const taskId = taskBody._id
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`
        const addTaskToProject = await fetch('/api/recurrentProject/createRecurrentProject', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({taskId, projectId, task: taskBody, date:fullDate}),
          });
        if (!addTaskToProject.ok) {
            throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
        }
        console.log("All done")
    }
    
    
    return(
        <div className="w-20vw pl-2   ">
            <div className=" flex flex-row menu border-l-2 h-100vh border-accent bg-secondary shadow-md shadow-gray-400  ">
                <div className="flex flex-col justify-between bg-accent rounded-xl ml-4 w-80 ">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <div className="font-semibold text-lg m-4 ">
                                Daily Tasks
                            </div>
                            <button onClick={handleSettingsClick} className="shadow-lg rounded-full bg-secondary p-1 m-4">
                                <CgOptions className="w-6 h-6" />
                            </button>
                        </div>
                        <div  className="flex flex-col">
                            {tasks.length==0?<SetupDailyTasks handleDailyTaskSetup={handleDailyTaskSetup} />:editing?<EditingModeDailyTasks handleTaskCreate={handleTaskCreate}  handleEdit={handleEdit} handleDelete={handleDelete}  tasks={tasks} />:
                            <div className="ml-4">
                            {tasks.map((i, index) => (<DailyTask key={index} handleTaskClick={handleTaskClick} {...tasks[index]} />))}
                            </div>
                        }
                        </div>
                    </div>
                    <div className="flex flex-row justify-between ml-4 mb-4">
                        <div className="text-center flex items-center justify-center font-semibold text-lg ">Completed</div>
                        <div className="flex justify-center mr-4">
                            <div className={`radial-progress  font-bold transition-colors duration-300 bg-secondary text-lg  text-${progress==100?"green-500":"black"} `} style={{ "--value": animatedProgress, "--size": "6rem", "--thickness": "0.75rem" }} role="progressbar">{progress}%</div>
                        </div>
                    </div>
                </div>
                <Calendar />
            </div>
        </div>
    )
}