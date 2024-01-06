import { useEffect, useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

export default function EditableDailyTask(props) {

    const [editing, setEditing] = useState(false)
    const [text, setText] = useState("")
    useEffect(() => {
    }, [props])

    const handleEdit = () => {
        setEditing(true)
    }
    const handleChange = (e) => {
        setText(e.target.value)
        console.log(text)
    }


    return (
        <div    className={` select-none text-lg font-semibold shadow-md bg-secondary border-2 rounded-lg w-15vw h-12 flex  items-center mt-2  transition duration-300 ease-in-out border-gray-500 border-dashed`}>
                {editing?<input placeholder="labas" onChange={handleChange} onBlur={() =>{props.handleEdit(props._id, text); setEditing(false)}} />:
                <div className="flex flex-row justify-between">
                    <span className="ml-2">
                    {props.name}
                    </span>
                    <div className="flex flex-row m-2">
                        <button onClick={handleEdit} className="  "><MdOutlineEdit  className="w-6 h-6 " /></button>
                        <button onClick={() => props.handleDelete(props._id)} className="w-6 h-6 "><IoIosRemoveCircleOutline  color="red" className="  w-6 h-6" /></button>
                    </div>
                </div>}
            </div>
    )
}