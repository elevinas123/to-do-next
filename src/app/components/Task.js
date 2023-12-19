"use client"
import React, { useEffect, useState } from 'react';
import SubTask from './SubTask';


export default function Task(props){

    const [tasks, setTasks] = useState([])
    const [subTasks, setSubTasks] = useState([])
    useEffect(() => {
        console.log(props)
       const f = async () => {
            const response = await fetch(`/api/getTask?id=${props.taskId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                
              })
            const body = await response.json()
            setTasks({...body})
        }
        if (props.taskId!=null){
            f()
        }
    }, [props.taskId])
    useEffect(() => {
        let p = []
        if(tasks.length==0) return
        
        for (let i =0; i<tasks.subTasks.length; i++) {
            p.push(<SubTask {...subTasks[i] }/>)
        }
        setSubTasks(p)
    }, [tasks])
    return(
        <div className="ml-5 mt-5 flex flex-row">
           <div>
            <div className="text-black font-semibold text-center mb-10 text-3xl">Task title</div>
                {subTasks}
                
           </div>
            <button onClick={() => console.log("hi")} className="flex flex-row m-2">
                    <div   className="text-gray-400 rounded-full bg-gray-200 flex justify-center items-center h-4 w-4 mt-0.5 pb-0.5">
                        <span >+</span>
                    </div>
                    <div  className="ml-1 text-sm font-semibold">Add new task</div>
            </button>
        </div>
    )
}
