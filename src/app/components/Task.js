"use client";
import ObjectId from "bson-objectid";
import React, { useEffect, useState } from "react";
import SubTask from "./SubTask";

export default function Task(props) {
    const [tasks, setTasks] = useState([]);
    const [subTasks, setSubTasks] = useState([]);
    useEffect(() => {
        const f = async () => {
            const response = await fetch(`/api/getTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: props.taskId }),
            });
            const body = await response.json();
            setTasks({ ...body });
        };
        if (props.taskId != null) {
            f();
        }
    }, [props.taskId]);
    useEffect(() => {
        let p = [];
        if (tasks.length == 0) return;
        for (let i = 0; i < tasks.subTasks.length; i++) {
            p.push(
                <SubTask
                    id={tasks.subTasks[i].subTaskId}
                    taskId={props.taskId}
                    text={tasks.subTasks[i].text}
                    completed={tasks.subTasks[i].completed}
                />
            );
        }
        setSubTasks(p);
    }, [tasks]);

    const addSubTask = () => {
        const f = async () => {
            let id = new ObjectId().toString();
            setSubTasks((i) => [...i, <SubTask taskId={props.taskId} id={id} key={id} />]);
            const response = await fetch("/api/subTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ taskId: props.taskId, id: id }),
            });
        };
        f();
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
