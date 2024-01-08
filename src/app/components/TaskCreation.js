import { useState, useEffect, useContext } from "react";
import ProjectSchema from "../database/schema/ProjectSchema";
import accountContext from "../context/accountContext";

export default function TaskCreation(props) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [text, setText] = useState("")
    const {account} = useContext(accountContext)
    const [selectValue, setSelectValue] = useState("Task")
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    useEffect(() => {
        console.log("taskCreationProps", props)
    }, [])
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(props)
        if (selectValue === "Task") {
            let taskObject = {type:"Task", onModel:"Projects", text, deadline: date,  name: name,  parent: props.parentId, index: props.index, place: props.place}
        

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
            
            let body = await task.json()
            let taskId = body._id
            const addTaskToProject = await fetch('/api/createProject', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({projectId: props.parentId, taskId, onModel:"Task"}),
            });
            if (!addTaskToProject.ok) {
                throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
            }
        } else {

            const project = await fetch('/api/createProject', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({type: "Project", index: props.index, place: props.place, name, description: text, account:account.username, parent: props.parentId, isRootProject: false}),
            });

            if (!project.ok) {
                throw new Error(`Error: ${project.status}, ${project.json()}`);
            }
            const pr = await project.json()
            const addTaskToProject = await fetch('/api/createProject', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({projectId: props.parentId, taskId: pr._id, onModel:"Projects"}),
            });
            if (!addTaskToProject.ok) {
                throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
            }
        }
        props.setCreation(i => !i)
        props.changeProjects()

        
    };
    const handleTextChange = (e) => {
        setText(e.target.value)
    }
    const handleSelection = (e) => {
        let value = e.target.value
        if (value ==="Type to add" || value === "Task") {
            value = "Task"
        } else {
            value = "Project"
        }
        setSelectValue(value)
        console.log(value)
    }

    return(
        <form onSubmit={handleSubmit} className="h-100vh w-15vw z-10 ml-24 absolute flex flex-col items-center justify-center  bg-secondary rounded-lg shadow-lg p-6 mx-auto">
            <div className="w-full">
                <select onClick={handleSelection}  className="font-semibold text-lg select select-secondary select-md bg-accent w-full mb-4 ">
                    <option  disabled selected>Type to add</option>
                    <option  >Project</option>
                    <option >Task</option>
                    
                </select>
            </div>
            <div className="w-full mb-4">
                <input 
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                    placeholder="Enter Task Name"
                />
            </div>
            <div className="w-full mb-4">
                    <input 
                    id="text"
                    value={text}
                    onChange={handleTextChange}
                    className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                    placeholder="Enter Task Text"
                />
            </div>
            <div className="w-full mb-4">
                    <input 
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                    className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                    placeholder="Enter Task Deadline"
                />
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">Create Task</button>
        </form>
    );
}
