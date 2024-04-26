import { useState, useEffect, useContext, SetStateAction } from "react";
import accountContext from "../context/accountContext";
import { IProject, ParentId } from "../database/schema/ProjectSchema";

type TaskCreationProps = {
    changeProjects: () => void;
    parentId: ParentId;
    index: number;
    place: string;
    setCreation: React.Dispatch<React.SetStateAction<boolean>>;
    setProject: React.Dispatch<SetStateAction<IProject | null>>
};

export default function TaskCreation(props: TaskCreationProps) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [text, setText] = useState("");
    const context = useContext(accountContext);
    const [selectValue, setSelectValue] = useState("Task");
    const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value);
    };
    useEffect(() => {}, []);
    const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        if (context === null) throw new Error("accountContext cant be null");
        const { account } = context;
        if (selectValue === "Task") {
            let taskObject = {
                type: "Task",
                onModel: "Projects",
                text,
                deadline: date,
                name: name,
                parent: props.parentId,
                index: props.index,
                place: props.place,
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

            let body = await task.json();
            let taskId = body._id;
            const addTaskToProject = await fetch("/api/createProject", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ projectId: props.parentId, taskId, onModel: "Task" }),
            });
            if (!addTaskToProject.ok) {
                throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
            }
        } else {
            const project = await fetch("/api/createProject", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "Project",
                    index: props.index,
                    place: props.place,
                    name,
                    description: text,
                    account: account.username,
                    parent: props.parentId,
                    isRootProject: false,
                }),
            });

            if (!project.ok) {
                throw new Error(`Error: ${project.status}, ${project.json()}`);
            }
            const pr = await project.json();
            const addTaskToProject = await fetch("/api/createProject", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ projectId: props.parentId, taskId: pr._id, onModel: "Projects" }),
            });
            if (!addTaskToProject.ok) {
                throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
            }
        }
        props.setCreation((i) => !i);
        props.changeProjects();
    };
    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setText(event.target.value);
    };
    const handleSelection: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        let value = event.target.value;
        if (value === "Type to add" || value === "Task") {
            value = "Task";
        } else {
            value = "Project";
        }
        setSelectValue(value);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Create New</h2>
                <div className="mb-3">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        id="type"
                        onChange={handleSelection}
                        className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select type
                        </option>
                        <option value="Project">Project</option>
                        <option value="Task">Task</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        id="text"
                        value={text}
                        onChange={handleTextChange}
                        className="w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Details about the task/project"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Deadline
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    type="submit"
                >
                    Create
                </button>
            </form>
        </div>
    );
}
