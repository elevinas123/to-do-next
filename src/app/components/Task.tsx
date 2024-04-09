import React, { useEffect, useState, ReactElement } from "react";
import SubTask from "./SubTask";
import ObjectId from "bson-objectid";

// Define the type for the props of the Task component
type TaskProps = {
    taskId: string;
};

// Define the structure of the task data expected from the API
interface TaskData {
    subTasks: {
        subTaskId: string;
        text: string;
        completed: boolean;
    }[];
}

export default function Task(props: TaskProps) {
    // Use state with specific types for tasks and subTasks
    const [tasks, setTasks] = useState<TaskData | null>(null);
    const [subTasks, setSubTasks] = useState<ReactElement[]>([]);

    // Fetch task data from API
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`/api/getTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: props.taskId }),
            });
            const body: TaskData = await response.json();
            setTasks(body);
        };

        if (props.taskId) {
            fetchTasks();
        }
    }, [props.taskId]);

    // Update subTasks based on the tasks data
    useEffect(() => {
        if (tasks && tasks.subTasks.length > 0) {
            const preparedSubTasks = tasks.subTasks.map((subTask) => (
                <SubTask
                    key={subTask.subTaskId}
                    id={subTask.subTaskId}
                    taskId={props.taskId}
                    text={subTask.text}
                    completed={subTask.completed}
                />
            ));
            setSubTasks(preparedSubTasks);
        }
    }, [tasks, props.taskId]);

    // Function to add a new subTask
    const addSubTask = async () => {
        const id = new ObjectId().toString();
        setSubTasks((currentSubTasks) => [...currentSubTasks, <SubTask taskId={props.taskId} id={id} key={id} />]);

        await fetch("/api/subTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId: props.taskId, id: id }),
        });
    };

    return (
        <div className="ml-5 mt-5 flex flex-row">
            <div>
                <div className="text-black font-semibold text-center mb-10 text-3xl">Task title</div>
                {subTasks}
            </div>
            <button onClick={addSubTask} className="flex flex-row m-2">
                <div className="text-gray-400 rounded-full bg-gray-200 flex justify-center items-center h-4 w-4 mt-0.5 pb-0.5">
                    <span>+</span>
                </div>
                <div className="ml-1 text-sm font-semibold">Add new task</div>
            </button>
        </div>
    );
}
