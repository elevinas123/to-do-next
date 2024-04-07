import { useContext, useEffect, useState } from "react";
import Calendar from "./Calendar";
import DailyTask from "./DailyTask";
import { CgOptions } from "react-icons/cg";
import EditingModeDailyTasks from "./EditingModeDailyTasks";
import SetupDailyTasks from "./SetupDailyTasks";
import accountContext from "../context/accountContext";
import ProgressBar from "./ProgressBar";

export default function RightSideBar(props) {
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(0);
    const [animatedProgress, setAnimatedProgress] = useState(progress);
    const [editing, setEditing] = useState(false);
    const [projectId, setProjectId] = useState("");
    const { account } = useContext(accountContext);
    const [project, setProject] = useState({});

    const logout = () => {
    localStorage.removeItem("acc")
    account.setLoggedIn(false)
  }

    const handleTaskClick = async (id) => {
        let state = null;
        setTasks((prevTasks) => {
            return prevTasks.map((task) =>
                task._id === id ? { ...task, place: task.place == "completed" ? "toDo" : "completed" } : task
            );
        });
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]._id === id) {
                state = tasks[i].place === "completed" ? "toDo" : "completed";
            }
        }
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`;
        await fetch("/api/recurrentProject/editRecurrentTask", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId: id, projectId: tasks[0].parent, date: fullDate, place: state }),
        });
    };

    useEffect(() => {
        const f = async () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const fullDate = `${year}-${month}-${day}`;
            const response = await fetch(
                `/api/recurrentProject/getRecurrentProject?date=${fullDate}&name=DailyTasks&account=${account.username}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ date: fullDate, name: "DailyTasks", account: account.username }),
                }
            );
            const responseBody = await response.json();
            console.log("resposnebody", responseBody);
            setProjectId(responseBody[0]._id);
            setProject(responseBody[0]);
            setTasks(responseBody[0].tasks[fullDate]);
        };
        f();
    }, []);
    useEffect(() => {}, [projectId]);

    useEffect(() => {
        let ammountCompleted = 0;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].place == "completed") {
                ammountCompleted++;
            }
        }
        setProgress(((ammountCompleted / tasks.length) * 100).toFixed(1));
    }, [tasks]);

    const handleSettingsClick = () => {
        setEditing((i) => !i);
    };
    const handleEdit = async (id, newText) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task._id === id ? { ...task, name: newText } : task)));
        const task = await fetch("/api/recurrentProject/updateReferenceTask", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name: newText }),
        });
        const taskBody = await task.json();
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`;
        await fetch("/api/recurrentProject/editRecurrentTask", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId: id, name: newText, projectId: taskBody.parent, date: fullDate }),
        });
    };

    const handleDelete = async (id) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`;
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        await fetch("/api/recurrentProject/deleteReferenceTask", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId: id, projectId, date: fullDate }),
        });
    };
    const handleDailyTaskSetup = async (dailyTaskName) => {
        console.log("this")
        let projectObject = {
            onModel: "Projects",
            name: "DailyTasks",
            account: account.username,
            tasks: [],
            referenceTasks: [],
            isRootProject: true,
        };
        const project = await fetch("/api/recurrentProject/createRecurrentProject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectObject),
        });
        if (!project.ok) {
            throw new Error(`Error: ${project.status}, ${project.json()}`);
        }

        const projectBody = await project.json();
        const taskObject = {
            parent: projectBody._id,
            onModel: "Projects",
            index: 0,
            name: dailyTaskName,
            text: "",
            place: "toDo",
        };
        const task = await fetch("/api/createTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
        if (!task.ok) {
            throw new Error(`Error: ${task.status}, ${task.json()}`);
        }

        let taskBody = await task.json();
        setTasks((i) => [...i, taskBody]);
        const taskId = taskBody._id;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`;
        const addTaskToProject = await fetch("/api/recurrentProject/createRecurrentProject", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId, projectId: projectBody._id, task: taskBody, date: fullDate }),
        });
        if (!addTaskToProject.ok) {
            throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
        }
        const newProjectBody = await addTaskToProject.json();
    };
    const handleTaskCreate = async (text) => {
        console.log("text", text)
        const taskObject = {
            parent: projectId,
            onModel: "Projects",
            index: tasks.length + 1,
            name: text,
            text: "",
            place: "toDo",
        };
        const task = await fetch("/api/createTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
        if (!task.ok) {
            throw new Error(`Error: ${task.status}, ${task.json()}`);
        }

        let taskBody = await task.json();
        setTasks((prevTasks) => [...prevTasks, taskBody]);
        const taskId = taskBody._id;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const fullDate = `${year}-${month}-${day}`;
        const addTaskToProject = await fetch("/api/recurrentProject/createRecurrentProject", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId, projectId, task: taskBody, date: fullDate }),
        });
        if (!addTaskToProject.ok) {
            throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
        }
    };

    return (
        <div className="pl-2">
            <div className="flex flex-col border-l-2 h-full border-blue-300 bg-white shadow-md justify-between">
                <div>
                    <div className="bg-gray-100 rounded-xl m-4 p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-800">Daily Tasks</h2>
                            <button
                                onClick={handleSettingsClick}
                                className="rounded-full bg-gray-300 p-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                <CgOptions className="text-gray-800" size="24" />
                            </button>
                        </div>
                        <div className="flex-grow space-y-3">
                            {tasks.length === 0 ? (
                                <SetupDailyTasks handleSetup={handleDailyTaskSetup} />
                            ) : editing ? (
                                <EditingModeDailyTasks {...{ handleTaskCreate, handleEdit, handleDelete, tasks }} />
                            ) : (
                                tasks.map((task, index) => (
                                    <DailyTask key={index} handleTaskClick={handleTaskClick} {...task} />
                                ))
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-between mt-4">
                            <div className="text-sm font-semibold text-gray-800">Completed</div>
                            <div className="w-full max-w-xs justify-center flex flex-row mt-2">
                                <ProgressBar progress={progress} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl m-4">
                        <Calendar project={project} />
                    </div>
                </div>
                {/* Logout button at the bottom right */}
                <div className="m-4 self-end">
                    <button
                        onClick={logout}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-700 transition duration-150 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );

}
