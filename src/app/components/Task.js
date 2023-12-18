"use client"
import React, { useMemo, useState } from 'react';
import Subtask from './SubTask';


export default function Task(){

    

    return(
        <div className="ml-5 mt-5">
           <div className="text-black font-semibold text-center mb-10 text-3xl">Task title</div>
            <Subtask />
            <Subtask />
            <Subtask />
            
        </div>
    )
}
