import { useState, useContext } from "react";
import ProjectSchema from "../database/schema/ProjectSchema";
import accountContext from "../context/accountContext";

export default function ProjectCreation(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const {account} = useContext(accountContext)
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(account)
        let projectObject = {name, description, account: account.username}
        

        const response = await fetch('/api/createProject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectObject),
          });
        const reponseText = await response.json()
        console.log("project response", reponseText)
        props.setCreation(i => !i)
        props.changeProjects()
          if (!response.ok) {
            throw new Error(`Error: ${response.status}, ${response.json()}`);
          }
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
                    id="description"
                    placeholder="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    type="text"
                    className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                />
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">Create Task</button>
        </form>
    );
}
