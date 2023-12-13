import { useState, useContext } from "react";
import ProjectSchema from "../database/schema/ProjectSchema";
import accountContext from "../context/accountContext";

export default function TaskCreation(props) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const {account} = useContext(accountContext)
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(props)
        let taskObject = {deadline: date,  name: name,  parent: props.parent}
        

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
        console.log(props.parent, taskId)
        const addTaskToProject = await fetch('/api/createProject', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({projectId: props.parent, taskId}),
          });
        if (!addTaskToProject.ok) {
            throw new Error(`Error: ${addTaskToProject.status}, ${addTaskToProject.json()}`);
        }
        props.setCreation(i => !i)
        props.changeProjects()

        
    };

    return(
        <form onSubmit={handleSubmit} className="h-100vh w-15vw z-10 ml-24 absolute flex flex-col items-center justify-center  bg-white rounded-lg shadow-lg p-6 mx-auto">
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
                    id="date"
                    placeholder="deadline"
                    value={date}
                    onChange={handleDateChange}
                    type="date"
                    className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                />
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">Create Task</button>
        </form>
    );
}
