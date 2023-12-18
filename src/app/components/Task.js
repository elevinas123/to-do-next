"use client"
import React, { useMemo, useState } from 'react';
import SubTask from './SubTask';


export default function Task(){

    const [subTasks, setSubTasks] = useState([])

    return(
        <div className="ml-5 mt-5 flex flex-row">
           <div>
            <div className="text-black font-semibold text-center mb-10 text-3xl">Task title</div>
                <SubTask />
                <SubTask />
                <SubTask />
                
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
