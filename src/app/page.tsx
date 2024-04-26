"use client";
import { useEffect, useState } from "react";
import ProjectCreation from "./components/ProjectCreation";
import TaskCreation from "./components/TaskCreation";
import RightSideBar from "./components/RightSideBar";
import LeftHandSideProjectMenu from "./components/LeftHandSideProjectMenu";
import { IProject } from "./database/schema/ProjectSchema";

export default function Home() {
    const [creation, setCreation] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    const [creationName, setCreationName] = useState("");
    const [projects, setProjects] = useState<IProject | null>(null);
    const [whichCreation, setWhichCreation] = useState("");
    useEffect(() => {
        const f = async () => {
            await fetch("api/connectToDB", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        };
        f();
    }, []);

    const addProject = () => {
        setWhichCreation("project");
        setCreation((i) => !i);
    };
    const exitSellection = () => {
        if (creation && !firstClick) setCreation(false);
        setFirstClick((i) => !i);
    };

    return (
        <div className="flex flex-row bg-gray-100">
            {/* Conditional Rendering for Task or Project Creation */}
            {creation &&
                (whichCreation === "task" ? (
                    (() => {
                        throw new Error("Cannot create a task here.");
                    })()
                ) : (
                    <ProjectCreation />
                ))}

            {/* Main Interaction Area with Conditional Opacity */}
            <div onClick={exitSellection} className={`flex flex-row w-full ${creation ? "opacity-10" : "opacity-100"}`}>
                {/* Left-hand Side Menu */}
                <div className="w-1/5 bg-gray-100">
                    <LeftHandSideProjectMenu />
                </div>

                {/* Main Content Section */}
                <div className="flex-grow flex flex-col space-y-4 p-4">
                    <div className="bg-white shadow p-2 rounded">Section 1</div>
                    <div className="bg-white shadow p-2 rounded">Section 2</div>
                    <button
                        onClick={addProject}
                        className="self-start bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                        type="button"
                    >
                        Add Project
                    </button>
                </div>

                {/* Right-hand Side Bar */}
                <RightSideBar />
            </div>
        </div>
    );
}
