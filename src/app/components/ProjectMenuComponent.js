// ProjectMenuComponent
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import accountContext from "../context/accountContext";

export default function ProjectMenuComponent(props) {
    const { account } = useContext(accountContext);
    const [expanded, setExpanded] = useState(false);
    const [childrenProjects, setChildrenProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!props.isRoot && props._id) {
                const response = await fetch(
                    `/api/getProjects?username=${account.username}&projectId=${props._id}&populateSecond=true`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok) {
                    console.error(`Error fetching child projects: HTTP status ${response.status}`);
                    return;
                }
                const responseBody = await response.json();
                setChildrenProjects(responseBody.tasks);
            } else {
                setChildrenProjects(props.childrenProjects);
            }
        };
        fetchProjects();
    }, [props._id, props.isRoot, props.childrenProjects, account.username]);

    const handleToggle = () => setExpanded(!expanded);

    return (
        <div className="w-full">
            <button
                onClick={handleToggle}
                className="flex w-full items-center rounded-md bg-gray-800 hover:bg-gray-700 px-4 py-2 transition-colors duration-150 ease-in-out focus:outline-none"
            >
                <span className="flex-grow text-sm text-left text-white">{props.name}</span>
            </button>
            {expanded && childrenProjects.length > 0 && (
                <div className="mt-2 bg-gray-800 shadow-inner rounded-lg p-2 animate-fade-in-down overflow-y-auto space-y-2">
                    {childrenProjects.map((child) => (
                        <ProjectMenuComponent key={child._id} {...child} level={props.level + 1} />
                    ))}
                </div>
            )}
        </div>
    );


}
