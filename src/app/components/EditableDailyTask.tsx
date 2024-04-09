import { useEffect, useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

export default function EditableDailyTask(props) {

    const [editing, setEditing] = useState(false)
    const [text, setText] = useState("")
    useEffect(() => {
        setText(props.name)
    }, [props])

    const handleEdit = () => {
        setEditing(true)
    }
    const handleChange = (e) => {
        setText(e.target.value)
        console.log(text)
    }

    const handleBlur = () => {
        props.handleEdit(props._id, text)
        setEditing(false)
    }


    return (
        <div className="select-none text-lg font-medium bg-white shadow-sm border rounded-md w-full h-12 flex items-center mt-2 transition duration-300 ease-in-out overflow-hidden">
            {editing ? (
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border-none focus:ring-0 text-gray-700"
                    autoFocus
                />
            ) : (
                <div className="flex justify-between w-full px-4">
                    <span className="truncate">{props.name}</span> {/* Use truncate to avoid text wrapping */}
                    <div className="flex">
                        <button onClick={handleEdit} className="p-1 mr-2 text-gray-600 hover:text-gray-800">
                            <MdOutlineEdit size="24" />
                        </button>
                        <button
                            onClick={() => props.handleDelete(props._id)}
                            className="p-1 text-red-500 hover:text-red-700"
                        >
                            <IoIosRemoveCircleOutline size="24" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}