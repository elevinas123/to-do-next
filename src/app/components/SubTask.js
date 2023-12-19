"use client"

import { useState } from "react"
import { CiCircleCheck } from "react-icons/ci";

    

export default function Subtask(props) {
    
    const [finished, setFinished] = useState(false)
    const [text, setText] = useState(props.text)
    
    const handleTextChange = (e) => {
        setText(e.target.value)
        console.log(text)
    } 

    const saveData = () => {

        fetch("/api/createTask", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: text, completed: finished}),
          })
    }

    return(
        <div className="flex flex-col w-40vw justify-center"> 
            <div className='flex flex-row mt-2 justify-center'>
                <div className="rounded-full border-black border text-lg h-12 bg-orange-300 flex text-center justify-center pt-2 w-12">1.</div>
                <input onBlur={saveData} onChange={handleTextChange} value={text} placeholder=" Subtask" className=" focus:outline-none  focus:border-4 focus:border-black  placeholder:text-gray-600 ml-2 justify-center w-64  text-center text-lg flex flex-row pt-2 border border-black h-12 bg-orange-300 p-1 rounded-full pl-2 pr-2 "></input>
                <button className='ml-2 justify-center '><CiCircleCheck onClick={() => setFinished(i => !i)} size={"2em"} color={finished?"green":"red"} /></button>
            </div>
            <div className="w-full h-0.5 bg-slate-300 mt-2"></div>
        </div>
    )
}