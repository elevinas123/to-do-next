"use client"

import { useEffect, useState } from "react"
import { CiCircleCheck } from "react-icons/ci";

    

export default function Subtask(props) {
    
    const [finished, setFinished] = useState(props.completed==undefined?false:props.completed)
    const [text, setText] = useState(props.text==undefined?"":props.text)
    
    const handleTextChange = (e) => {
        setText(e.target.value)
        console.log(text)
    }
    useEffect( () => {
        return saveData
    }, [])
    useEffect( () => {
        saveData()
    }, [finished])
    const saveData = () => {
        console.log(props.id, text, finished, props.taskId)
        fetch("/api/createTask", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: props.id, taskId: props.taskId, text: text, completed: finished}),
          })
    }

    return(
        <div className="flex flex-col w-40vw justify-center"> 
            <div className='flex flex-row mt-2 justify-center'>
            
                <input onBlur={saveData} onChange={handleTextChange} value={text} placeholder=" Subtask" className=" focus:outline-none  focus:border-4 focus:border-black  placeholder:text-gray-600 ml-2 justify-center w-30vw  text-center text-lg flex flex-row pt-2 border border-black h-12 bg-orange-300 p-1 rounded-full pl-2 pr-2 "></input>
                <button onClick={() => {
                    setFinished(i => !i)
                               }}  className='ml-2 justify-center '><CiCircleCheck  size={"2em"} color={finished?"green":"red"} /></button>
            </div>
            <div className="w-full h-0.5 bg-slate-300 mt-2"></div>
        </div>
    )
}