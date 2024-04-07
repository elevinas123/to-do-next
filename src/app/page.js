"use client";
import ProjectMenuComponent from "./components/ProjectMenuComponent";
import { useContext, useEffect, useState } from "react";
import ProjectCreation from "./components/ProjectCreation";
import accountContext from "./context/accountContext";
import TaskCreation from "./components/TaskCreation";
import Navbar from "./components/Navbar";
import RightSideBar from "./components/RightSideBar";
import LeftHandSideProjectMenu from "./components/LeftHandSideProjectMenu";

export default function Home(props) {
    const [creation, setCreation] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    const [creationName, setCreationName] = useState("");
    const [projectTemplates, setProjectTemplates] = useState([]);
    const { account } = useContext(accountContext);
    const [projects, setProjects] = useState([]);
    const [whichCreation, setWhichCreation] = useState("");
    const [changed, setChanged] = useState(false);
    useEffect(() => {
        fetch("api/connectToDB");
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
                    <TaskCreation
                        changeProjects={changeProjects}
                        parent={creationName}
                        setCreation={setCreation}
                        setProjects={setProjects}
                    />
                ) : (
                    <ProjectCreation setCreation={setCreation} />
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
