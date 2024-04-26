import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation"; // Updated to use the new Next.js 13 navigation
import accountContext from "../context/accountContext";
import { IProject, ItemId } from "../database/schema/ProjectSchema";
import { makeRequest } from "../project/page";
import { ITask } from "../database/schema/TaskSchema";

type ProjectMenuComponentProps = {
    isRoot?: boolean;
    _id: ItemId | string;
    childrenProjects?: IProject[];
    name: string;
    level: number;
};

export default function ProjectMenuComponent(props: ProjectMenuComponentProps) {
    const context = useContext(accountContext);
    const [expanded, setExpanded] = useState(false);
    const [childrenProjects, setChildrenProjects] = useState<(IProject | ITask)[]>([]);
    const router = useRouter(); // Updated to useAppRouter hook from Next.js 13

    useEffect(() => {
        const fetchProjects = async () => {
            if (!props.isRoot && props._id) {
                const project: IProject = await makeRequest("getProjects", "POST", { projectId: props._id });
                setChildrenProjects(project.tasks);
            } else if (props.childrenProjects) {
                setChildrenProjects(props.childrenProjects);
            } else {
                throw new Error ("kazkas negerai")
            }
        };
        fetchProjects();
    }, [props._id, props.isRoot, props.childrenProjects, context]);

    const handleToggle = () => setExpanded(!expanded);

    // Handler for double-click event to navigate
    const handleDoubleClick = () => {
        router.push(`/project?projectId=${props._id}`); // Modify to navigate to the desired URL
    };

    return (
        <div className="w-full">
            <button
                onClick={handleToggle}
                onDoubleClick={handleDoubleClick} // Double click to navigate
                className="flex w-full items-center rounded-md bg-gray-800 hover:bg-gray-700 px-4 py-2 transition-colors duration-150 ease-in-out focus:outline-none"
            >
                <span className="flex-grow text-sm text-left text-white">{props.name}</span>
            </button>
            {expanded && childrenProjects.length > 0 && (
                <div className="mt-2 bg-gray-800 shadow-inner rounded-lg p-2 animate-fade-in-down overflow-y-auto space-y-2">
                    {childrenProjects.map((child, index) => (
                        <ProjectMenuComponent key={index} {...child} isRoot={false} level={props.level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}
