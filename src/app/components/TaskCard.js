import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTask from './EditTask';




export default function TaskCard (props) {
  return (
        props._id &&
        <Draggable draggableId={props._id} index={props.index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    
                    <div  className=" flex flex-row justify-between bg-secondary hover:cursor-pointer h-15vh border-2  border-black  ml-3 mr-3  mt-2 rounded-lg  p-2">
                        <div className="  m-2 mt-1 font-bold  w-15vw flex-wrap ">{props.text}</div>
                        <EditTask  {...props}    />
                    </div>
                </div>
            )}
        </Draggable>
    );
    
}

