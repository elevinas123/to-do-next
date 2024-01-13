"use client"
import { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTask from './EditTask';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";



export default function TaskCard (props) {

    const edit = () => {
        props.startEditing(props)
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
                    
                    <div className="relative">
                        <EditTask edit={edit} setEditing={props.setEditing} handleEdit={props.handleEdit}  {...props} />
                        <div  className="flex break-words flex-row justify-between bg-secondary hover:cursor-pointer h-15vh border-2  border-black  ml-3 mr-3  mt-2 rounded-lg p-2">
                            <div className="min-w-0 m-2  font-bold  w-15vw flex-wrap ">{props.name}</div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
    
}

