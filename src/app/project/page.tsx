"use client";

import { DragDropContext } from "react-beautiful-dnd";
import ProjectCreation from "../components/ProjectCreation";
import ProjectTemplate from "../components/ProjectTemplate";
import TaskCreation from "../components/TaskCreation";
import RightSideBar from "../components/RightSideBar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LeftHandSideProjectMenu from "../components/LeftHandSideProjectMenu";
import EditMode from "../components/EditMode";
import { IProject } from "../database/schema/ProjectSchema";
import { ITask } from "../database/schema/TaskSchema";

export default function Home() {
    const [creation, setCreation] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    const [creationName, setCreationName] = useState({});
    const [projectTemplates, setProjectTemplates] = useState<JSX.Element[]>([]);
    const [project, setProject] = useState<IProject | null>();
    const [whichCreation, setWhichCreation] = useState("");
    const [changed, setChanged] = useState(false);
    const searchParams = useSearchParams();
    const [editing, setEditing] = useState(false);
    const [editingObject, setEditingObject] = useState({});
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

    useEffect(() => {
        let f = async (projectId: string) => {
            const response = await fetch(`/api/getProjects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ projectId: projectId }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}, ${response.json()}`);
            }
            const responseBody: IProject = await response.json();
            console.log("projektas", responseBody);
            setProject(responseBody);
        };
        const projectId = searchParams.get("projectId");
        if (projectId) {
            f(projectId);
        } else {
        }
    }, [changed, searchParams.get("projectId")]);
    if (project === null) return <div>Loading</div>;

    const handleEdit = async (id: string, name: string, text: string, type: "Task" | "Project") => {
        console.log("here");
        console.log(project);
        setProject((project) => {
            if (project === null || project === undefined) {
                throw new Error("project cant be undefined"); // Or handle this case appropriately
            }

            return {
                ...project,
                tasks: (project.tasks || []).map((task) =>
                    task._id === id
                        ? { ...task, name: name, ...(type === "Task" ? { text: text } : { description: text }) }
                        : task
                ),
            };
        });

        const task = await fetch(
            `/api/${type == "Task" ? "recurrentProject/updateReferenceTask" : "updateProjectName"}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    ...(type === "Task" ? { text: text } : { description: text }),
                }),
            }
        );
        console.log(task);
    };

    const handleDelete = async (id: string, parentId: string) => {
        console.log("hi");
        let updatedTasks: ITask[] = [];
        let updatedProjects: IProject[] = [];

        setProject((project) => {
            if (project === null || project === undefined) {
                throw new Error("project cant be undefined"); // Or handle this case appropriately
            }
            const taskIndexToDelete = project.tasks.findIndex((task) => task._id === id);
            if (taskIndexToDelete === -1) return project; // Task not found, no update needed

            const newTasks = project.tasks
                .map((task, idx) => {
                    if (idx === taskIndexToDelete) return null; // Mark for deletion
                    if (
                        task.index > project.tasks[taskIndexToDelete].index &&
                        task.place === project.tasks[taskIndexToDelete].place
                    ) {
                        const updatedTask = { ...task, index: task.index - 1 };
                        task.type === "Task" ? updatedTasks.push(updatedTask) : updatedProjects.push(updatedTask);
                        return updatedTask; // Decrement index and add to updated list
                    }
                    return task; // No change
                })
                .filter((task) => task !== null); // Remove the marked task

            const newOnModel = [...project.onModel];
            newOnModel.splice(taskIndexToDelete, 1); // Remove from onModel

            return { ...project, tasks: newTasks, onModel: newOnModel };
        });
        await fetch("/api/deleteTaskOrProject", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, parentId }),
        });

        await fetch(`/api/updateProjects`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProjects),
        });
        await fetch(`/api/createTask`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTasks),
        });
    };

    useEffect(() => {
        if (!project) return;
        let p = [];
        let toDo = [];
        let inProgress = [];
        let completed = [];
        if (project.tasks != undefined) {
            for (let i = 0; i < project.tasks.length; i++) {
                if (project.tasks[i].place == "toDo") toDo.push(project.tasks[i]);
                if (project.tasks[i].place == "inProgress") inProgress.push(project.tasks[i]);
                if (project.tasks[i].place == "completed") completed.push(project.tasks[i]);
            }
        }
        toDo.sort((a, b) => a.index - b.index);
        inProgress.sort((a, b) => a.index - b.index);
        completed.sort((a, b) => a.index - b.index);

        p.push(
            <ProjectTemplate
                setEditing={setEditing}
                handleEdit={handleEdit}
                startEditing={startEditing}
                handleDelete={handleDelete}
                key="toDo"
                changeProjects={changeProjects}
                biggestIndex={toDo.length - 1}
                tasks={toDo}
                name={"To do"}
                place={"toDo"}
                addNewTask={addNewTask}
                parent={project._id}
            />
        );
        p.push(
            <ProjectTemplate
                setEditing={setEditing}
                handleEdit={handleEdit}
                startEditing={startEditing}
                handleDelete={handleDelete}
                key="inProgress"
                changeProjects={changeProjects}
                biggestIndex={inProgress.length - 1}
                name={"In progress"}
                tasks={inProgress}
                place={"inProgress"}
                addNewTask={addNewTask}
                parent={project._id}
            />
        );
        p.push(
            <ProjectTemplate
                setEditing={setEditing}
                handleEdit={handleEdit}
                startEditing={startEditing}
                handleDelete={handleDelete}
                key="completed"
                changeProjects={changeProjects}
                biggestIndex={completed.length - 1}
                name={"Completed"}
                tasks={completed}
                place={"completed"}
                addNewTask={addNewTask}
                parent={project._id}
            />
        );

        setProjectTemplates(p);
    }, [project]);

    const changeProjects = () => {
        setChanged((i) => !i);
    };

    const startEditing = (object) => {
        setFirstClick(true);
        setEditingObject(object);
        setEditing(true);
    };

    const addNewTask = (parentId: string, place: string, index: string) => {
        setCreationName({ parentId, index, place });
        setWhichCreation("task");
        setCreation((i) => !i);
        setFirstClick(true);
    };

    const exitSelection = () => {
        if ((creation || editing) && !firstClick) {
            setCreation(false);
            setEditing(false);
        }
        setFirstClick((i) => !i);
    };

    const handleDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!project) throw new Error("project cant be null");
        // Do nothing if dropped outside the list
        if (!destination) {
            return;
        }

        // Dropped in the same list at the same position
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        // Creating a new copy of project
        let newTasks: (ITask | IProject)[] = JSON.parse(JSON.stringify(project.tasks));
        let updatedTasks = [];
        let updatedProjects = [];
        for (let i = 0; i < newTasks.length; i++) {
            console.log("hjghjghjghj", newTasks[i]);
            if (newTasks[i].place === source.droppableId && newTasks[i].index === source.index) {
                newTasks[i].place = destination.droppableId;
                newTasks[i].index = destination.index;
                if (newTasks[i].type === "Task") {
                    updatedTasks.push(newTasks[i]);
                } else {
                    updatedProjects.push(newTasks[i]);
                }
            } else if (
                source.droppableId === destination.droppableId &&
                newTasks[i].place === source.droppableId &&
                source.index < destination.index &&
                newTasks[i].index >= source.index &&
                newTasks[i].index <= destination.index
            ) {
                newTasks[i].index--;
                if (newTasks[i].type === "Task") {
                    updatedTasks.push(newTasks[i]);
                } else {
                    updatedProjects.push(newTasks[i]);
                }
            } else if (
                source.droppableId === destination.droppableId &&
                newTasks[i].place === source.droppableId &&
                source.index > destination.index &&
                newTasks[i].index < source.index &&
                newTasks[i].index >= destination.index
            ) {
                newTasks[i].index++;
                if (newTasks[i].type === "Task") {
                    updatedTasks.push(newTasks[i]);
                } else {
                    updatedProjects.push(newTasks[i]);
                }
            } else if (
                source.droppableId !== destination.droppableId &&
                newTasks[i].place === destination.droppableId &&
                newTasks[i].index >= destination.index
            ) {
                newTasks[i].index++;
                if (newTasks[i].type === "Task") {
                    updatedTasks.push(newTasks[i]);
                } else {
                    updatedProjects.push(newTasks[i]);
                }
            } else if (
                source.droppableId !== destination.droppableId &&
                newTasks[i].place === source.droppableId &&
                newTasks[i].index > source.index
            ) {
                newTasks[i].index--;
                if (newTasks[i].type === "Task") {
                    updatedTasks.push(newTasks[i]);
                } else {
                    updatedProjects.push(newTasks[i]);
                }
            }
        }

        console.log("updatedProjects", updatedProjects);
        console.log("updatedTasks", updatedTasks);
        // Update the state
        setProject((project) => {
            if (!project) throw new Error("project cant be null");
            return { ...project, tasks: newTasks };
        });
        await fetch(`/api/updateProjects`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProjects),
        });
        await fetch(`/api/createTask`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTasks),
        });
    };

    return (
        <div className="flex flex-row bg-gray-100">
            {/* Conditional rendering for task or project creation, and edit mode */}
            {creation ? (
                whichCreation === "task" ? (
                    <TaskCreation
                        changeProjects={changeProjects}
                        parentId={creationName.parentId}
                        place={creationName.place}
                        index={creationName.index}
                        setCreation={setCreation}
                        setProject={setProject}
                    />
                ) : (
                    <ProjectCreation
                        changeProjects={changeProjects}
                        setProject={setProject}
                        setCreation={setCreation}
                    />
                )
            ) : editing ? (
                <EditMode {...editingObject} />
            ) : null}

            {/* Main content area, possibly dimmed based on 'creation' state */}
            <div onClick={exitSelection} className={` ${creation ? "opacity-10" : ""} bg-gray-100 flex flex-row`}>
                <div className=" flex flex-col justify-between bg-white shadow-md">
                    <LeftHandSideProjectMenu />
                </div>
                <div className="">
                    <div className="flex flex-col border-b-2 border-gray-300 pb-4 mx-4">
                        <div className="px-4 py-2">
                            <h1 className="text-2xl font-extrabold text-gray-700">{project && project.name}</h1>
                        </div>
                        <div className="flex flex-row">
                            <DragDropContext onDragEnd={handleDragEnd}>{projectTemplates}</DragDropContext>
                        </div>
                    </div>
                </div>
                <RightSideBar />
            </div>
        </div>
    );
}
