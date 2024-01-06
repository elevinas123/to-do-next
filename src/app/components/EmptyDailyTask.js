import { useState } from "react"




export default function EmptyDailyTask(props) {
    
    const [creating, setCreating] = useState(false)
    const [text, setText] = useState("")
    const handleChange = (e) => {
        setText(e.target.value)
    }
    return(
        <div onClick={() => setCreating(true)} className={`justify-center text-center select-none   text-lg font-semibold shadow-md bg-secondary border-2 rounded-lg w-15vw h-12 flex  items-center mt-2  transition duration-300 ease-in-out border-gray-500 border-dashed`}>
            {creating?<input onChange={handleChange} onBlur={() => {props.handleBlur(text); setCreating(false)}} placeHolder="writeTask" />:
            <span className="flex text-gray-600 cursor-pointer ">
                Add new task
                </span>}
                    
        </div>
    )
}