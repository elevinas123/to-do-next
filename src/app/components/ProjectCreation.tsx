"use client";
import { useState, useContext, ChangeEventHandler, FormEventHandler } from "react";
import accountContext from "../context/accountContext";
import { useRouter } from "next/navigation";
import { makeRequest } from "../project/page";

export default function ProjectCreation() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const context = useContext(accountContext);
    const router = useRouter();

    const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!context) throw new Error("Context must not be null");
        const { account } = context;
        let projectObject = {
            name,
            description,
            account: account.username,
            isRootProject: true,
            place: "none",
            index: 0,
            parent: null,
        };
        const createdProject = await makeRequest("createProject", "POST", projectObject);
        router.push(`/project?projectId=${createdProject._id}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-100vh w-15vw z-10 ml-24 absolute flex flex-col items-center justify-center  bg-white rounded-lg shadow-lg p-6 mx-auto"
        >
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
            <button
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                type="submit"
            >
                Create Task
            </button>
        </form>
    );
}
