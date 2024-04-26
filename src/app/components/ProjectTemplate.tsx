import { SetStateAction, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import EmptyProjectCard from "./EmptyProjectCard";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { IProject, ItemId, ParentId, Tasks } from "../database/schema/ProjectSchema";
import { EditingObject, isTask } from "./EditMode";
import { ITask } from "../database/schema/TaskSchema";

type ProjectTemplateProps = {
    setEditing: React.Dispatch<SetStateAction<boolean>>;
    handleEdit: (id: ItemId, name: string, text: string, type: "Task" | "Project") => Promise<void>;
    handleDelete: (id: ItemId, parentId: ParentId) => Promise<void>;
    startEditing: (object: EditingObject) => void
    changeProjects: () => void;
    biggestIndex: number;
    name: string;
    tasks: Tasks;
    place: string;
    addNewTask: (parentId: ParentId, place: string, index: number) => void;
    parent: ParentId;
};

export default function ProjectTemplate(props: ProjectTemplateProps) {
    const [projectCards, setProjectCards] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        let p = [];
        if (props.tasks == undefined) props.tasks = [];
        for (let i = 0; i < props.tasks.length; i++) {
             if (isTask(props.tasks[i])) {
                 // Since isTask confirmed it is ITask, we can safely cast and use TaskCard
                 const task = props.tasks[i] as ITask; // Explicit cast for clarity, not required
                 p.push(
                     <TaskCard
                         {...task}
                         setEditing={props.setEditing}
                         handleEdit={props.handleEdit}
                         startEditing={props.startEditing}
                         handleDelete={props.handleDelete}
                         key={props.tasks[i]._id + "-" + i}
                     />
                 );
             } else {
                 
                const project = props.tasks[i] as IProject
                 p.push(
                     <ProjectCard
                         {...project}
                         setEditing={props.setEditing}
                         handleEdit={props.handleEdit}
                         startEditing={props.startEditing}
                         handleDelete={props.handleDelete}
                         key={props.tasks[i]._id + "-" + i}
                     />
                 );
             }
        }
        for (let i = props.tasks.length; i < 4; i++) {
            p.push(
                <EmptyProjectCard
                    key={"empty-" + i}
                    place={props.place}
                    biggestIndex={props.biggestIndex}
                    addNewTask={props.addNewTask}
                    parent={props.parent}
                />
            );
        }
        setProjectCards(p);
    }, [props]);

    return (
        <div className="w-1/5 border-dashed border-2 bg-gray-100 border-gray-300 h-70vh ml-4 mt-2 rounded-lg shadow-lg flex flex-col p-4">
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">{props.name}</h2>
                <button
                    onClick={() => {
                        console.log("Details", props.parent, props.place, props.biggestIndex + 1);
                        props.addNewTask(props.parent, props.place, props.biggestIndex + 1);
                    }}
                    className="flex items-center text-gray-400 hover:text-gray-600"
                >
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 110 16 8 8 0 010-16zm1 3h-2v5H7v2h4v4h2v-4h4v-2h-4V7z" />
                    </svg>
                    <span className="ml-1 text-sm">Add new task</span>
                </button>
            </div>
            <div className="flex flex-col overflow-y-auto pr-1 overflow-x-hidden">
                <Droppable droppableId={props.place}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {projectCards}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
}
