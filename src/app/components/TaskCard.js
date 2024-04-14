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
        props._id && (
            <Draggable draggableId={props._id} index={props.index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="m-3"
                    >
                        <div className="bg-white hover:bg-gray-50 cursor-pointer border border-gray-300 rounded-lg shadow-sm p-4 flex justify-between items-center">
                            <EditTask
                                edit={edit}
                                setEditing={props.setEditing}
                                handleEdit={props.handleEdit}
                                {...props}
                            />
                            <div className="text-gray-800 font-semibold truncate">{props.text}</div>
                        </div>
                    </div>
                )}
            </Draggable>
        )
    );

    
}
