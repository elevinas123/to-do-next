import { useState } from "react"



export default function DailyTask (props) {
    return (
            <button onClick={() => props.handleTaskClick(props._id)}   className={`select-none text-lg font-semibold shadow-md bg-accent border-2 rounded-lg w-15vw h-12 flex justify-center items-center mt-2  transition duration-300 ease-in-out ${props.place=="completed" ? 'relative border-green-400 bg-secondary crossed-rectangle ' : 'border-neutral'} border-dashed`}>
                <span className={`cursor-pointer ${props.place=="completed" ? 'active' : ''}`}>
                {props.name}
                </span>
            </button>
      );
}