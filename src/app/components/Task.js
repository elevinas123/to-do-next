"use client"
import React, { useEffect, useState } from 'react';
import SubTask from './SubTask';
import { ObjectId } from 'bson';


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
            console.log("body", body)
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
        console.log(p)
        setSubTasks(p)
    }, [tasks])

    const addSubTask = () => {
        console.log("hi")
        let id = new ObjectId()
        setSubTasks(i => [...i, <SubTask id={id.toString()} />])
    }


    return(
        <div className="ml-5 mt-5 flex flex-row">
           <div>
            <div className="text-black font-semibold text-center mb-10 text-3xl">Task title</div>
                {subTasks}
                
           </div>
            <button onClick={addSubTask} className="flex flex-row m-2">
                    <div   className="text-gray-400 rounded-full bg-gray-200 flex justify-center items-center h-4 w-4 mt-0.5 pb-0.5">
                        <span >+</span>
                    </div>
                    <div  className="ml-1 text-sm font-semibold">Add new task</div>
            </button>
        </div>
    )
}
