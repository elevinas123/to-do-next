import { useState } from "react"



export default function DailyTask (props) {
    return (
            <button onClick={() => props.handleTaskClick(props.id)}   className={`text-lg font-semibold shadow-md bg-accent border-2 rounded-lg w-15vw h-12 flex justify-center items-center mt-2 ml-4 transition duration-300 ease-in-out ${props.completed ? 'border-green-400 bg-secondary' : 'border-neutral'} border-dashed`}>
                <span 
                className={`cursor-pointer ${props.completed ? 'active' : ''}`}
                
                >
                Task 1
                </span>
            </button>
      );
}