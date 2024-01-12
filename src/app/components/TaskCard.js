"use client"
import { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTask from './EditTask';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";



export default function TaskCard (props) {

    const [creation, setCreation] = useState(false)
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(props.name)

    const handleBlur = () => {
        props.handleEdit(props._id, text, "Task")
        setEdit(false)
        setCreation(false)
    }

    const handleEdit = () => {
        setEdit(true)
    }

    return (
        props._id &&
        <Draggable draggableId={props._id} index={props.index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    
                    {!creation?
                    <div className="relative">
                        <EditTask setCreation={setCreation} {...props}    />
                        <div  className="flex break-words flex-row justify-between bg-secondary hover:cursor-pointer h-15vh border-2  border-black  ml-3 mr-3  mt-2 rounded-lg p-2">
                            <div className="min-w-0 m-2  font-bold  w-15vw flex-wrap ">{props.name}</div>
                        </div>
                    </div>
                    :    
                    <div  className="flex flex-row justify-between bg-secondary hover:cursor-pointer h-15vh border-2 border-dashed  border-black  ml-3 mr-3  mt-2 rounded-lg  p-2">
                        {edit?<input  onBlur={handleBlur} onChange={(e) => setText(e.target.value)} value={text}/>:props.name}
                        <div className="flex flex-row m-2">
                            <button onClick={handleEdit} className="  "><MdOutlineEdit  className="w-6 h-6 " /></button>
                            <button onClick={() => props.handleDelete(props._id, props.parent)} className="w-6 h-6 "><IoIosRemoveCircleOutline  color="red" className="  w-6 h-6" /></button>
                        </div>
                    
                    </div>
                    }
                </div>
            )}
        </Draggable>
    );
    
}

