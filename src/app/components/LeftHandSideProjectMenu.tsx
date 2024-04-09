// CSS for custom scrollbar in your global styles or specific component styles
/* Scrollbar styling */

// Sidebar Component
import React, { useContext, useEffect, useState } from "react";
import accountContext from "../context/accountContext";
import ProjectMenuComponent from "./ProjectMenuComponent";

export default function LeftHandSideProjectMenu() {
    const context = useContext(accountContext);
    const [rootProjects, setRootProjects] = useState([]);

    useEffect(() => {
        if (!context) return
        const {account} = context
        const fetchProjects = async (username: string) => {
            console.log("username", username);
            const response = await fetch(`/api/getAllProjectsByUsername`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({account: username}),
            });
            if (!response.ok) {
                console.error(`Failed to fetch projects: HTTP status ${response.status}`);
                return;
            }
            const data = await response.json();
            setRootProjects(data);
        };
        fetchProjects(account.username);
    }, [context]);

    return (
        <div className="bg-gray-900 text-white w-15vw h-screen shadow-xl overflow-hidden">
            <div className="p-5 border-b border-gray-700">
                <h1 className="text-lg font-semibold">Your Projects</h1>
            </div>
            <div className="overflow-y-auto p-2 space-y-2">
                <ProjectMenuComponent level={1} name="Projects" isRoot={true} childrenProjects={rootProjects} />
            </div>
        </div>
    );
}
